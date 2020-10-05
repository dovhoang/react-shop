import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ShowImage from './ShowImage'
import { Card } from 'antd';
import InputNumber from './InputNumber'
import { updateItem, removeItem } from './cartHelper'
import { createAction } from '@reduxjs/toolkit'
import { connect } from 'react-redux'
import { formatMoney } from './Utils'

const CartItem = ({
    product,
    cartChange }) => {

    const handleChange = (value) => {
        updateItem(product._id, value)
    }

    const handleDelete = () => {
        removeItem(product._id);
        cartChange();
    }

    return (
        <Card style={{ width: '100%' }}>
            <div className="row">
                <div className="col-md-2">
                    <ShowImage item={product} url='product' height={100} />
                </div>
                <div className="col-md-3">
                    <Link to={`/product/${product._id}`}>
                        {product.name}
                    </Link>
                </div>
                <div className="col-md-2 text-center">
                    {formatMoney(product.price)}
                </div>
                <div className="col-md-2">
                    <InputNumber handleInputChange={handleChange}
                        data={product.count} />
                </div>
                <div className="col-md-2 text-center">
                    {formatMoney(product.price * product.count)}
                </div>
                <div className="col-md-1">
                    <button className="btn btn-outline-danger"
                        onClick={handleDelete}>
                        <i class="fa fa-times" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </Card>
    );

};

const cartChangeAction = createAction('CART_CHANGE')

const mapDispatchToProps = (dispatch) => ({
    cartChange: () => dispatch(cartChangeAction())
})



export default connect(null, mapDispatchToProps)(CartItem);