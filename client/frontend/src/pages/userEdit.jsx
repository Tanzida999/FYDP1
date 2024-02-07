import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { PatternFormat } from 'react-number-format';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';

const UserEdit = () => {
    // Get user ID from the URL parameters
    const { id } = useParams();

    // State to manage the edited user data and loading state
    const [editedUser, setEditedUser] = useState({
        email: '',
        password: '',
        role: '',
        company_name: '',
        name: '',
        address: '',
        phone: '',
        website: '',
        medical_service_type: '',
        registration_number: '',
        tin: '',
        insurance_license_number: '',
        logo: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    // Navigation hook for redirecting after submission
    const navigate = useNavigate();

    // State to manage password strength and error
    const [passwordStrength, setPasswordStrength] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // Fetch user data when the component mounts
    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Fetch the user data from the API based on the ID
                const response = await axios.get(`http://localhost:3001/users/${id}`);
                const data = response.data;

                // Set the user data to the state
                setEditedUser(data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        // Check if there's an ID in the URL, then fetch the user data
        if (id) {
            fetchUser();
        }
    }, [id]);

    // Handle input changes in the form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prevUser) => ({
            ...prevUser,
            [name]: name === 'phone' ? value.replace(/\D/g, '') : value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Make a PUT request to update the user data
            await axios.put(`http://localhost:3001/users/${id}`, editedUser);
            alert('User updated successfully:', editedUser);

            // Reset loading state and navigate back to the user list
            setIsLoading(false);
            navigate('/users');
        } catch (error) {
            alert('Error updating user:', error);
            setIsLoading(false);
        }
    };

    // Function to validate password strength
    const validatePassword = (password) => {
        const minLength = 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*]/.test(password);

        let strength = 0;
        if (password.length >= minLength) strength += 1;
        if (hasUppercase) strength += 1;
        if (hasLowercase) strength += 1;
        if (hasNumber) strength += 1;
        if (hasSpecialChar) strength += 1;

        if (strength === 0) return 'Weak';
        if (strength === 1) return 'Moderate';
        if (strength >= 3) return 'Strong';

        return 'Weak'; // Default to Weak
    };

    // Handle password input changes
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;

        // Update the edited user state with the new password
        setEditedUser((prevUser) => ({
            ...prevUser,
            password: newPassword,
        }));

        // Check password strength
        const strength = validatePassword(newPassword);
        setPasswordStrength(strength);

        // Check if password meets criteria
        if (strength === 'Weak') {
            setPasswordError('Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
        } else {
            setPasswordError('');
        }
    };

    return (
        <Container fluid>
            <div style={{ display: 'flex' }}>
                {/* User edit form */}
                <div style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                    <div className='card p-3'>
                        <div className='d-flex justify-content-between m-2'>
                            <h2 className="header-emp-list">Edit User</h2>
                            <Button variant="outline-primary" className="edit-emp-button" onClick={() => navigate(`/users`)}>Back</Button>
                        </div>
                        <Form onSubmit={handleSubmit}>

                            {/* Email input */}
                            <Form.Group as={Row} controlId="formEmail">
                                <Form.Label column sm="6">Email:</Form.Label>
                                <Col sm="12">
                                    <Form.Control
                                        type='email'
                                        name='email'
                                        value={editedUser.email}
                                        onChange={handleInputChange}
                                        placeholder='Email'
                                        required
                                    />
                                </Col>
                            </Form.Group>

                            {/* Password input with strength indicator */}
                            <Form.Group as={Row} controlId="formPassword">
                                <Form.Label column sm="6">Password:</Form.Label>
                                <Col sm="12">
                                    <Form.Control
                                        type='password'
                                        name='password'
                                        value={editedUser.password}
                                        onChange={handlePasswordChange}
                                        placeholder='Password'
                                        required
                                    />
                                </Col>
                            </Form.Group>

                            {/* Role selection */}
                            <Form.Group as={Row} controlId="formRole">
                                <Form.Label column sm="6">Role:</Form.Label>
                                <Col sm="12">
                                    <Form.Control
                                        as="select"
                                        name='role'
                                        value={editedUser.role}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Role</option>
                                        <option value="patient">Patient</option>
                                        <option value="hospital">Hospital</option>
                                        <option value="insurance">Insurance</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>

                            {/* Other user fields go here, customize as needed */}
                            {/* Company Name input */}
                            <Form.Group as={Row} controlId="formCompanyName">
                                <Form.Label column sm="6">Company Name:</Form.Label>
                                <Col sm="12">
                                    <Form.Control
                                        type='text'
                                        name='company_name'
                                        value={editedUser.company_name}
                                        onChange={handleInputChange}
                                        placeholder='Company Name'
                                    />
                                </Col>
                            </Form.Group>

                            {/* Name input */}
                            <Form.Group as={Row} controlId="formName">
                                <Form.Label column sm="6">Name:</Form.Label>
                                <Col sm="12">
                                    <Form.Control
                                        type='text'
                                        name='name'
                                        value={editedUser.name}
                                        onChange={handleInputChange}
                                        placeholder='Name'
                                    />
                                </Col>
                            </Form.Group>

                            {/* Address input */}
                            <Form.Group as={Row} controlId="formAddress">
                                <Form.Label column sm="6">Address:</Form.Label>
                                <Col sm="12">
                                    <Form.Control
                                        type='text'
                                        name='address'
                                        value={editedUser.address}
                                        onChange={handleInputChange}
                                        placeholder='Address'
                                    />
                                </Col>
                            </Form.Group>

                            {/* Phone number input with formatting */}
                            <Form.Group as={Row} controlId="formPhone">
                                <Form.Label column sm="6">Phone:</Form.Label>
                                <Col sm="12">
                                    <PatternFormat
                                        name='phone'
                                        format="(###) ###-####"
                                        value={editedUser.phone}
                                        onChange={handleInputChange}
                                        placeholder='Phone'
                                    />
                                </Col>
                            </Form.Group>

                            {/* Website input */}
                            <Form.Group as={Row} controlId="formWebsite">
                                <Form.Label column sm="6">Website:</Form.Label>
                                <Col sm="12">
                                    <Form.Control
                                        type='text'
                                        name='website'
                                        value={editedUser.website}
                                        onChange={handleInputChange}
                                        placeholder='Website'
                                    />
                                </Col>
                            </Form.Group>

                            {/* Medical Service Type selection */}
                            <Form.Group as={Row} controlId="formMedicalServiceType">
                                <Form.Label column sm="6">Medical Service Type:</Form.Label>
                                <Col sm="12">
                                    <Form.Control
                                        as="select"
                                        name='medical_service_type'
                                        value={editedUser.medical_service_type}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select Medical Service Type</option>
                                        <option value="general">General</option>
                                        <option value="surgery">Surgery</option>
                                        <option value="pediatrics">Pediatrics</option>
                                        <option value="others">Others</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>

                            {/* Registration Number input */}
                            <Form.Group as={Row} controlId="formRegistrationNumber">
                                <Form.Label column sm="6">Registration Number:</Form.Label>
                                <Col sm="12">
                                    <Form.Control
                                        type='text'
                                        name='registration_number'
                                        value={editedUser.registration_number}
                                        onChange={handleInputChange}
                                        placeholder='Registration Number'
                                    />
                                </Col>
                            </Form.Group>

                            {/* TIN input */}
                            <Form.Group as={Row} controlId="formTIN">
                                <Form.Label column sm="6">TIN:</Form.Label>
                                <Col sm="12">
                                    <Form.Control
                                        type='text'
                                        name='tin'
                                        value={editedUser.tin}
                                        onChange={handleInputChange}
                                        placeholder='TIN'
                                    />
                                </Col>
                            </Form.Group>

                            {/* Insurance License Number input */}
                            <Form.Group as={Row} controlId="formInsuranceLicenseNumber">
                                <Form.Label column sm="6">Insurance License Number:</Form.Label>
                                <Col sm="12">
                                    <Form.Control
                                        type='text'
                                        name='insurance_license_number'
                                        value={editedUser.insurance_license_number}
                                        onChange={handleInputChange}
                                        placeholder='Insurance License Number'
                                    />
                                </Col>
                            </Form.Group>

                            {/* Logo input */}
                            <Form.Group as={Row} controlId="formLogo">
                                <Form.Label column sm="6">Logo:</Form.Label>
                                <Col sm="12">
                                    <Form.Control
                                        type='text'
                                        name='logo'
                                        value={editedUser.logo}
                                        onChange={handleInputChange}
                                        placeholder='Logo URL'
                                    />
                                </Col>
                            </Form.Group>

                            {/* Display password strength */}
                            <div>
                                <div className='password-strength'>
                                    Password Strength: {passwordStrength}
                                </div>

                                {/* Display password error if any */}
                                {passwordError && (
                                    <div className='password-error'>
                                        {passwordError}
                                    </div>
                                )}
                            </div>

                            {/* User save button */}
                            <div className='user-save-button mb-5'>
                                <Button variant="primary" type="submit" disabled={isLoading}>
                                    Save
                                </Button>
                            </div>

                        </Form>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default UserEdit;
