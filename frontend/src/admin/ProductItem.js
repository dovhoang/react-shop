import React from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticate } from '../auth/apiAuth';
import { deleteProduct } from './apiAdmin'

const ProductItem = ({ key, item }) => {

    const { user, token } = isAuthenticate();
    const deleteItem = () => {
        deleteProduct(item._id, user._id, token);
    }
    return (
        <tr>
            <td>{item._id}</td>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>
                <Link to={`/update/product/${item._id}`}>
                    <button className="btn btn-info mr-2"><i class="fa fa-edit"></i></button>
                </Link>
                <button onClick={deleteItem} className="btn btn-danger"><i class="fa fa-trash" aria-hidden="true"></i></button>
            </td>
        </tr>
    );
};

export default ProductItem;
