import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateOrderComponent from './CreateOrderComponent';

describe('<CreateOrderComponent />', () => {
  test('it should mount', () => {
    render(<CreateOrderComponent />);
    
    const createOrderComponent = screen.getByTestId('CreateOrderComponent');

    expect(createOrderComponent).toBeInTheDocument();
  });
});