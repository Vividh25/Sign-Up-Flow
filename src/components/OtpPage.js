import React, { useEffect, useState } from 'react';
import '../styles/OtpPage.css';
import { useHistory } from 'react-router-dom';

function OtpPage({ generateRandomOTP, path }) {
  const [d1, setD1] = useState('');
  const [d2, setD2] = useState('');
  const [d3, setD3] = useState('');
  const [d4, setD4] = useState('');
  const [d5, setD5] = useState('');
  const [userOtp, setUserOtp] = useState('');
  const [errMsg, setErrMsg] = useState(false);

  const history = useHistory();

  const hideStyle = {
    display: 'none',
  };

  useEffect(() => {
    setUserOtp(d1 + d2 + d3 + d4 + d5);
  }, [d1, d2, d3, d4, d5]);

  const handleOTP = (e) => {
    e.preventDefault();
    switch (e.target.id) {
      case '1':
        setD1(e.target.value);
        e.target.nextSibling.focus();
        break;
      case '2':
        setD2(e.target.value);
        e.target.nextSibling.focus();
        break;
      case '3':
        setD3(e.target.value);
        e.target.nextSibling.focus();
        break;
      case '4':
        setD4(e.target.value);
        e.target.nextSibling.focus();
        break;
      case '5':
        setD5(e.target.value);
        break;
      default:
        console.log('ID not found');
    }
  };

  const checkDigit = (str) => {
    if (str === '') return true;
    return /^\d+$/.test(str);
  };

  const checkOTP = (e) => {
    e.preventDefault();
    const otp = generateRandomOTP();
    if (userOtp - 0 !== otp) {
      setErrMsg(true);
    } else {
      history.push(path);
    }
  };

  return (
    <div className='container'>
      <h1 data-testid='otp-heading'>OTP Page</h1>
      <p data-testid='err-msg' style={errMsg ? {} : hideStyle}>
        The entered OTP is wrong
      </p>
      <div className='otp-fields'>
        <input
          className={`${checkDigit(d1) ? 'otp-field' : 'invalid-otp-field'}`}
          data-testid='digit-field-1'
          id='1'
          onChange={handleOTP}
          maxLength={1}
        />
        <input
          className={`${checkDigit(d2) ? 'otp-field' : 'invalid-otp-field'}`}
          data-testid='digit-field-2'
          id='2'
          onChange={handleOTP}
          maxLength={1}
        />
        <input
          className={`${checkDigit(d3) ? 'otp-field' : 'invalid-otp-field'}`}
          data-testid='digit-field-3'
          id='3'
          onChange={handleOTP}
          maxLength={1}
        />
        <input
          className={`${checkDigit(d4) ? 'otp-field' : 'invalid-otp-field'}`}
          data-testid='digit-field-4'
          id='4'
          onChange={handleOTP}
          maxLength={1}
        />
        <input
          className={`${checkDigit(d5) ? 'otp-field' : 'invalid-otp-field'}`}
          data-testid='digit-field-5'
          id='5'
          onChange={handleOTP}
          maxLength='1'
        />
      </div>
      <button
        data-testid='check-otp-btn'
        className='check-btn'
        disabled={
          d1 !== '' && d2 !== '' && d3 !== '' && d4 !== '' && d5 !== ''
            ? false
            : true
        }
        onClick={checkOTP}
      >
        Check OTP
      </button>
    </div>
  );
}

export default OtpPage;
