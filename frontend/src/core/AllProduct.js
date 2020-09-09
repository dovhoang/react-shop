import React, { useState, useEffect } from 'react'

import { getCategories } from '../admin/apiAdmin'
import CheckBox from './CheckBox';

const AllProduct = () => {

    const [categories, setCategories] = useState([])
    const [error, setError] = useState('')
    const [myFilter, setMyFilter] = useState({
        filter: { category: [], price: [] }
    })

    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setCategories(data);
            }
        })
    }



    useEffect(() => {
        loadCategories();
    }, [])

    const handleFilter = (filter, filterBy) => {
        const newFilter = { ...myFilter };
        newFilter.filter[filterBy] = filter;
        setMyFilter(newFilter);
    }

    return <div className='row'>
        <div className="col-md-3">
            <CheckBox categories={categories}
                handleFilter={filter => handleFilter(filter, 'category')} />
        </div>
        <div className="col-md-9">
            {JSON.stringify(myFilter)}
        </div>
    </div >
};

export default AllProduct;