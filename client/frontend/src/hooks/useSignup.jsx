import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, role) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3001/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      } else {
        // Saving the user to local storage
        localStorage.setItem('user', JSON.stringify(json));

        // Update the User Context
        dispatch({ type: 'LOGIN', payload: json });

        window.alert("Successful sign up");
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setError('An error occurred during signup');
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
