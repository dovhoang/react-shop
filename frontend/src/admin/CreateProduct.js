
import React, { useState, useEffect } from 'react'
import { isAuthenticate } from '../auth/apiAuth';
import { createProduct } from './apiAdmin'
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
        setValues({ ...values, formData: new FormData() })
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
                        type="text"
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
                        <option value='5f5508a56e7b0f262cb9ece2'>ReactJS</option>
                        <option value='5f5508a56e7b0f262cb9ece2'>Python</option>
                    </select>
                </div>
                <div className="form-group col-md-6">
                    <label for="shipping">Shipping</label>
                    <select
                        id="shipping"
                        className="form-control"
                        onChange={handleChange('shipping')}
                    >
                        <option value={1} selected>Yes</option>
                        <option value={2}>No</option>
                    </select>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label for="quantity">Quantity</label>
                    <input
                        type="text"
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

// import React, { useState, useEffect } from 'react';
// import Layout from '../core/Layout';
// import { isAuthenticate } from '../auth/apiAuth';
// import { Link } from 'react-router-dom';
// import { createProduct, getCategories } from './apiAdmin';

// const CreateProduct = () => {
//     const [values, setValues] = useState({
//         name: '',
//         description: '',
//         price: '',
//         categories: [],
//         category: '',
//         shipping: '',
//         quantity: '',
//         photo: '',
//         loading: false,
//         error: '',
//         createdProduct: '',
//         redirectToProfile: false,
//         formData: ''
//     });

//     const { user, token } = isAuthenticate();
//     const {
//         name,
//         description,
//         price,
//         categories,
//         category,
//         shipping,
//         quantity,
//         loading,
//         error,
//         createdProduct,
//         redirectToProfile,
//         formData
//     } = values;

//     // load categories and set form data
//     const init = () => {
//         getCategories().then(data => {
//             if (data.error) {
//                 setValues({ ...values, error: data.error });
//             } else {
//                 setValues({
//                     ...values,
//                     categories: data,
//                     formData: new FormData()
//                 });
//             }
//         });
//     };

//     useEffect(() => {
//         init();
//     }, []);

//     const handleChange = name => event => {
//         const value = name === 'photo' ? event.target.files[0] : event.target.value;
//         formData.set(name, value);
//         setValues({ ...values, [name]: value });
//     };

//     const clickSubmit = event => {
//         event.preventDefault();
//         setValues({ ...values, error: '', loading: true });

//         createProduct(formData, user._id, token).then(data => {
//             if (data.error) {
//                 setValues({ ...values, error: data.error });
//             } else {
//                 setValues({
//                     ...values,
//                     name: '',
//                     description: '',
//                     photo: '',
//                     price: '',
//                     quantity: '',
//                     loading: false,
//                     createdProduct: data.name
//                 });
//             }
//         });
//     };

//     const newPostForm = () => (
//         <form className="mb-3" onSubmit={clickSubmit}>
//             <h4>Post Photo</h4>
//             <div className="form-group">
//                 <label className="btn btn-secondary">
//                     <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
//                 </label>
//             </div>

//             <div className="form-group">
//                 <label className="text-muted">Name</label>
//                 <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
//             </div>

//             <div className="form-group">
//                 <label className="text-muted">Description</label>
//                 <textarea onChange={handleChange('description')} className="form-control" value={description} />
//             </div>

//             <div className="form-group">
//                 <label className="text-muted">Price</label>
//                 <input onChange={handleChange('price')} type="number" className="form-control" value={price} />
//             </div>

//             <div className="form-group">
//                 <label className="text-muted">Category</label>
//                 <select onChange={handleChange('category')} className="form-control">
//                     <option>Please select</option>
//                     {categories &&
//                         categories.map((c, i) => (
//                             <option key={i} value={c._id}>
//                                 {c.name}
//                             </option>
//                         ))}
//                 </select>
//             </div>

//             <div className="form-group">
//                 <label className="text-muted">Shipping</label>
//                 <select onChange={handleChange('shipping')} className="form-control">
//                     <option>Please select</option>
//                     <option value="0">No</option>
//                     <option value="1">Yes</option>
//                 </select>
//             </div>

//             <div className="form-group">
//                 <label className="text-muted">Quantity</label>
//                 <input onChange={handleChange('quantity')} type="number" className="form-control" value={quantity} />
//             </div>

//             <button className="btn btn-outline-primary">Create Product</button>
//         </form>
//     );

//     const showError = () => (
//         <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
//             {error}
//         </div>
//     );

//     const showSuccess = () => (
//         <div className="alert alert-info" style={{ display: createdProduct ? '' : 'none' }}>
//             <h2>{`${createdProduct}`} is created!</h2>
//         </div>
//     );

//     const showLoading = () =>
//         loading && (
//             <div className="alert alert-success">
//                 <h2>Loading...</h2>
//             </div>
//         );

//     return (
//         <Layout title="Add a new product" description={`G'day ${user.name}, ready to add a new product?`}>
//             <div className="row">
//                 <div className="col-md-8 offset-md-2">
//                     {showLoading()}
//                     {showSuccess()}
//                     {showError()}
//                     {newPostForm()}
//                 </div>
//             </div>
//         </Layout>
//     );
// };

// export default CreateProduct;
