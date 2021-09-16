import React from 'react';
import { Route, Switch } from 'react-router';
import { ToastContainer } from 'react-toastify';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Home from '../pages/home/Home';
import Login from '../pages/auth/Login';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute path="/">
          <Home />
        </PrivateRoute>
      </Switch>

      <ToastContainer />
    </div>
  );
}

export default App;
