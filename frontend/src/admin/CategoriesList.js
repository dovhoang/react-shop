import React, { useState, useEffect } from 'react'
import { getCategories } from './apiAdmin'
import { isAuthenticate } from '../auth/apiAuth';
import '../index.css'
import CreateCategory from './CreateCategory';
import CategoryItem from './CategoryItem';


const CategoriesList = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [created, setCreated] = useState(false);

    const [categories, setCatetgories] = useState([]);
    const [errorLoadCat, setErrorLoadCat] = useState('');


    const loadCategories = () => {
        setCreated(false);
        getCategories().then(data => {
            if (data.error) {
                setErrorLoadCat(data.error);
            } else {
                setErrorLoadCat('');
                setCatetgories(data);
            }
        })
    }

    useEffect(() => loadCategories(), [created])

    return (
        <div className='container'>
            <div className='row mt-3'>
                <div className="div col-md-3">
                    <CreateCategory setCreated={setCreated} />
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
                                return <CategoryItem key={i} item={cate} />
                            })}

                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default CategoriesList;