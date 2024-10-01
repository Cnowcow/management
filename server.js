const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const ftp = require('basic-ftp');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});
connection.connect();

const multer = require('multer');
const upload = multer({ dest: './temp_upload' }); // 임시로 로컬에 저장

app.get('/api/customers', (req, res) => {
    connection.query(
        "select * from customer where isDeleted = 0",
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

app.post('/api/customers', upload.single('image'), async (req, res) => {
    const client = new ftp.Client();
    try {
        await client.access({
            host: 'ftp.hhjnn92.synology.me', // FTP 서버 주소
            user: 'anonymous', // 사용자 이름
            password: '', // 비밀번호
            port: 2200, // 포트 번호
            secure: false // SSL 사용 여부
        });

        // 파일을 FTP 서버에 업로드
        await client.ensureDir('/management'); // 업로드할 디렉토리
        await client.uploadFrom(req.file.path, req.file.filename); // 임시 파일 업로드

        let image = 'http://hhjnn92.synology.me/management/' + req.file.filename;
        let name = req.body.name;
        let birthday = req.body.birthday;
        let gender = req.body.gender;
        let job = req.body.job;
        let params = [image, name, birthday, gender, job];

        // DB에 정보 삽입
        connection.query('insert into customer values (null, ?, ?, ?, ?, ?, now(), 0)', params,
            (err, rows, fields) => {
                res.send(rows);
            }
        );

    } catch (err) {
        console.error(err);
        res.status(500).send('Error uploading to FTP server');
    } finally {
        client.close();
        fs.unlinkSync(req.file.path); // 임시 파일 삭제
    }
});


app.delete('/api/customers/:id', (req, res) =>{
    let sql = 'update customer set isDeleted = 1 where id = ?';
    let params = [req.params.id];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

app.listen(port, () => console.log(`Listening on port ${port}`));