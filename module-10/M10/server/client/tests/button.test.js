import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../src/components/Navbar';

test('renders Navbar without crashing', () => {
  render(
    <Router>
      <Navbar isAuthenticated={false} setIsAuthenticated={() => {}} />
    </Router>
  );
});