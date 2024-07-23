// src/Login.js
import React from 'react';
import { auth } from './firebase';

const Login = () => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <div>
      <button onClick={signInWithGoogle}>Login com Google</button>
    </div>
  );
};

export default Login;
