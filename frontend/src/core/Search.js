import React, { useState, useEffect } from 'react'
import { getCategories } from '../admin/apiAdmin'
import { searchProduct } from '../core/apiCore'
import { useHistory } from 'react-router-dom'
import {
    Input, Select
} from 'antd';
import 'antd/dist/antd.css';
const { Option } = Select;

const Search = (props) => {

    const history = useHistory();

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
                history.push('/');
            }
        })

    }

    const handlCategorySelect = (value, e) => {
        setData({ ...data, category: value });
    }

    return (
        <Input.Group compact>
            <Select defaultValue="Tất cả danh mục"
                onSelect={(value, e) => handlCategorySelect(value, e)}
                style={{ width: '25%' }}
            >
                {categories.map((cate, i) => (
                    <Option key={i} value={cate._id}>
                        {cate.name}
                    </Option>
                ))}
            </Select>
            <Input.Search style={{ width: '75%' }}
                placeholder='Tìm kiếm mọi thứ ...'
                onChange={handleChange('search')}
                onPressEnter={clickSearch}
                onSearch={clickSearch}
                value={search} />
        </Input.Group>
    );
};

export default Search;
