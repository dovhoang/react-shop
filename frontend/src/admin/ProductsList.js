import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductItem from './ProductItem'
import { getProducts, deleteProduct } from './apiAdmin'
import { isAuthenticate } from '../auth/apiAuth'

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    const loadProducts = () => {
        getProducts(10).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProducts(data);
            }
        })
    }
    useEffect(() => {
        loadProducts();
    }, [])


    const { user, token } = isAuthenticate();

    const deleteItem = (productId) => {
        deleteProduct(productId, user._id, token).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                loadProducts();
            }
        })
    }


    return (
        <div className='container mt-3'>

            <table class="table">
                <thead>
                    <tr>
                        <th>Mã số</th>
                        <th>Tên sách</th>
                        <th>Giá</th>
                        <th className='text-center'>
                            <Link to='/create/product'>
                                <button className='btn btn-success'
                                >Thêm mới
                                </button>
                            </Link>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, i) => (
                        <ProductItem key={i} item={product} deleteItem={deleteItem} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};


export default ProductList;