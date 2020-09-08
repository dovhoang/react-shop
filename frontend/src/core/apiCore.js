import { API } from '../config'

export const getProducts = (sortBy) => (
    fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=4`, {
        method: 'GET',
    })
        .then(response => (response.json()))
        .catch(error => { console.log(error) })
)

export const searchProduct = params => {
    const query = queryString.stringify(params);
    console.log("query", query);
    return fetch(`${API}/products/search?${query}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};