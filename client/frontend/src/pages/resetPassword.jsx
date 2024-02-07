import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './resetPassword.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
    const { email: resetEmail } = useParams();
    const [email, setEmail] = useState(resetEmail ? decodeURIComponent(resetEmail) : '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState(''); // add this state
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setEmail(resetEmail ? decodeURIComponent(resetEmail) : '');
    }, [resetEmail]);

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

    const validateEmail = (email) => {
        const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        // validate the email and set the error message
        if (!validateEmail(newEmail)) {
            setEmailError('Invalid email address');
        } else {
            setEmailError('');
        }
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setConfirmPassword('');
        const strength = validatePassword(newPassword);
        setPasswordStrength(strength);

        if (strength === 'Weak') {
            setPasswordError('Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
        } else {
            setPasswordError('');
        }

        setPassword(newPassword);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Make a POST request to your backend to handle password reset
            const response = await axios.post('http://localhost:3001/reset-password', {
                email,
                password,
                confirmPassword,
            });

            console.log('Password reset successful:', response.data);
            alert('Password reset successful.');
            navigate('/login');
        } catch (error) {
            console.error('Password reset failed:', error);
            alert('Password reset failed.');
        }
    };


    return (
        <div style={{ display: 'flex' }}>
            <div className="reset-square">
                <div className="login-header">Reset Password</div>
                <form onSubmit={handleSubmit}>
                    <div className="form-login-reset">
                        <div className="form-field-reset">
                            <input
                                className="form-input-reset"
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                placeholder="Email:"
                                required
                            />
                            <span style={{ color: 'red' }}>{emailError}</span>
                        </div>
                        <div className="form-field-reset">
                            <input
                                className="form-input-reset"
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                placeholder="Password:"
                                required
                            />
                        </div>
                        <div className="form-field-reset">
                            <input
                                className="form-input-reset"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm Password:"
                                required
                            />
                        </div>
                        <div className="password-strength">Password Strength: {passwordStrength}</div>
                        <div className="password-error">{passwordError}</div>
                    </div>
                    <div className="reset-button" onClick={handleSubmit}>
                        <button className="submit" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
