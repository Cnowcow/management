const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/api/customers', (req,res) => {
   res.send([
       {
           'id': 1,
           'image': 'http://hhjnn92.synology.me/marketFile/default2.jpg',
           'name': '최현우',
           'birthday': '920514',
           'gender': '남자',
           'job': '개발자'
       },
       {
           'id': 2,
           'image': 'http://hhjnn92.synology.me/marketFile/default2.jpg',
           'name': '홍길동',
           'birthday': '920000',
           'gender': '남자',
           'job': '개발자'
       },
       {
           'id': 3,
           'image': 'http://hhjnn92.synology.me/marketFile/default2.jpg',
           'name': '임꺽정',
           'birthday': '900000',
           'gender': '남자',
           'job': '개발자'
       }
   ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));