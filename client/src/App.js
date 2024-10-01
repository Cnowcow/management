import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Table, TableBody, TableHead, Paper, TableRow, TableCell, CircularProgress } from "@mui/material";
import { makeStyles } from '@mui/styles';
import Customer from "./components/Customer";
import CustomerAdd from "./components/CustomerAdd";

// AppBar 및 검색 관련 컴포넌트
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));


// 테마 생성
const theme = createTheme({
    spacing: 8,  // spacing 단위를 명시적으로 설정
});

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        minWidth: 1080
    },
    paper:{
        marginLeft: 18,
        marginRight: 18,
    },
    progress: {
        margin: theme.spacing(2)
    },
    tableHead:{
      fontSize: '1.0rem'
    }
}));

/*
    1. constructor()
    2. componentWillMount()
    3. render()
    4. componentDidMount()
    props or state => shouldComponentUpdate()
*/

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            completed: 0,
        };
    }

    // 상태 초기화 함수
    stateRefresh = () => {
        this.setState({
            customers: [],
            completed: 0,
        }, this.callApi);
    };

    // 프로그레스 바 상태 업데이트 함수
    progress = () => {
        this.setState(prevState => ({
            completed: prevState.completed >= 100 ? 0 : prevState.completed + 1
        }));
    };

    async componentDidMount() {
        this.timer = setInterval(this.progress, 20);
        this.callApi();
    }

    componentWillUnmount() {
        clearInterval(this.timer); // 컴포넌트 언마운트 시 타이머 정리
    }

    callApi = async () => {
        const response = await fetch('/api/customers'); // 절대 경로가 아닌 상대 경로로 변경
        const body = await response.json();
        this.setState({ customers: body }); // 고객 데이터를 상태에 저장
    };

    render() {
        const { customers, completed } = this.state;
        const cellList = ["번호", "프로필 이미지", "이름", "생년월일", "성별", "직업", "설정",];
        return (
            <div style={{ width: '100%', minWidth: 1080 }}>
            <ThemeProvider theme={theme}>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                            >
                                고객 관리 시스템
                            </Typography>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="검색하기"
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </Search>
                        </Toolbar>
                    </AppBar>
                </Box>
                <div style={{marginTop: 15, marginBottom: 15, display: 'flex', justifyContent: 'center' }}>
                    <CustomerAdd stateRefresh={this.stateRefresh} />
                </div>
                <Paper>
                    <Table style={{ minWidth: 1080 }}>
                        <TableHead>
                            <TableRow>
                                {cellList.map((c, index) => (
                                    <TableCell sx={{ fontSize: '1.0rem' }} key={index}>{c}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customers.length > 0 ? customers.map(c => (
                                <Customer
                                    stateRefresh={this.stateRefresh}
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
                                    <CircularProgress variant={"determinate"} value={completed} />
                                </TableCell>
                            </TableRow>}
                        </TableBody>
                    </Table>
                </Paper>
            </ThemeProvider>
            </div>
        );
    }
}

export default App;