import React from 'react';
import MainNavigation from './src/Navigation/Navigator';
import AuthState from './src/context/AuthState';
export default function App() {
  return (
    <AuthState>
      <MainNavigation />
    </AuthState>
  );
}
