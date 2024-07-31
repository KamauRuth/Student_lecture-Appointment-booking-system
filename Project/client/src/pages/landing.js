import React from 'react';
import { Button, Card, Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import   '../index.css';

function Landing() {
    return (
       
            <div className="nav-bar">
                <Navbar  bg="dark" variant="dark" expand="lg">
                    <Container>
                        <Navbar.Brand href="/">Appointment Booking</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto">
                                <Nav.Link href="/">Home</Nav.Link>
                                <Nav.Link href="#features">Features</Nav.Link>
                                <Nav.Link href="#about">About</Nav.Link>
                                <Nav.Link href="#contact">Contact</Nav.Link>
                                {/* New Links for Login and Register */}
                                <Nav.Link href="/login">Login</Nav.Link>
                                <Nav.Link href="/register">Register</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <header className="hero-section">
                    <Container>
                        <Row className="justify-content-center">
                            <Col md={8} className="text-center">
                                <h1>Welcome to the Appointment Booking System</h1>
                                <p>Schedule appointments with lecturers effortlessly.</p>
                                <Button variant="primary" size="lg">Get Started</Button>
                            </Col>
                        </Row>
                    </Container>
                </header>

                <section className="features-section py-5">
                    <Container>
                        <Row>
                            <Col md={4}>
                                <Card className="mb-4">
                                    <Card.Body>
                                        <Card.Title>Easy Scheduling</Card.Title>
                                        <Card.Text>
                                            Book appointments with lecturers easily through our user-friendly interface.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={4}>
                                <Card className="mb-4">
                                    <Card.Body>
                                        <Card.Title>Automated Reminders</Card.Title>
                                        <Card.Text>
                                            Receive automated reminders for your upcoming appointments.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={4}>
                                <Card className="mb-4">
                                    <Card.Body>
                                        <Card.Title>Real-time Updates</Card.Title>
                                        <Card.Text>
                                            Get real-time updates on appointment statuses and lecturer availability.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </section>

                <section className="about-section py-5 bg-light">
                    <Container>
                        <Row className="justify-content-center">
                            <Col md={8} className="text-center">
                                <h2>About Us</h2>
                                <p>
                                    We are dedicated to simplifying the appointment booking process for students and lecturers. Our system ensures seamless scheduling and efficient time management.
                                </p>
                            </Col>
                        </Row>
                    </Container>
                </section>

                <footer className="footer py-4 bg-dark text-white">
                    <Container>
                        <Row>
                            <Col md={6}>
                                <p>&copy; 2024 Appointment Booking. All rights reserved.</p>
                            </Col>
                            <Col md={6} className="text-md-right">
                                <Nav>
                                    <Nav.Link href="#privacy" className="text-white">Privacy Policy</Nav.Link>
                                    <Nav.Link href="#terms" className="text-white">Terms of Service</Nav.Link>
                                </Nav>
                            </Col>
                        </Row>
                    </Container>
                </footer>
            </div>
      
    );
}

export default Landing;
