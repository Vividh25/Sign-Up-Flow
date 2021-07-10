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

describe('Tests for password field', () => {
  test('Both password fields dont have the same text', () => {
    const utils = render(<Login />);
    const passErrprMsg = utils.getByTestId('pass-error-msg');
    const passwordField = utils.getByTestId('password-field');
    const confirmPasswordField = utils.getByTestId('confirm-pass-field');
    fireEvent.change(passwordField, { target: { value: 'test-pass' } });
    fireEvent.change(confirmPasswordField, { target: { value: 'tes-pass' } });
    expect(confirmPasswordField.classList).toContain('invalid-field');
    expect(passErrprMsg).toHaveTextContent(/Passwords don't match/);
  });

  test('User clicks on show button', () => {
    const utils = render(<Login />);
    const showBtn = utils.getByTestId('show-btn');
    const passwordField = utils.getByTestId('password-field');
    fireEvent.change(passwordField, { target: { value: 'test-pass' } });
    fireEvent.click(showBtn);
    expect(passwordField.type).toBe('text');
    fireEvent.click(showBtn);
    expect(passwordField.type).toBe('password');
  });
});

// describe('Tests for submit button', () => {
//     test("")
// })
