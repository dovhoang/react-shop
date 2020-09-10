import { API } from '../config'

export const createCategory = (category, userId, token) => (
    fetch(`${API}/category/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        })
)

export const createProduct = (product, userId, token) => (
    fetch(`${API}/product/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        })
)

export const getCategoryById = (id) => (
    fetch(`${API}/category/${id}`, {
        method: 'GET',
    })
        .then(response => (response.json()))
        .catch(error => { console.log(error) })
)

export const getCategories = () => (
    fetch(`${API}/categories`, {
        method: 'GET',
    })
        .then(response => (response.json()))
        .catch(error => { console.log(error) })
)

