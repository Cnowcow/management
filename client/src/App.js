import React, { useState, useEffect } from 'react';
import Customer from "./components/Customer";
import CustomerAdd from "./components/CustomerAdd";
import { makeStyles } from '@mui/styles';  // @mui/styles로 수정
import { createTheme, ThemeProvider } from '@mui/material/styles';  // @mui/material/styles는 ThemeProvider를 위해 유지
import { Table, TableBody, TableHead, Paper } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {CircularProgress} from "@mui/material";

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
    },
    progress: {
        margin: theme.spacing(2)
    }
}));

    /*
        1. constructor()
        2. componentWillMount()
        3. render()
        4. componentDidMount()
        props or state => shouldComponentUpdate()
    */

function App() {
    const [customers, setCustomers] = useState([]);  // 상태 초기화
    const [completed, setCompleted] = useState(0);   // 프로그레스 바 상태

    // 상태 초기화 함수
    const stateRefresh = () => {
        setCustomers([]);
        setCompleted(0);
        callApi()
            .then(res => setCustomers(res))  // 고객 데이터를 상태에 저장
            .catch(err => console.log(err));
    };

    // 프로그레스 바 상태 업데이트 함수
    const progress = () => {
        setCompleted(prev => (prev >= 100 ? 0 : prev + 1));
    };

    useEffect(() => {
        const timer = setInterval(progress, 20);
        callApi()
            .then(res => setCustomers(res))  // 고객 데이터를 상태에 저장
            .catch(err => console.log(err));

        return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 정리
    }, []);  // 컴포넌트가 마운트될 때만 호출

    const callApi = async () => {
        const response = await fetch('/api/customers'); // 절대 경로가 아닌 상대 경로로 변경
        const body = await response.json();
        return body;
    }

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
                            <TableCell>설정</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers.length > 0 ? customers.map(c => (
                            <Customer
                                stateRefresh={stateRefresh}
                                key={c.id}
                                id={c.id}
                                image={c.image}
                                name={c.name}
                                birthday={c.birthday}
                                gender={c.gender}
                                job={c.job}
                            />
                        )) : <TableRow>
                                <TableCell colSpan={6} align={"center"}>
                                    <CircularProgress className={classes.progress} variant={"determinate"} value={completed} />
                                </TableCell>
                            </TableRow>}
                    </TableBody>
                </Table>
            </Paper>
            <CustomerAdd stateRefresh={stateRefresh}/>
        </ThemeProvider>
    );
}

export default App;
