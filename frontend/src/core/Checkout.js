import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { totalCart, emptyCart } from './cartHelper'
import { createOrder } from './apiCore'
import { isAuthenticate } from '../auth/apiAuth'

import '../index.css'

const Checkout = ({ products, run, setRun }) => {
    const [data, setData] = useState({
        loading: true,
        success: false
    });

    const { user, token } = isAuthenticate();

    const totalPrice = () => {
        return products.reduce((cur, next) => {
            return cur + next.count * next.price;
        }, 0)
    }

    const listProduct = () => {
        return (
            <ul class="list-group">
                {products.map(p => {
                    return <li key={p._id} class="list-group-item">
                        <div className="d-flex justify-content-between">
                            <div className='ml-2 cart-summary-price'>
                                {p.name} <span>({p.price} $)</span>
                            </div>
                            <div >
                                x{p.count}
                            </div>
                        </div>
                    </li>
                })}

            </ul>


        );
    }

    const totalItems = () => {
        return <h6>Cart summary: has {totalCart()} item(s)</h6>
    }
    const history = useHistory();

    const handleBuy = () => {
        let amount = totalPrice();
        const createOrderData = {
            products: products,
            transaction_id: 1,
            amount: amount,
            address: ''
        }
        createOrder(user._id, token, createOrderData)
            .then(res => {
                emptyCart(() => {
                    setRun(!run);
                    setData({
                        loading: false,
                        success: true
                    });
                    history.push(`${user._id}/history-purchase`);
                });

            })
            .catch(error => {
                console.log(error);
                setData({ loading: false });
            });
    }

    return <div className='mt-3'>
        <div class="card">
            <div class="card-header">
                {totalItems()}
            </div>
            <div class="card-body card-body-custom">
                {listProduct()}
            </div>
            <div class="card-footer cart-summary-price">
                <h6>Total price:</h6>
                <span className='float-right'>  <h3>{totalPrice()} $</h3> </span>
            </div>
            <div>
                <button
                    className='btn btn-success m-3'
                    onClick={handleBuy}>
                    Buy
                </button>
            </div>
        </div>
    </div>

};

export default Checkout;