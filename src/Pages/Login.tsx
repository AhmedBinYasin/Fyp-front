import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

function Login({ setData }: { setData: (state: object) => void; }) {
    const [pageState, onChange] = useState('Login')
    function changeToLogin() {
        onChange('Login')
    }
    function changeToSignup() {
        onChange('Signup')
    }
    if (pageState === 'Login') {
        return (
            <>
                <div>
                    <Container>
                        <Row className="vh-100 d-flex justify-content-center align-items-center">
                            <Col md={8} lg={6} xs={12}>
                                <Card className="shadow">
                                    <Card.Body>
                                        <div className="mb-3 mt-md-4">
                                            <h2 className="fw-bold mb-2 text-uppercase ">Sound Sense</h2>
                                            <p className=" mb-5">Please enter your login and password!</p>
                                            <div className="mb-3">
                                                <Form>
                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label className="text-center"> User Name </Form.Label>
                                                        <Form.Control type="email" placeholder="Enter User Name" />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formBasicPassword" >
                                                        <Form.Label>Password</Form.Label>
                                                        <Form.Control type="password" placeholder="Password" />
                                                    </Form.Group>
                                                    <div className="d-grid">
                                                        <Button variant="primary" type="submit"> Login </Button>
                                                    </div>
                                                </Form>
                                                <div className="mt-3">
                                                    <p className="mb-0  text-center">
                                                        Don't have an account?{" "}
                                                        <div className="text-primary fw-bold" onClick={changeToSignup}> Sign Up </div>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </>
        )
    }
    else if (pageState === 'Signup') {
        return (
            <>
                <div>
                    <Container>
                        <Row className="vh-100 d-flex justify-content-center align-items-center">
                            <Col md={8} lg={6} xs={12}>
                                <Card className="shadow">
                                    <Card.Body>
                                        <div className="mb-3 mt-md-4">
                                            <h2 className="fw-bold mb-2 text-uppercase ">Sound Sense</h2>
                                            <p className=" mb-5">Please enter login User Name and password!</p>
                                            <div className="mb-3">
                                                <Form>
                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label className="text-center"> User Name </Form.Label>
                                                        <Form.Control type="email" placeholder="Enter User Name" />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formBasicPassword" >
                                                        <Form.Label>Password</Form.Label>
                                                        <Form.Control type="password" placeholder="Password" />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formBasicPassword" >
                                                        <Form.Label>Reenter Password</Form.Label>
                                                        <Form.Control type="password" placeholder="Password" />
                                                    </Form.Group>
                                                    <div className="d-grid">
                                                        <Button variant="primary" type="submit"> Login </Button>
                                                    </div>
                                                </Form>
                                                <div className="mt-3">
                                                    <p className="mb-0  text-center">
                                                        have an account?{" "}
                                                        <div className="text-primary fw-bold" onClick={changeToLogin}> Login </div>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </>
        )
    }
    else {
        return (<></>)
    }
}

export default Login
