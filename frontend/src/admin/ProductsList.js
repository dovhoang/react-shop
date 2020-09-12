import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductItem from './ProductItem'
import { getProducts } from './apiAdmin'

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    const loadProducts = () => {
        getProducts().then(data => {
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


    return (
        <div className='container mt-3'>

            <table class="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>
                            <Link to='/create/product'>
                                <button className='btn btn-success'
                                >Create product
                                </button>
                            </Link>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, i) => (
                        <ProductItem key={i} item={product} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};


export default ProductList;