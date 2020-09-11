import React, { useEffect, useState } from 'react'
import { totalCart } from './cartHelper'

import '../index.css'

const Checkout = ({ products }) => {
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
        </div>
    </div>

};

export default Checkout;