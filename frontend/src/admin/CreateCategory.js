import React, { useState, useEffect } from 'react'
import { createCategory, getCategories } from './apiAdmin'
import { isAuthenticate } from '../auth/apiAuth';
import '../index.css'


const CreateCategory = () => {
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
                        Create category
                </div>
                    <div className="card-body">
                        <form onSubmit={clickSubmit} className='d-flex flex-column' >
                            <div className='form-group'>
                                <label htmlFor='category' className='text-mutex'></label>
                                <input
                                    className='form-control'
                                    id='category'
                                    type='text'
                                    autoFocus
                                    value={name}
                                    onChange={handleChange}

                                />
                            </div>
                            <div>
                                <button type='submit' className='btn btn-outline-primary'>Create</button>
                            </div>
                        </form>
                        {/* {success &&
                            <div className='alert alert-success mt-3'>Category is created!</div>
                        } */}
                        {error !== '' &&
                            <div className='alert alert-danger mt-3'>{error}</div>
                        }
                    </div>
                </div>
            </div>
            <div className='col-md-8 '>
                <div class="card">
                    <div class="card-header">
                        <h3>List categories</h3>
                    </div>
                    <div class="card-body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Category name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category, index) => {
                                    return <tr>
                                        <th scope="row">{index}</th>
                                        <td>{category.name}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div class="card-footer text-muted element-center">
                        Total of list: {categories.length}
                    </div>
                </div>
            </div>
        </div >

    );
};

export default CreateCategory;