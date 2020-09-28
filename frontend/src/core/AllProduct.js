import React, { useState, useEffect } from 'react'

import { getCategories } from '../admin/apiAdmin'
import CheckBox from './CheckBox';
import { prices } from './fixedPrice'
import RadioBox from './RadioBox';
import { getFilteredProducts } from './apiCore'
import CCard from './Card'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(8),
    }
}));

const AllProduct = () => {

    const classes = useStyles();
    const [categories, setCategories] = useState([])
    const [myFilter, setMyFilter] = useState({
        filters: { category: [], price: [] }
    })

    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(6);
    const [size, setSize] = useState(0);
    const [error, setError] = useState('');
    const [filteredResult, setFilteredResult] = useState([]);

    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setCategories(data);
            }
        })
    }





    const loadFilterResults = (skip, limit, filters) => {
        console.log('load filter');
        getFilteredProducts(skip, limit, filters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResult([])
                setFilteredResult(data.data);
                setSize(data.size);
                setSkip(0);
            }
        })
    }

    const loadMore = () => {
        const newSkip = skip + limit;// load product at positon newSkip to newSkip+limit
        getFilteredProducts(newSkip, limit, myFilter.filters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResult([...filteredResult, ...data.data]);
                setSize(data.size);
                setSkip(newSkip);
            }
        })
    }

    const loadMoreButton = () => (
        size > 0 && size >= limit &&
        <button
            className='btn btn-info mb-3'
            onClick={loadMore}>
            More...
        </button>
    );

    useEffect(() => {
        loadCategories();
        loadFilterResults(skip, limit, myFilter);
    }, [])



    const handleFilter = (filters, filterBy) => {
        const newFilter = { ...myFilter };
        newFilter.filters[filterBy] = filters;


        if (filterBy === 'price') {
            let priceValues = handlePrice(filters);
            newFilter.filters[filterBy] = priceValues;
        }
        loadFilterResults(0, limit, myFilter.filters);//skip=0
        setMyFilter(newFilter);
    }

    const handlePrice = (value) => {
        let data = prices;
        let arrayPrices = [];

        for (let item in data) {
            if (data[item]._id === parseInt(value)) {
                arrayPrices = data[item].array;
            }
        }

        return arrayPrices;
    }

    return <div className='row'>
        <div className="col-md-3">
            <CheckBox
                categories={categories}
                handleFilter={filters =>
                    handleFilter(filters, 'category')} />
            <RadioBox
                prices={prices}
                handleFilter={filters =>
                    handleFilter(filters, 'price')} />
        </div>
        <div className="col-md-9">
            {!filteredResult.length && <h3 className='element-center mt-5'>No product found</h3>}
            <Container className={classes.cardGrid} maxWidth="lg">
                {/* End hero unit */}
                <Grid container spacing={4}>
                    {filteredResult.map(product => (
                        <CCard key={product._id} product={product} md={4} />
                    ))}
                </Grid>
            </Container>
            {loadMoreButton()}



        </div>
    </div >
};

export default AllProduct;