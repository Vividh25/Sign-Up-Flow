import React, { useState } from 'react';
import '../styles/Login.css';

function Login() {
  const [password, setPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const [emailVaild, setEmailValid] = useState(true);

  const hideStyle = {
    display: 'none',
  };

  const checkInput = (ev) => {
    ev.preventDefault();
    const email = ev.target.value;
    setUserEmail(email);
    if ((!email.includes('@') || !email.includes('.')) && email.length > 10) {
      console.log('check input working');
      setEmailValid(false);
    } else {
      setEmailValid(true);
    }
  };

  const handlePassword = (event) => {
    if (userEmail === '') {
      setEmailValid(false);
    } else {
      setEmailValid(true);
      setPassword(event.target.value);
    }
  };

  return (
    <div className='container'>
      <form className='login-form'>
        <div
          className='error-msg'
          data-testid='email-error-msg'
          style={emailVaild && password === '' ? hideStyle : {}}
        >
          Please enter a valid email
        </div>
        <input
          className={`${emailVaild ? 'input-field' : 'invalid-field'}`}
          type='text'
          placeholder='email'
          data-testid='email-field'
          onChange={checkInput}
        />
        <input
          className={`${passwordValid ? 'input-field' : 'invalid-field'}`}
          type='password'
          placeholder='password'
          data-testid='password-field'
          onChange={handlePassword}
        />
      </form>
    </div>
  );
}

export default Login;
