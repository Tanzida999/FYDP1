import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PatternFormat } from 'react-number-format';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';

const UserCreate = () => {
    const [user, setUser] = useState({
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
    const navigate = useNavigate();

    const [passwordStrength, setPasswordStrength] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: name === 'phone' ? value.replace(/\D/g, '') : value });
    };

    const apiUrl = 'http://localhost:3001/users';

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const response = await axios.post(apiUrl, user);
            alert('User created successfully.');
            setUser({
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
            setIsLoading(false);
        } catch (error) {
            console.error('Error creating user:', error);
            if (error.response && error.response.status === 400) {
                alert('User with the same email already exists. Please provide a unique email.');
            } else {
                alert('Failed to create user. Please try again.');
            }
            setIsLoading(false);
        }
    };

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

        return 'Weak';
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setUser((prevUser) => ({
            ...prevUser,
            password: newPassword,
        }));

        const strength = validatePassword(newPassword);
        setPasswordStrength(strength);

        if (strength === 'Weak') {
            setPasswordError('Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
        } else {
            setPasswordError('');
        }
    };

    return (
        <Container fluid>
            <div style={{ display: 'flex' }}>
                {/* User creation form */}
                <div style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                    <div className='card p-3'>
                        <div className='d-flex justify-content-between m-2'>
                                <h2 className="header-emp-list">User Account Create</h2>
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
                                        required
                                        value={user.email}
                                        onChange={handleInputChange}
                                        placeholder='Email'
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
                                        required
                                        value={user.password}
                                        onChange={handlePasswordChange}
                                        placeholder='Password'
                                    />
                                </Col>
                            </Form.Group>

                            {/* Display password strength */}
                            <div className='passwordC-strength'>
                                Password Strength: {passwordStrength}
                            </div>

                            {/* Display password error if any */}
                            {passwordError && (
                                <div className='password-error'>
                                    {passwordError}
                                </div>
                            )}

                            {/* Role selection */}
                            <Form.Group as={Row} controlId="formRole">
                                <Form.Label column sm="6">Role:</Form.Label>
                                <Col sm="12">
                                    <Form.Control
                                        as="select"
                                        name='role'
                                        value={user.role}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Role</option>
                                        <option value="admin">Admin</option>
                                        <option value="patient">Patient</option>
                                        <option value="hospital">Hospital</option>
                                        <option value="insurance">Insurance</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>

                            {/* Company Name input */}
                            <Form.Group as={Row} controlId="formCompanyName">
                                <Form.Label column sm="6">Company Name:</Form.Label>
                                <Col sm="12">
                                    <Form.Control
                                        type='text'
                                        name='company_name'
                                        value={user.company_name}
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
                                        value={user.name}
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
                                        value={user.address}
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
                                        value={user.phone}
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
                                        value={user.website}
                                        onChange={handleInputChange}
                                        placeholder='Website'
                                    />
                                </Col>
                            </Form.Group>

                            {/* Medical Service Type input */}
                            <Form.Group as={Row} controlId="formMedicalServiceType">
                                <Form.Label column sm="6">Medical Service Type:</Form.Label>
                                <Col sm="12">
                                    <Form.Control
                                        type='text'
                                        name='medical_service_type'
                                        value={user.medical_service_type}
                                        onChange={handleInputChange}
                                        placeholder='Medical Service Type'
                                    />
                                </Col>
                            </Form.Group>

                            {/* Registration Number input */}
                            <Form.Group as={Row} controlId="formRegistrationNumber">
                                <Form.Label column sm="6">Registration Number:</Form.Label>
                                <Col sm="12">
                                    <Form.Control
                                        type='text'
                                        name='registration_number'
                                        value={user.registration_number}
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
                                        value={user.tin}
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
                                        value={user.insurance_license_number}
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
                                        value={user.logo}
                                        onChange={handleInputChange}
                                        placeholder='Logo URL'
                                    />
                                </Col>
                            </Form.Group>

                            {/* User creation button */}
                            <div className='user-button mb-5' onClick={handleSubmit}>
                                <Button variant="primary" type="submit" disabled={isLoading}>
                                    Add User
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default UserCreate;
