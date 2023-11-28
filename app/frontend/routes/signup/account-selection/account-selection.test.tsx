import { describe, test } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AccountSelection } from './account-selection';

describe('AccountSelection', () => {
  test('render', () => {});
  render(<AccountSelection />, { wrapper: BrowserRouter });
  screen.getByText('I want to open a cash account.');
  screen.getByText('I want to open an investing account.');
});
