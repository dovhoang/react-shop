
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
    }, [createdProduct])

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;

        formData.set(name, value);

        setValues({ ...values, [name]: value });
    }

    const clickSubmit = (e) => {
        e.preventDefault();
        setValues({ ...values, loading: true, error: '' })
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
                    formData: new FormData(),
                    createdProduct: data.name
                })
            }
        })
    }

    const PostForm = () => (
        <form onSubmit={clickSubmit} >
            <div className="form-row">
                <div className="form-group col-md-8">
                    <label for="name">Tên sách</label>
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
                    <label for="price">Giá</label>
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
                <label for="description">Mổ tả</label>
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
                    <label for="category">Danh mục</label>
                    <select
                        id="category"
                        className="form-control"
                        onChange={handleChange('category')}
                    >
                        <option>--Lựa chọn--</option>
                        {categories && categories.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group col-md-6">
                    <label for="shipping">Dịch vụ vận chuyển</label>
                    <select
                        id="shipping"
                        className="form-control"
                        onChange={handleChange('shipping')}
                    >
                        <option selected>--Please select--</option>
                        <option value={0} >Có</option>
                        <option value={1}>Không</option>
                    </select>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label for="quantity">Số lượng</label>
                    <input
                        type="number"
                        className="form-control"
                        id="quantity"
                        onChange={handleChange('quantity')}
                        value={quantity} />
                </div>
                <div class="form-group col-md-6">
                    <label for="photo">Chọn hình ảnh</label>
                    <input
                        type="file"
                        className="form-control-file"
                        name="photo"
                        id="photo"
                        accept="image/*"
                        onChange={handleChange('photo')} />

                </div>
            </div>
            <div className='element-center mt-3'>
                <button type='submit' className="btn btn-primary " >Thêm mới</button>

            </div>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger mt-3" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info mt-3" style={{ display: createdProduct ? '' : 'none' }}>
            {`${createdProduct}`} được tạo thành công!
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success mt-3">
                Đang tạo...
            </div>
        );

    return (
        <div className="card col-md-8 offset-md-2 mt-5 ">
            <div class="card-header element-center">
                Create product
            </div>
            <div class="card-body">

                {PostForm()}
                {showError()}
                {showSuccess()}
                {showLoading()}
            </div>

        </div>

    );
};

export default CreateProduct;
