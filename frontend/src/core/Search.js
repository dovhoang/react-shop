import React, { useState, useEffect } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import { fade, makeStyles } from '@material-ui/core/styles';
import { getCategories } from '../admin/apiAdmin'
import { searchProduct } from '../core/apiCore'


const useStyles = makeStyles((theme) => ({

    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(4),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: '400px',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    }


}));

const Search = (props) => {
    const classes = useStyles();

    const [data, setData] = useState({
        categories: [],
        category: '',
        search: '',
        results: props.searchResult,
        result: '',
        searched: false,
        error: ''
    });

    const {
        categories,
        category,
        search,
        results,
        result,
        searched,
        error
    } = data;


    const handleChange = name => (e) => {
        setData({ ...data, [name]: e.target.value })
    };

    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setData({ ...data, error: data.error });
            } else {
                setData({
                    ...data,
                    error: '',
                    categories: data
                })
            }
        })
    }

    useEffect(() => {
        loadCategories();
    }, [])

    const handleSearch = (value) => {
        props.handleSearch(value);
    }

    const clickSearch = (e) => {
        searchProduct({ category: category, search: search || undefined }).then(res => {
            if (res.error) {
                setData({ ...data, error: res.error })
            } else {
                setData({ ...data, results: res, searched: true });
                handleSearch({ results: res, searched: true });
            }
        })
    }







    return (
        <div className='d-flex d-row'>
            <div className='d-flex d-row'>
                <span className='mt-2 mr-2'>Categories</span>
                <select className='bg-blue' onChange={handleChange('category')}>
                    <option>-- All --</option>
                    {categories.map((cate, i) => (
                        <option key={i} value={cate._id}>
                            {cate.name}
                        </option>
                    ))}

                </select>
            </div>

            <div className={classes.search}>
                <Button style={{ color: 'white' }} onClick={clickSearch} >
                    <SearchIcon />
                </Button>
                <InputBase
                    id='searchId'
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={handleChange('search')}
                    value={search}
                />
            </div>
        </div>
    );
};

export default Search;
