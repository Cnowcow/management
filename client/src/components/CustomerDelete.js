import React from "react";

function CustomerDelete({ id, stateRefresh }) {

    const deleteCustomer = (id) => {
        const url = `/api/customers/${id}`;
        fetch(url, {
            method: 'DELETE',
        })
            .then(() => stateRefresh()); // API 호출 후 stateRefresh 실행
    };

    return (
        <button onClick={() => deleteCustomer(id)}>삭제</button>
    );
}


export default CustomerDelete;