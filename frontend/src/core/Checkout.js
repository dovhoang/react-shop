import React, { useEffect, useState } from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import { totalCart, emptyCart } from './cartHelper'
import { createOrder } from './apiCore'
import { isAuthenticate } from '../auth/apiAuth'
import { Card } from 'antd'
import { createAction } from '@reduxjs/toolkit'
import { connect } from 'react-redux'
import { formatMoney } from './Utils'
import '../index.css'

const Checkout = ({ products, cartChange, updateCheckout }) => {
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

    const totalQuantity = () => {
        return products.reduce((cur, next) => {
            return cur + next.count;
        }, 0)
    }
    const history = useHistory();

    useEffect(() => {
        totalPrice();
        totalQuantity();
    }, [updateCheckout])

    const handleBuy = () => {
        if (!user) {
            history.push('/signin')
        } else {
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
                        cartChange()
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

    }

    return (
        <Card title="Tóm tắt giỏ hàng" bordered={true}
            style={{ width: 300, position: 'fixed', top: 150 }}>
            <p>Số lượng sách: {totalQuantity()} </p>
            <p> Tống thanh toán: <span style={{ color: 'red' }}>
                {formatMoney(totalPrice())} đồng </span></p>
            <button
                className="btn btn-primary"
                onClick={handleBuy}>
                Mua
            </button>
        </Card>
    );

};

const cartChangeAction = createAction('CART_CHANGE')

const mapDispatchToProps = (dispatch) => ({
    cartChange: () => dispatch(cartChangeAction())
})
const mapStateToProps = state => ({
    updateCheckout: state.updateCheckout
})


export default connect(mapStateToProps, mapDispatchToProps)(Checkout);