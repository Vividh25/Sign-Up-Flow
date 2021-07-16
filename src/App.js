import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import OtpPage from './components/OtpPage';
import { otpRoute } from './routes';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/otp'>
          <OtpPage />
        </Route>
        <Route path='/'>
          <Login path={otpRoute} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
