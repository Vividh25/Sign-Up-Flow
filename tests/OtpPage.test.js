import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import App from '../src/App';
import OtpPage from '../src/components/OtpPage';

const renderWithRouter = (ui, { route = '/otp' } = {}) => {
  window.history.pushState({}, 'OtpPage', route);

  return render(ui, { wrapper: BrowserRouter });
};

describe('Tests for OTP field', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  afterEach(() => {
    cleanup();
  });
  test('User enters a non-numeric value in the OTP field', () => {
    const digit1 = screen.getByTestId('digit-field-1');
    const digit2 = screen.getByTestId('digit-field-2');
    const digit3 = screen.getByTestId('digit-field-3');
    const digit4 = screen.getByTestId('digit-field-4');
    const digit5 = screen.getByTestId('digit-field-5');
    fireEvent.change(digit1, { target: { value: 'a' } });
    expect(digit1.classList).toContain('invalid-otp-field');
    fireEvent.change(digit2, { target: { value: 'a' } });
    expect(digit2.classList).toContain('invalid-otp-field');
    fireEvent.change(digit3, { target: { value: 'a' } });
    expect(digit3.classList).toContain('invalid-otp-field');
    fireEvent.change(digit4, { target: { value: 'a' } });
    expect(digit4.classList).toContain('invalid-otp-field');
    fireEvent.change(digit5, { target: { value: 'a' } });
    expect(digit5.classList).toContain('invalid-otp-field');
  });
});

describe('Tests for Check OTP Button', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  afterEach(() => {
    cleanup();
  });

  test('Check all the input fields have max length as 1', () => {
    const digit1 = screen.getByTestId('digit-field-1');
    const digit2 = screen.getByTestId('digit-field-2');
    const digit3 = screen.getByTestId('digit-field-3');
    const digit4 = screen.getByTestId('digit-field-4');
    const digit5 = screen.getByTestId('digit-field-5');
    expect(digit1.maxLength).toBe(1);
    expect(digit2.maxLength).toBe(1);
    expect(digit3.maxLength).toBe(1);
    expect(digit4.maxLength).toBe(1);
    expect(digit5.maxLength).toBe(1);
  });
});

describe('Tests for otp checking', () => {
  const renderPageWithRouter = (ui, { route = '/referral' } = {}) => {
    window.history.pushState({}, 'OtpPage', route);

    return render(ui, { wrapper: BrowserRouter });
  };
  const mockRandom = jest.fn().mockReturnValue(12345);
  beforeEach(() => {
    renderPageWithRouter(<OtpPage generateRandomOTP={mockRandom} />);
  });
  afterEach(() => {
    cleanup();
  });
  test('User enters the worng OTP', () => {
    const errMsg = screen.getByTestId('err-msg');
    const checkBtn = screen.getByTestId('check-otp-btn');
    const digit1 = screen.getByTestId('digit-field-1');
    const digit2 = screen.getByTestId('digit-field-2');
    const digit3 = screen.getByTestId('digit-field-3');
    const digit4 = screen.getByTestId('digit-field-4');
    const digit5 = screen.getByTestId('digit-field-5');
    fireEvent.change(digit1, { target: { value: '1' } });
    fireEvent.change(digit2, { target: { value: '3' } });
    fireEvent.change(digit3, { target: { value: '4' } });
    fireEvent.change(digit4, { target: { value: '4' } });
    fireEvent.change(digit5, { target: { value: '5' } });
    fireEvent.click(checkBtn);
    expect(mockRandom).toHaveBeenCalled();
    expect(errMsg.style.display).toBe('');
  });
  test('User enters the correct OTP', () => {
    const errMsg = screen.getByTestId('err-msg');
    const checkBtn = screen.getByTestId('check-otp-btn');
    const digit1 = screen.getByTestId('digit-field-1');
    const digit2 = screen.getByTestId('digit-field-2');
    const digit3 = screen.getByTestId('digit-field-3');
    const digit4 = screen.getByTestId('digit-field-4');
    const digit5 = screen.getByTestId('digit-field-5');
    fireEvent.change(digit1, { target: { value: '1' } });
    fireEvent.change(digit2, { target: { value: '2' } });
    fireEvent.change(digit3, { target: { value: '3' } });
    fireEvent.change(digit4, { target: { value: '4' } });
    fireEvent.change(digit5, { target: { value: '5' } });
    fireEvent.click(checkBtn);
    expect(mockRandom).toHaveBeenCalled();
    expect(errMsg.style.display).toBe('none');
  });
});
