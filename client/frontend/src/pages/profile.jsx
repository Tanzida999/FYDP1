import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext.js';
import { useProfile } from '../hooks/useProfile.jsx';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';

const Profile = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { user } = useAuthContext();
  const { profile, error } = useProfile();
  const [User, setUser] = useState({
    dob: '',
    company_name: '',
    address: '',
    phone: '',
    website: '',
    medical_service_type: '',
    registration_number: '',
    tin: '',
    insurance_license_number: '',
    logo: '',
  });

  // Getting any profile if it already exists in the database
  const fetchUserProfile = async (email) => {
    try {
      const response = await axios.get(`http://localhost:3001/user/profile/${encodeURIComponent(email)}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // Fetch the user's existing data when the page loads
  useEffect(() => {
    const fetchExistingData = async () => {
      try {
        const existingUserData = await fetchUserProfile(user._id); // Use user._id instead of user.id
        setUser(existingUserData);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    if (user) {
      fetchExistingData();
    }
  }, [user]);

  // Handling the change when you update the input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'dob') {
      const selectedDate = new Date(value);
      const today = new Date();

      if (selectedDate > today) {
        setErrorMessage('Date of Birth cannot be a future date.');
        setTimeout(() => {
          setErrorMessage('');
        }, 5000);
        return;
      }
    }
    setUser({ ...User, [name]: value });
  };

  // Handle when you click the save button
  const handleSaveClick = async () => {
    try {
      // Update the user profile on the server
      await profile(
        user._id, // Use user._id instead of user.id
        user.email,
        User.firstName,
        User.lastName,
        User.phone,
        User.address,
        User.dob,
        User.company_name,
        User.address,
        User.phone,
        User.website,
        User.medical_service_type,
        User.registration_number,
        User.tin,
        User.insurance_license_number,
        User.logo
      );

      // Display success message
      setShowSuccessMessage(true);

      // Hide the success message after a few seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 1500);
    } catch (error) {
      console.error('Error updating user profile:', error);
      // Handle the error, e.g., display an error message
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Profile</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{user.email}</Card.Subtitle>
              <Form>
                <Row>
                  {/* Phone Number */}
                  <Col md={6}>
                    <Form.Group controlId="formPhone">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control type="text" name="phone" value={User.phone} onChange={handleInputChange} />
                    </Form.Group>
                  </Col>
                  {/* Address */}
                  <Col md={6}>
                    <Form.Group controlId="formAddress">
                      <Form.Label>Address</Form.Label>
                      <Form.Control type="text" name="address" value={User.address} onChange={handleInputChange} />
                    </Form.Group>
                  </Col>
                  {/* Date of Birth */}
                  <Col md={6}>
                    <Form.Group controlId="formDOB">
                      <Form.Label>Date of Birth</Form.Label>
                      <Form.Control type="date" name="dob" value={User.dob} onChange={handleInputChange} />
                    </Form.Group>
                  </Col>
                  {/* Company Name */}
                  <Col md={6}>
                    <Form.Group controlId="formCompanyName">
                      <Form.Label>Company Name</Form.Label>
                      <Form.Control type="text" name="company_name" value={User.company_name} onChange={handleInputChange} />
                    </Form.Group>
                  </Col>
                  {/* Website */}
                  <Col md={6}>
                    <Form.Group controlId="formWebsite">
                      <Form.Label>Website</Form.Label>
                      <Form.Control type="text" name="website" value={User.website} onChange={handleInputChange} />
                    </Form.Group>
                  </Col>
                  {/* Medical Service Type */}
                  <Col md={6}>
                    <Form.Group controlId="formMedicalServiceType">
                      <Form.Label>Medical Service Type</Form.Label>
                      <Form.Control as="select" name="medical_service_type" value={User.medical_service_type} onChange={handleInputChange}>
                        <option value="general">General</option>
                        <option value="surgery">Surgery</option>
                        <option value="pediatrics">Pediatrics</option>
                        <option value="others">Others</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  {/* Registration Number */}
                  <Col md={6}>
                    <Form.Group controlId="formRegistrationNumber">
                      <Form.Label>Registration Number</Form.Label>
                      <Form.Control type="text" name="registration_number" value={User.registration_number} onChange={handleInputChange} />
                    </Form.Group>
                  </Col>
                  {/* TIN */}
                  <Col md={6}>
                    <Form.Group controlId="formTIN">
                      <Form.Label>TIN</Form.Label>
                      <Form.Control type="text" name="tin" value={User.tin} onChange={handleInputChange} />
                    </Form.Group>
                  </Col>
                  {/* Insurance License Number */}
                  <Col md={6}>
                    <Form.Group controlId="formInsuranceLicenseNumber">
                      <Form.Label>Insurance License Number</Form.Label>
                      <Form.Control type="text" name="insurance_license_number" value={User.insurance_license_number} onChange={handleInputChange} />
                    </Form.Group>
                  </Col>
                  {/* Logo */}
                  <Col md={6}>
                    <Form.Group controlId="formLogo">
                      <Form.Label>Logo</Form.Label>
                      <Form.Control type="text" name="logo" value={User.logo} onChange={handleInputChange} />
                    </Form.Group>
                  </Col>
                </Row>
                {/* Update Profile Button */}
                <Button variant="primary" onClick={handleSaveClick}>
                  Save Changes
                </Button>
              </Form>
              {showSuccessMessage && <Alert variant="success">Profile updated successfully!</Alert>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
