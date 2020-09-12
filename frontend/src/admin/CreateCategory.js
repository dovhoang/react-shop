import React, { useState, useEffect } from 'react'
import { createCategory, getCategories } from './apiAdmin'
import { isAuthenticate } from '../auth/apiAuth';
import '../index.css'


const CreateCategory = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const [categories, setCatetgories] = useState([]);

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
    const handleFocus = () => {
        setSuccess(false);
    }

    return (
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
                            required
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
    );
};

export default CreateCategory;