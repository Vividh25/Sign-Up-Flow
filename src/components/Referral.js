import React, { useState } from 'react';

function Referral({ mockRefData, generateRandomUserNumber }) {
  const [userRef, setUserRef] = useState('');
  const [name, setName] = useState('');
  const [refFound, setRefFound] = useState(true);
  const [noRef, setNoRef] = useState(false);

  const hidestyle = {
    display: 'none',
  };

  const handleChange = (e) => {
    e.preventDefault();
    setUserRef(e.target.value);
  };

  const checkRef = () => {
    const name = mockRefData.get(userRef);
    if (name === undefined) {
      setRefFound(false);
    } else {
      setName(name);
    }
  };

  if (noRef) {
    return (
      <div>
        <h1 data-testid='greeting-without-ref'>
          You are #{generateRandomUserNumber()} in the line 🎉
        </h1>
      </div>
    );
  }

  if (name === '') {
    return (
      <div className='container'>
        <h1 data-testid='referral-heading'>Referral Page</h1>
        <p data-testid='error-msg' style={refFound ? hidestyle : {}}>
          The entered referral code does not match
        </p>
        <input data-testid='ref-input' onChange={handleChange} />
        <button data-testid='submit-btn' onClick={checkRef}>
          Submit
        </button>
        <button data-testid='no-ref-btn' onClick={() => setNoRef(true)}>
          I don't have have it
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <h1 data-testid='greeting'>
          Congratulations, you've been referred by {name}
        </h1>
      </div>
    );
  }
}

export default Referral;
