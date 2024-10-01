import React from "react";
import { Dialog, DialogActions, DialogTitle, DialogContent, Button, Typography } from "@mui/material";

class CustomerDelete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false // 다이얼로그 열림 여부를 관리하는 상태
        };
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        }); // 다이얼로그를 열기 위한 상태 업데이트
    };

    handleClose = () => {
        this.setState({
            open: false
        }); // 다이얼로그를 닫기 위한 상태 업데이트
    };

    deleteCustomer = (id) => {
        const url = `/api/customers/${id}`;
        fetch(url, {
            method: 'DELETE',
        })
            .then(() => {
                this.props.stateRefresh(); // API 호출 후 부모 컴포넌트의 상태를 갱신
                this.handleClose(); // 삭제 후 다이얼로그 닫기
            })
            .catch(err => console.log(err)); // 오류 처리
    };

    render() {
        return (
            <div>
                <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>
                    삭제
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle onClose={this.handleClose}>
                        삭제 경고
                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            선택한 고객 정보가 삭제됩니다.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={() => this.deleteCustomer(this.props.id)}>삭제</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default CustomerDelete;
