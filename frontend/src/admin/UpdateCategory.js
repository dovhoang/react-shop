import React, { useState, useEffect } from 'react'
import { getCategoryById, updateCategory } from './apiAdmin'
import { isAuthenticate } from '../auth/apiAuth';
import '../index.css'


const UpdateCategory = (props) => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const { token, user } = isAuthenticate();

    const handleChange = (event) => {
        setName(event.target.value);
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        const category = {
            name: name
        };

        updateCategory(props.match.params.categoryId, user._id, token, category).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setName('')
                setError('');
                setSuccess(true);
            }
        })
    }
    const init = categoryId => {
        getCategoryById(categoryId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setName(data.name);
                setError('');
                setSuccess(false);
            }
        })
    }

    useEffect(() => {
        console.log(JSON.stringify(props))
        init(props.match.params.categoryId);
    }, [])

    return (
        <div className='container mt-3'>
            <div className='col-md-6 offset-md-3'>
                <div className="card" >
                    <div className="card-header">
                        Update category
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
                                <button type='submit' className='btn btn-outline-primary'>Update</button>
                            </div>
                        </form>
                        {success &&
                            <div className='alert alert-success mt-3'>Update successful!</div>
                        }
                        {error !== '' &&
                            <div className='alert alert-danger mt-3'>{error}</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateCategory;