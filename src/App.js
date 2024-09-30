import { makeStyles } from '@mui/styles';  // @mui/styles로 수정
import { createTheme, ThemeProvider } from '@mui/material/styles';  // @mui/material/styles는 ThemeProvider를 위해 유지
import { Table, TableBody, TableHead, Paper } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Customer from "./components/Customer";
import React from 'react';

// 테마 생성
const theme = createTheme({
    spacing: 8,  // spacing 단위를 명시적으로 설정
});

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: "auto"
    },
    table: {
        minWidth: 1080
    }
}));

const customers = [
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
];

function App() {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>번호</TableCell>
                            <TableCell>이미지</TableCell>
                            <TableCell>이름</TableCell>
                            <TableCell>생년월일</TableCell>
                            <TableCell>성별</TableCell>
                            <TableCell>직업</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers.map(c => {
                            return (
                                <Customer
                                    key={c.id}
                                    id={c.id}
                                    image={c.image}
                                    name={c.name}
                                    birthday={c.birthday}
                                    gender={c.gender}
                                    job={c.job}
                                />
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        </ThemeProvider>
    );
}

export default App;
