import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

function Main() {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <div className="text-center">
            <h2 className="mb-4">Welcome to Blockchain Enabled Health Insurance System: Enhancing: Security, Trust and Efficiency</h2>
            {/* <p className="lead">
              My name is Maruf Ur Rahman. I am a dedicated Computer Science and Engineering (CSE) student at United International University (UIU).
            </p>
            <p className="lead">
              With a passion for coding and technology, I have contributed to the development of this website. I always strive for excellence in my work.
            </p>
            <p className="lead">
              I have a strong background in web development, and my skills in front-end and back-end technologies have played a significant role in creating an interactive and user-friendly experience on this platform.
            </p> */}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Main;
