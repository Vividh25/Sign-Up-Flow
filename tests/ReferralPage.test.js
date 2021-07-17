import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import Referral from '../src/components/Referral';

const mockRefData = new Map();

mockRefData.set('rfed123', 'Ankush');
mockRefData.set('erd234', 'Swaraj');
mockRefData.set('tgh546', 'Sumit');

const mockUserNumber = jest.fn().mockReturnValue(35);

beforeEach(() => {
  render(
    <Referral
      mockRefData={mockRefData}
      generateRandomUserNumber={mockUserNumber}
    />
  );
});

afterEach(() => {
  cleanup();
});

describe('Tests for submit button', () => {
  test('Referral code entered by the user does not match', () => {
    const refInput = screen.getByTestId('ref-input');
    const submitBtn = screen.getByTestId('submit-btn');
    const errMsg = screen.getByTestId('error-msg');
    fireEvent.change(refInput, { target: { value: 'win1234' } });
    fireEvent.click(submitBtn);
    expect(errMsg.style.display).toBe('');
  });

  test('Referral code entered by the user matches', () => {
    const refInput = screen.getByTestId('ref-input');
    const submitBtn = screen.getByTestId('submit-btn');
    const errMsg = screen.getByTestId('error-msg');
    fireEvent.change(refInput, { target: { value: 'rfed123' } });
    fireEvent.click(submitBtn);
    expect(errMsg.style.display).toBe('none');
  });

  test('Check if the submit button leads to the desired page', () => {
    const refInput = screen.getByTestId('ref-input');
    const submitBtn = screen.getByTestId('submit-btn');
    fireEvent.change(refInput, { target: { value: 'rfed123' } });
    fireEvent.click(submitBtn);
    const greeting = screen.getByTestId('greeting');
    expect(greeting).toBeInTheDocument();
  });
});

describe('Tests for I dont have it button', () => {
  test('User clicks the I dont have it button', () => {
    const noRefBtn = screen.getByTestId('no-ref-btn');
    fireEvent.click(noRefBtn);
    const greetingWithoutRef = screen.getByTestId('greeting-without-ref');
    expect(greetingWithoutRef).toBeInTheDocument();
  });
});

describe('Tests for last two pages', () => {
  test('Referral Page', () => {
    const refInput = screen.getByTestId('ref-input');
    const submitBtn = screen.getByTestId('submit-btn');
    fireEvent.change(refInput, { target: { value: 'rfed123' } });
    fireEvent.click(submitBtn);
    const greeting = screen.getByTestId('greeting');
    expect(greeting.textContent).toContain(mockRefData.get(refInput.value));
  });

  test('No Referral Page', () => {
    const noRefBtn = screen.getByTestId('no-ref-btn');
    fireEvent.click(noRefBtn);
    const greetingWithoutRef = screen.getByTestId('greeting-without-ref');
    expect(greetingWithoutRef.textContent).toContain(mockUserNumber());
  });
});
