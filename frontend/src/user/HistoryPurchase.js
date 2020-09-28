import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getPurchaseHistory } from './apiUser'
import { isAuthenticate } from '../auth/apiAuth'
import '../index.css'

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

    const formatTime = (isoDate) => {
        let date = new Date(isoDate);
        return (date.getHours() + ':' + date.getMinutes() + ' ' +
            date.getDate() + '/' + date.getMonth()
            + '/' + date.getFullYear());
    }


    let i = 1;

    return <div className='row'>
        <div className='col-md-10 offset-md-1'>
            <table className="table table-inverse table-responsive">
                <thead class="thead-inverse">
                    <tr>
                        <th>Order code</th>
                        <th>Product</th>
                        <th>Date</th>
                        <th>Total price</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map(order => {
                        return (
                            <tr>
                                <td scope="row">{order._id}</td>
                                <td>
                                    {order.products.map(product => (
                                        <tr>
                                            <Link to={`/product/${product._id}`}>
                                                {product.name}
                                            </Link>
                                        </tr>
                                    ))}
                                </td>
                                <td > {formatTime(order.createdAt)}</td>
                                <td > {order.amount}</td>
                            </tr>);

                    })}

                </tbody>
            </table>
        </div >
    </div>
};

export default HistoryPurchase; 