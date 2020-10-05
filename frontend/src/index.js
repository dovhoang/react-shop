import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'
import { isAuthenticate } from './auth/apiAuth';
import { createReducer, configureStore, createAction } from '@reduxjs/toolkit'
import { AUTH } from './ActionType'
import { Provider } from 'react-redux'
import { countCart, getCart } from './core/cartHelper'

const auth = createAction('AUTH');
const cartChange = createAction('CART_CHANGE')

const reducer = createReducer({
  auth: isAuthenticate(),
  cart: getCart()
}, {
  [auth]: state => {
    return { auth: isAuthenticate() }
  },
  [cartChange]: state => ({
    cart: getCart()
  })
})

const store = configureStore({
  reducer: reducer
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
