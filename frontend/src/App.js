import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import SignIn from './user/SignIn'
import SignUp from './user/SignUp'
import Home from './core/Home'
import TopBar from './core/TopBar'

function App() {
  return (
    <Router>
      <TopBar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
      </Switch>
    </Router>
  );
}

export default App;
