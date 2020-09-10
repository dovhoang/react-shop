import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { createCategory, getCategories } from './apiAdmin'
import { isAuthenticate } from '../auth/apiAuth';
import '../index.css'

import './AdminDashboard.css'


const AdminDashboard = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const [categories, setCatetgories] = useState([]);
    const [errorLoadCat, setErrorLoadCat] = useState('');

    const { token, user } = isAuthenticate();

    const handleChange = (event) => {
        setName(event.target.value);
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        createCategory({ name }, user._id, token).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setName('')
                setError('');
                setSuccess(true);
            }
        })
    }

    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setErrorLoadCat(data.error);
            } else {
                setErrorLoadCat('');
                setCatetgories(data);
            }
        })
    }

    useEffect(() => loadCategories(), [categories])

    const handleFocus = () => {
        setSuccess(false);
    }

    return (
        <div className='row mt-5'>
            <div className='col-md-3 ml-3'>
                <div className="card" >
                    <div className="card-header">
                        <h6>Admin Management</h6>
                    </div>
                    <div className="card-body card-body-custom">
                        <ul class="list-group">
                            <li class="list-group-item ">
                                <Link className='nav-link' to='/create/category'>Create category</Link>
                            </li>
                            <li class="list-group-item">
                                <Link className='nav-link' to='/create/product'>Create product</Link>
                            </li>
                            <li class="list-group-item ">
                                <Link
                                    className='nav-link'
                                    to='/'>
                                    Order management
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='col-md-8 '>

            </div>
        </div >

    );
};

export default AdminDashboard;