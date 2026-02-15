import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import axios from 'axios';

function Login({ onLoginSuccess }) {
  const handleGoogleSignIn = async () => {
    try {
      // Sign in with Google popup
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      console.log('Google sign-in successful:', user);
      
      // Register/login user in our backend
      const response = await axios.post('http://127.0.0.1:5000/api/auth/register', {
        firebase_uid: user.uid,
        email: user.email,
        name: user.displayName
      });
      
      const userData = response.data;
      console.log('User registered in backend:', userData);
      
      // Initialize default categories for new users
      try {
        await axios.post(`http://127.0.0.1:5000/api/categories/initialize/${userData.id}`);
        console.log('Default categories initialized');
      } catch (error) {
        console.log('Categories already exist or error:', error);
      }
      
      // Call the success callback with user data
      onLoginSuccess(userData);
      
    } catch (error) {
      console.error('Sign-in error:', error);
      alert('Failed to sign in. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>💰 Expense Tracker</h1>
        <p style={styles.subtitle}>Track your expenses, manage your budget</p>
        
        <button onClick={handleGoogleSignIn} style={styles.button}>
          <img 
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
            alt="Google" 
            style={styles.googleIcon}
          />
          Sign in with Google
        </button>
        
        <p style={styles.footer}>
          Secure authentication powered by Firebase
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  card: {
    backgroundColor: 'white',
    padding: '60px 40px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    maxWidth: '400px',
    width: '100%'
  },
  title: {
    fontSize: '32px',
    marginBottom: '10px',
    color: '#333'
  },
  subtitle: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '40px'
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    width: '100%',
    padding: '14px 24px',
    fontSize: '16px',
    fontWeight: '500',
    color: '#333',
    backgroundColor: 'white',
    border: '2px solid #ddd',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    marginBottom: '20px'
  },
  googleIcon: {
    width: '20px',
    height: '20px'
  },
  footer: {
    fontSize: '12px',
    color: '#999',
    marginTop: '20px'
  }
};

export default Login;