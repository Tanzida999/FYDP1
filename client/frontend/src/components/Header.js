import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const routes = [
  { path: '/', name: 'Home' },
];

const Header = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { logout } = useLogout();

    const [User, setUser] = useState({ role: ' ' });

    const fetchUserProfile = async (email) => {
        try {
            const response = await axios.get(`http://localhost:3001/user/${encodeURIComponent(email)}/profile`);
            return response.data;
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    useEffect(() => {
        if (user) {
            const fetchExistingData = async () => {
                try {
                    const existingUserData = await fetchUserProfile(user.email);
                    // setUser(existingUserData);
                    setUser(existingUserData || { role: ' ' });
                } catch (error) {
                    console.error('Error fetching user profile:', error);
                }
            };

            fetchExistingData();
        }
    }, [user]);

    const handleLogout = () => {
        logout();
        setUser({ role: ' ' });
        navigate('/');
    };
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fluid>
      <Container fluid>
        <Navbar.Brand as={Link} to="/">Health Insurance System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            {!user && (
              <>
                <Nav.Link as={Link} to="/signin">Sign In</Nav.Link>
                <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
              </>
            )}
            {/* {user && (
            )} */}
            {User.role == "admin" && (
              <>
              <Nav.Link as={Link} to={`/user/${encodeURIComponent(user.email)}/update`}>Update Profile</Nav.Link>
              <Nav.Link as={Link} to="/users">User List</Nav.Link>
              <Button variant="link" onClick={handleLogout}>Logout</Button>
              </>
            )}
            {(User.role === "patient" || User.role === "insurance") && (
              <>
              <Nav.Link as={Link} to={`/user/${encodeURIComponent(user.email)}/update`}>Update Profile</Nav.Link>
              <Button variant="link" onClick={handleLogout}>Logout</Button>
              </>
            )}
            {/* {User.role == "Customer" && (
            )} */}
            {user && (
              <>
              <Nav.Link as={Link} to={`/user/${encodeURIComponent(user.email)}/update`}>Update Profile</Nav.Link>
              <Nav.Link as={Link} to="/users">User List</Nav.Link>
              <Button variant="link" onClick={handleLogout}>Logout</Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
