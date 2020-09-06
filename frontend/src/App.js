import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import SignIn from './user/SignIn'
import SignUp from './user/SignUp'
import Home from './core/Home'
import TopBar from './core/TopBar'
import UserRoute from './auth/UserRoute'
import Profile from './user/Profile'
import HistoryPurchase from './user/HistoryPurchase'

function App() {
  return (
    <Router>
      <TopBar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
        <UserRoute path='/profile' component={Profile} />
        <UserRoute path='/history-purchase' component={HistoryPurchase} />
      </Switch>
    </Router>
  );
}

export default App;
