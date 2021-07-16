import {
  render,
  fireEvent,
  screen,
  cleanup,
  waitFor,
} from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import App from '../src/App';

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Login', route);

  return render(ui, { wrapper: BrowserRouter });
};

beforeEach(() => {
  renderWithRouter(<App />);
});

afterEach(() => {
  jest.useRealTimers();
  cleanup();
});

describe('Tests for Email Field', () => {
  test('Validation of user email', () => {
    const loginField = screen.getByTestId('email-field');
    const errorMsg = screen.getByTestId('email-error-msg');
    fireEvent.change(loginField, { target: { value: 'test@testcom' } });
    expect(loginField.classList).toContain('invalid-field');
    expect(errorMsg).toHaveTextContent(/Please enter a valid email/);
  });

  test('If user navigates away', () => {
    const loginField = screen.getByTestId('email-field');
    const errorMsg = screen.getByTestId('email-error-msg');
    const passwordField = screen.getByTestId('password-field');
    fireEvent.change(loginField, { target: { value: '' } });
    fireEvent.change(passwordField, { target: { value: 'test-pass' } });
    expect(loginField.classList).toContain('invalid-field');
    expect(errorMsg).toHaveTextContent(/Please enter a valid email/);
  });
});

describe('Tests for password field', () => {
  test('Both password fields dont have the same text', () => {
    const passErrprMsg = screen.getByTestId('pass-error-msg');
    const passwordField = screen.getByTestId('password-field');
    const confirmPasswordField = screen.getByTestId('confirm-pass-field');
    fireEvent.change(passwordField, { target: { value: 'test-pass' } });
    fireEvent.change(confirmPasswordField, { target: { value: 'tes-pass' } });
    expect(confirmPasswordField.classList).toContain('invalid-field');
    expect(passErrprMsg).toHaveTextContent(/Passwords don't match/);
  });

  test('User clicks on show button', () => {
    const showBtn = screen.getByTestId('show-btn');
    const passwordField = screen.getByTestId('password-field');
    fireEvent.change(passwordField, { target: { value: 'test-pass' } });
    fireEvent.click(showBtn);
    expect(passwordField.type).toBe('text');
    fireEvent.click(showBtn);
    expect(passwordField.type).toBe('password');
  });
});

describe('Tests for submit button', () => {
  test('User clicks submit without filling fields properly', () => {
    const submitBtn = screen.getByTestId('submit-btn');
    const emailField = screen.getByTestId('email-field');
    const passwordField = screen.getByTestId('password-field');
    const confirmPasswordField = screen.getByTestId('confirm-pass-field');

    //User leaves the email field empty
    fireEvent.change(emailField, { target: { value: '' } });
    expect(submitBtn.disabled).toBe(true);

    //user fills in an invalid email address
    fireEvent.change(emailField, { target: { value: 'test123@gmailcom' } });
    expect(submitBtn.disabled).toBe(true);

    //user leaves the password or confirm password field empty
    fireEvent.change(passwordField, { target: { value: '' } });
    expect(submitBtn.disabled).toBe(true);
    fireEvent.change(confirmPasswordField, { target: { value: '' } });
    expect(submitBtn.disabled).toBe(true);
    fireEvent.change(passwordField, { target: { value: 'test123' } });
    expect(submitBtn.disabled).toBe(true);
    fireEvent.change(confirmPasswordField, { target: { value: 'test' } });
    expect(submitBtn.disabled).toBe(true);

    //User fills all the fields correctly
    fireEvent.change(emailField, { target: { value: 'test123@gmail.com' } });
    fireEvent.change(passwordField, { target: { value: 'test123' } });
    fireEvent.change(confirmPasswordField, { target: { value: 'test123' } });
    expect(submitBtn.disabled).toBe(false);
  });

  test('User clicks the submit button', async () => {
    jest.useFakeTimers();
    const emailField = screen.getByTestId('email-field');
    const passwordField = screen.getByTestId('password-field');
    const confirmPasswordField = screen.getByTestId('confirm-pass-field');
    const submitBtn = screen.getByTestId('submit-btn');
    fireEvent.change(emailField, { target: { value: 'test123@gmail.com' } });
    fireEvent.change(passwordField, { target: { value: 'test123' } });
    fireEvent.change(confirmPasswordField, { target: { value: 'test123' } });
    fireEvent.click(submitBtn);
    expect(submitBtn.disabled).toBe(true);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 3000);
    await waitFor(
      () => {
        expect(submitBtn.disabled).toBe(false);
        const otpPageHeading = screen.getByTestId('otp-heading');
        expect(otpPageHeading).toHaveTextContent(/OTP Page/);
      },
      { timeout: 3000 }
    );
  });
});
