import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../src/pages/Home';

jest.mock('../src/components/Footer', () => {
  return function DummyFooter() {
    return <div data-testid="footer">Footer</div>;
  };
});

jest.mock('./../maomao.jpg', () => 'https://placehold.co/600x400', { virtual: true });

describe('Home Component', () => {
  beforeEach(() => {
    render(<Home />);
  });

  test('renders profile information', () => {
    expect(screen.getByText('Yiming')).toBeInTheDocument();
    expect(screen.getByText('Data & AI Engineer')).toBeInTheDocument();
    expect(screen.getByText(/new graduate of computer science/)).toBeInTheDocument();
  });

  test('renders Education section', () => {
    expect(screen.getByText('Education')).toBeInTheDocument();
    expect(screen.getByText('University of Amsterdam')).toBeInTheDocument();
    expect(screen.getByText('Henan University')).toBeInTheDocument();
  });

  test('renders Publications section', () => {
    expect(screen.getByText('Publications')).toBeInTheDocument();
    expect(screen.getByText(/Retrieval-based Question Answering/)).toBeInTheDocument();
    expect(screen.getByText(/Multihead Attention-Based Audio Image Generation/)).toBeInTheDocument();
    expect(screen.getByText(/Fine-Grained Label Learning/)).toBeInTheDocument();
  });

  test('renders Experience section', () => {
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Data & AI Engineer')).toBeInTheDocument();
    expect(screen.getByText('Research Assistance')).toBeInTheDocument();
  });

  test('renders Footer component', () => {
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  test('renders profile image', () => {
    const img = screen.getByAltText('Yiming');
    expect(img).toBeInTheDocument();
  });
});