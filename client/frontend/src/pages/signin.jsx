import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Alert, Container, Row, Col, Card } from 'react-bootstrap';
import { useLogin } from '../hooks/useLogin';

function Signin() {
  const location = useLocation();
  const [message, setMessage] = useState(location.state && location.state.message);
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const navigate = useNavigate();
  const { setUser } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginSuccessful = await login(email, password);
      if (loginSuccessful) {
        navigate('/');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
          <Card className="mx-auto mt-4" style={{ maxWidth: '600px' }}>
            <Card.Body>
              <Card.Title className="text-center mb-4">Account Login</Card.Title>
              {message && <Alert variant="success">{message}</Alert>}
              <Form>
                <Form.Group controlId="formEmail">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </Form.Group>
                <Form.Group controlId="formPassword">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </Form.Group>
                {error && <Alert variant="danger">{error}</Alert>}
                {/* <div className='forgot-password-container'>
                  <div className='forgot-password text-center'>
                    <span onClick={() => navigate('../forget-password')}>Forgot Password?</span>
                  </div>
                </div> */}
                <Button
                  variant="primary"
                  className='login-pg-buttons'
                  onClick={handleSubmit}
                  disabled={isLoading}
                  block
                >
                  Sign In
                </Button>
              </Form>
              <div className='text-container text-center'>Don't have an account? Sign up below!</div>
              <Button
                variant="secondary"
                className='login-pg-buttons'
                onClick={() => navigate('../signup')}
                block
              >
                Sign up
              </Button>
            </Card.Body>
          </Card>
  );
}

export default Signin;