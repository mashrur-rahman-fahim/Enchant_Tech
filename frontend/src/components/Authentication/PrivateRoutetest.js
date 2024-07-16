// file: D:/web_app/Enchant_Tech/frontend/src/PrivateRoute.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/Authentication/AuthContext';
import { PrivateRoute } from './App'; // Adjust the import based on your actual file structure
import '@testing-library/jest-dom/extend-expect';

const TestComponent = () => <div>Test Component</div>;
const LoginComponent = () => <div>Login Page</div>;

const AuthenticatedApp = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/private" element={<PrivateRoute component={TestComponent} />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

const renderWithAuthProvider = (isLoggedIn) => {
  jest.spyOn(useAuth, 'isLoggedIn', 'get').mockReturnValue(isLoggedIn);
  render(<AuthenticatedApp />);
};

test('redirects to login page if user is not authenticated', () => {
  renderWithAuthProvider(false);
  expect(screen.queryByText('Test Component')).toBeNull();
  expect(screen.getByText('Login Page')).toBeInTheDocument();
});

test('renders component if user is authenticated', () => {
  renderWithAuthProvider(true);
  expect(screen.getByText('Test Component')).toBeInTheDocument();
});
