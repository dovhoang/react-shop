import React, { useEffect, useState } from 'react'
import CCard from './Card'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { totalCart, getCart } from './cartHelper'
import Checkout from './Checkout'
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import CartItem from './CartItem'
import { Card } from 'antd'
import { createAction } from '@reduxjs/toolkit'
import { connect } from 'react-redux'

const Cart = ({ cartChange = false }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(getCart());
        totalPrice();
    }, [cartChange])

    const totalPrice = () => {
        var total = 0;
        products.map(p => {
            total = total + p.count * p.price;
        })
        return total;
    }

    const showContinueShopping = () => {
        return <div className='element-center' style={{ marginTop: '200px' }}>
            <div>
                <RemoveShoppingCartIcon style={{ fontSize: '100px' }} />
            </div>
            <div element-center><h4>Cart empty</h4> Continue to shopping !!!</div>
        </div>
    }


    return (
        <div className='container-fluid'>
            {products.length === 0 &&
                <div className='element-center'>
                    {showContinueShopping()}
                </div>}
            {products.length !== 0 &&
                <div className='row'>
                    <div className='col-md-3'>
                        <Checkout products={products} />
                    </div>
                    <div className="col-md-9">
                        <Card style={{ width: '100%' }}>
                            <div className="row">
                                <div className="col-md-3 offset-md-2">
                                    TÊN SÁCH
                            </div>
                                <div className="col-md-2">
                                    GIÁ BÁN
                            </div>
                                <div className="col-md-2">
                                    SỐ LƯỢNG
                            </div>
                                <div className="col-md-2">
                                    TỔNG CỘNG GIÁ
                            </div>
                                <div className="col-md-1">

                                </div>
                            </div>
                        </Card>
                        {products.map((product) => (
                            <CartItem key={product._id}
                                product={product} />
                        ))}
                    </div>
                </div>
            }
        </div>
    );

};
const mapStateToProps = state => ({
    cartChange: state.cart
})


export default connect(mapStateToProps, null)(Cart);
