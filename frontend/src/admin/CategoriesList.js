import React, { useState, useEffect } from 'react'
import { getCategories } from './apiAdmin'
import { isAuthenticate } from '../auth/apiAuth';
import '../index.css'
import CreateCategory from './CreateCategory';
import CategoryItem from './CategoryItem';


const CategoriesList = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const [categories, setCatetgories] = useState([]);
    const [errorLoadCat, setErrorLoadCat] = useState('');


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

    useEffect(() => loadCategories(), [])

    return (
        <div className='row mt-3'>
            <div className="div col-md-3">
                <CreateCategory />
            </div>
            <div className="col-md-9">
                <table class="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Id</th>
                            <th>Category name</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {categories.map((cate, i) => {
                            return <CategoryItem key={i + 1} key={cate._id} item={cate} />
                        })}

                    </tbody>
                </table>
            </div>

        </div>

    );
};

export default CategoriesList;