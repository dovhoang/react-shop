import React, { useState, useEffect } from 'react'

import { getSingleProduct } from './apiCore'
import ShowImage from './ShowImage'
import '../index.css'
import './SingleProduct.css'

const SingleProduct = (props) => {
    const [product, setProduct] = useState({});
    const [error, setError] = useState('');

    const loadSingleProduct = productId => {
        getSingleProduct(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
            }
        })
    }

    useEffect(() => {
        const productId = props.match.params.productId;
        console.log(productId);
        loadSingleProduct(productId)
    }, [])

    return <div className='row mt-3'>
        <div className="col-md-4 element-center">
            <ShowImage item={product} url='product' height={500} />
        </div>
        <div className="col-md-7">
            <div class="card">
                <div class="card-body">
                    <div className="name"><h4>{product.name}</h4></div>
                    <div className="d-flex d-row justify-content-between mt-3">
                        <div className="price">Price: <span>{product.price} <i class="fa fa-usd" aria-hidden="true"></i></span></div>
                        <div className="sold">Sold: <span> {product.sold} <i class="fa fa-book" aria-hidden="true"></i></span> </div>
                    </div>
                    <div className="quantity mt-3">Quantitly: <span>{product.quantity} g</span></div>
                    <div className={`shipping mt-3 
                    ${product.shipping ? 'delivery-available' : 'delivery-unavailable'}`}>
                        <i class="fa fa-truck" aria-hidden="true"></i>
                        {product.shipping ?
                            ' Delivery service unavailable' : ' Delivery service unavailable'}
                    </div>
                    <div className='description mt-3'> Description: </div>
                    <div className="description">{product.description}</div>
                    <div className="mt-3 element-center">
                        <button className="btn btn-outline-primary">Add to card</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
};

export default SingleProduct;