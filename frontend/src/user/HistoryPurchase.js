import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getPurchaseHistory } from './apiUser'
import { isAuthenticate } from '../auth/apiAuth'
import '../index.css'
import { Card } from 'antd'
import HistoryPurchaseItem from './HistoryPurchaseItem'

const HistoryPurchase = () => {

    const [values, setValues] = useState({
        list: [],
        error: false
    })

    const { list, error } = values;
    const { user, token } = isAuthenticate();

    const getListPurchase = () => {
        getPurchaseHistory(user._id, token).then(data => {
            console.log(data)
            if (data.error) {
                setValues({ ...values, error: true });
            } else {
                setValues({ ...values, error: false, list: data })
            }
        })
    }
    useEffect(() => {
        getListPurchase()
    }, [])


    let i = 1;

    return (
        <div className='container'>
            <Card style={{ width: '100%' }}>
                <div className="row">
                    <div className="col-md-3">
                        ĐƠN HÀNG
                            </div>
                    <div className="col-md-9">
                        CHI TIẾT
                    </div>
                </div>
            </Card>
            {list.map(order => {
                return (
                    <HistoryPurchaseItem order={order} />
                );
            })}
        </div>
    );
};

export default HistoryPurchase; 