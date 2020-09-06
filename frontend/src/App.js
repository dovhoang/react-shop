import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import SignIn from './user/SignIn'
import SignUp from './user/SignUp'
import Home from './core/Home'
import TopBar from './core/TopBar'
import UserRoute from './auth/UserRoute'
import AdminRoute from './auth/AdminRoute'
import Profile from './user/Profile'
import HistoryPurchase from './user/HistoryPurchase'
import CreateCategory from './admin/CreateCategory'
import CreateProduct from './admin/CreateProduct'

function App() {
  return (
    <Router>
      <TopBar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
        <UserRoute path='/profile' exact><Profile /></UserRoute>
        <UserRoute path='/history-purchase' exact><HistoryPurchase /></UserRoute>
        <AdminRoute path='/create/category' exact><CreateCategory /></AdminRoute>
        <AdminRoute path='/create/product' exact><CreateProduct /></AdminRoute>
      </Switch>
    </Router>
  );
}

export default App;
