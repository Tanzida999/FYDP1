import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-2 fixed-bottom">
      <Container>
        <Row>
          <Col md={6}>
            <p>© 2024 Maruf Ur Rahman.</p>
          </Col>
          <Col md={6} className="text-md-end">
            <p>Contact: mrahman193019@bscse.uiu.ac.bd</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
