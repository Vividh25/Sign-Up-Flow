import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import OtpPage from './components/OtpPage';
import { otpRoute, referralRoute } from './routes';
import Referral from './components/Referral';

const generateRandomOTP = () => {
  const mockOTP = Math.random() * 100000;
  return Math.floor(mockOTP);
};

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/referral'>
          <Referral />
        </Route>
        <Route path='/otp'>
          <OtpPage generateRandomOTP={generateRandomOTP} path={referralRoute} />
        </Route>
        <Route path='/'>
          <Login path={otpRoute} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
