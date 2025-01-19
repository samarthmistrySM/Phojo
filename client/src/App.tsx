import React from 'react';
import MainNavigation from './Navigation/Navigator';
import AuthState from './context/AuthState';
export default function App() {
  return (
    <AuthState>
      <MainNavigation />
    </AuthState>
  );
}
