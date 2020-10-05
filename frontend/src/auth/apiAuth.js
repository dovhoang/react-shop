import { API } from '../config'

export const signup = (user) => {
    return fetch(`${API}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const signin = (user) => {
    return fetch(`${API}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};
export const signout = next => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt');
        localStorage.removeItem('cart');
        next();
        return fetch(`${API}/signout`, {
            method: 'GET'
        })
            .then(response => {
                console.log('signout', response);
            })
            .catch(err => console.log(err));
    }
};

export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
};

export const isAuthenticate = () => {
    if (typeof window == 'undefined') return false;
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    }
    return false;
};

export const isAdmin = () => {
    if (typeof window == 'undefined') return false;
    if (JSON.parse(localStorage.getItem('jwt')) !== null) {
        return JSON.parse(localStorage.getItem('jwt')).user.role === 1;
    }
    return false;
};

export const isUserRegister = () => {
    if (typeof window == 'undefined') return false;
    if (JSON.parse(localStorage.getItem('jwt')) !== null) {
        return JSON.parse(localStorage.getItem('jwt')).user.role === 0;
    }
    return false;
};
