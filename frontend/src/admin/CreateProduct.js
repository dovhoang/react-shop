
import React, { useState, useEffect } from 'react'
import { isAuthenticate } from '../auth/apiAuth';
import { createProduct, getCategories } from './apiAdmin'
import '../index.css'

const CreateProduct = () => {

    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        categories: [],
        shippng: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: '',
        formData: ''
    });

    const {
        name,
        description,
        price,
        category,
        categories,
        shipping,
        quantity,
        photo,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;

    const { user, token } = isAuthenticate();

    useEffect(() => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({
                    ...values,
                    categories: data,
                    formData: new FormData()
                });
            }
        })
    }, [])

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        console.log(formData);
        setValues({ ...values, [name]: value });
    }

    const clickSubmit = (e) => {
        e.preventDefault();
        setValues({ ...values, loading: true, error: '' })
        console.log('hello');
        createProduct(formData, user._id, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    name: '',
                    description: '',
                    price: '',
                    category: '',
                    shipping: '',
                    quantity: '',
                    photo: '',
                    loading: false,
                    error: '',
                    createdProduct: data.name
                })
            }
        })
    }

    const PostForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-row">
                <div className="form-group col-md-8">
                    <label for="name">Product name</label>
                    <input
                        type="text"
                        required
                        className="form-control"
                        id="name"
                        placeholder=""
                        onChange={handleChange('name')}
                        value={name}
                    />
                </div>
                <div className="form-group col-md-4">
                    <label for="price">Price</label>
                    <input
                        type="number"
                        required
                        className="form-control"
                        id="price"
                        onChange={handleChange('price')}
                        value={price} />
                </div>
            </div>
            <div className="form-group">
                <label for="description">Description</label>
                <textarea
                    className='form-control'
                    id="description"
                    required
                    rows={5}
                    onChange={handleChange('description')}
                    value={description} />
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label for="category">Category</label>
                    <select
                        id="category"
                        className="form-control"
                        onChange={handleChange('category')}
                    >
                        {categories && categories.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group col-md-6">
                    <label for="shipping">Shipping</label>
                    <select
                        id="shipping"
                        className="form-control"
                        onChange={handleChange('shipping')}
                    >
                        <option>--Please select--</option>
                        <option value={1} selected>Yes</option>
                        <option value={2}>No</option>
                    </select>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label for="quantity">Quantity</label>
                    <input
                        type="number"
                        className="form-control"
                        id="quantity"
                        onChange={handleChange('quantity')}
                        value={quantity} />
                </div>
                <div class="form-group col-md-6">
                    <label for="photo">Choose picture</label>
                    <input
                        type="file"
                        className="form-control-file"
                        name="photo"
                        id="photo"
                        accept="image/*"
                        onChange={handleChange('photo')} />

                </div>
            </div>
            <button className="btn btn-primary element-center" >Create</button>
        </form>
    );

    return (
        <div className="card col-md-8 offset-md-2 mt-5 ">
            <div class="card-header element-center">
                Create product
            </div>
            <div class="card-body">
                {PostForm()}
            </div>

        </div>

    );
};

export default CreateProduct;
