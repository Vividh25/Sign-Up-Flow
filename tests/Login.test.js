import { render, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import Login from '../src/components/Login';
import '@testing-library/jest-dom/extend-expect';

describe('Tests for Email Field', () => {
  test('Validation of user email', () => {
    const utils = render(<Login />);
    const loginField = utils.getByTestId('email-field');
    const errorMsg = utils.getByTestId('email-error-msg');
    fireEvent.change(loginField, { target: { value: 'test@testcom' } });
    expect(loginField.classList).toContain('invalid-field');
    expect(errorMsg).toHaveTextContent(/Please enter a valid email/);
  });

  test('If user navigates away', () => {
    const utils = render(<Login />);
    const loginField = utils.getByTestId('email-field');
    const errorMsg = utils.getByTestId('email-error-msg');
    const passwordField = screen.getByTestId('password-field');
    fireEvent.change(loginField, { target: { value: '' } });
    fireEvent.change(passwordField, { target: { value: 'test-pass' } });
    expect(loginField.classList).toContain('invalid-field');
    expect(errorMsg).toHaveTextContent(/Please enter a valid email/);
  });
});
