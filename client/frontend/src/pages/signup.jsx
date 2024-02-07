import React, { useState } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { useSignup } from '../hooks/useSignup';

function Signup() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password, role);
    setShowSuccessMessage(true);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  return (
    <Card className="mx-auto mt-4" style={{ maxWidth: '600px' }}>
      <Card.Body>
        <Card.Title className="text-center mb-4">Sign Up</Card.Title>
        {showSuccessMessage && (
          <Alert variant="success" onClose={() => setShowSuccessMessage(false)} dismissible>
            User registered successfully! Please sign in.
          </Alert>
        )}
        <Form>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formRole">
            <Form.Label>Select Role</Form.Label>
            <Form.Control as="select" value={role} onChange={handleRoleChange}>
              <option value="">Select Role</option>
              <option value="patient">Patient</option>
              <option value="hospital">Hospital</option>
              <option value="insurance">Insurance</option>
            </Form.Control>
          </Form.Group>
        </Form>
        <Button
          variant="primary"
          className="button-submit"
          onClick={handleSubmit}
          disabled={isLoading || !role}
          block
        >
          Sign Up
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Signup;
