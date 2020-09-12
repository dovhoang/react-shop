import React from 'react'
import { Link } from 'react-router-dom'
const CategoryItem = ({ key, item }) => {
    return (
        <tr>
            <td>{key}</td>
            <td>{item._id}</td>
            <td>{item.name}</td>
            <td>
                <Link to={`/update/category/${item._id}`}>
                    <button className="btn btn-info mr-2"><i class="fa fa-edit"></i></button>
                </Link>
            </td>

        </tr>
    );
};

export default CategoryItem;