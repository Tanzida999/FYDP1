import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-2 fixed-bottom">
      <Container>
        <Row>
          <Col md={6}>
            <p>© All Rights Reserved</p>
          </Col>
          <Col md={6} className="text-md-end">
            <p>Contact:uiu.ac.bd</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
