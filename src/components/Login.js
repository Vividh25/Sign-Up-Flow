import React, { useState } from 'react';
import '../styles/Login.css';

function Login() {
  const [showPass, setShowPass] = useState(false);
  const [confirmPass, setConfirmPass] = useState(true);
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
    event.preventDefault();
    if (userEmail === '') {
      setEmailValid(false);
    } else {
      setEmailValid(true);
      setPassword(event.target.value);
    }
  };

  const handleConfirmPass = (event) => {
    event.preventDefault();
    if (event.target.value !== password) {
      setConfirmPass(false);
    } else {
      setConfirmPass(true);
    }
  };

  return (
    <div className='container'>
      <form className='login-form'>
        <div
          className='error-msg'
          data-testid='email-error-msg'
          style={!emailVaild && password === '' ? {} : hideStyle}
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
        <div className='password-field'>
          <input
            className={`${passwordValid ? 'input-field' : 'invalid-field'}`}
            type={showPass ? 'text' : 'password'}
            placeholder='password'
            data-testid='password-field'
            onChange={handlePassword}
          />
          <button
            data-testid='show-btn'
            onClick={(e) => {
              e.preventDefault();
              setShowPass(!showPass);
            }}
          >
            show
          </button>
        </div>
        <div
          data-testid='pass-error-msg'
          className='error-msg'
          style={confirmPass ? hideStyle : {}}
        >
          Passwords don't match
        </div>
        <input
          className={`${confirmPass ? 'input-field' : 'invalid-field'}`}
          type='password'
          placeholder='confirm password'
          data-testid='confirm-pass-field'
          onChange={handleConfirmPass}
        />
      </form>
    </div>
  );
}

export default Login;
