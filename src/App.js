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

const mockRefData = new Map();

mockRefData.set('ert345', 'Vividh');
mockRefData.set('rtgf234', 'Rahil');
mockRefData.set('tghy34', 'Ankush');
mockRefData.set('564ffg', 'Swaraj');
mockRefData.set('856rtf', 'Sumit');
mockRefData.set('erf889', 'Ankur');

const generateRandomUserNumber = () => {
  const val = Math.random() * 100;
  return Math.floor(val);
};

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/referral'>
          <Referral
            mockRefData={mockRefData}
            generateRandomUserNumber={generateRandomUserNumber}
          />
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
