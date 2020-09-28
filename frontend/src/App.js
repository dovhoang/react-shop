import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import SignIn from './user/SignIn'
import SignUp from './user/SignUp'
import Home from './core/Home'
import TopBar from './core/TopBar'
import UserRoute from './auth/UserRoute'
import AdminRoute from './auth/AdminRoute'
import Profile from './user/Profile'
import HistoryPurchase from './user/HistoryPurchase'
import AllProduct from './core/AllProduct'
import SingleProduct from './core/SingleProduct'
import ProductsList from './admin/ProductsList'
import CategoriesList from './admin/CategoriesList'
import CreateProduct from './admin/CreateProduct'
import Cart from './core/Cart'
import UpdateCategory from './admin/UpdateCategory';
import UpdateProduct from './admin/UpdateProduct';
import { isAuthenticate } from './auth/apiAuth';

const App = () => {
  const [search, setSearch] = useState({
    searchResult: [],
    searched: false
  });
  const [userId, setUserId] = useState('')

  const handleSearch = (value) => {
    if (value) {
      setSearch({ ...search, searched: value.searched, searchResult: value.results })
    }
  }

  const getUserId = () => {
    if (isAuthenticate()) {
      setUserId(isAuthenticate().user._id)
    }
  }

  useEffect(() => {
    getUserId();
    handleSearch();
  }, [])

  return (
    <Router>
      <TopBar
        handleSearch={handleSearch}
        userId={userId} />
      <Switch>
        <Route path="/" exact
          render={props => (
            <Home {...props}
              search={search}
            />)} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/all-products" exact component={AllProduct} />
        <Route path="/product/:productId" exact component={SingleProduct} />
        <UserRoute path='/profile' exact><Profile /></UserRoute>
        <UserRoute path='/:userId/history-purchase' exact><HistoryPurchase /></UserRoute>
        <AdminRoute path='/admin/category' exact><CategoriesList /></AdminRoute>
        <AdminRoute path='/admin/product' exact><ProductsList /></AdminRoute>
        <AdminRoute path='/create/product' exact><CreateProduct /></AdminRoute>
        <AdminRoute path='/update/category/:categoryId' component={UpdateCategory} exact ><UpdateCategory /></AdminRoute>
        <AdminRoute path='/update/product/:productId' component={UpdateProduct} exact ><UpdateProduct /></AdminRoute>
      </Switch>
    </Router>
  );
}

export default App;
