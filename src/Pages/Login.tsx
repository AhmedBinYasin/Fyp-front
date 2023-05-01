import axios from 'axios';
import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import md5 from 'md5'

function Login({ setData }: { setData: (state: object) => void; }) {
    const [Input, setInput] = useState<{ UserName: string; Password: string; ReEnter: string; }>({ UserName: '', Password: '', ReEnter: '' })
    const [pageState, onChange] = useState('Login')
    const [Message, setMessage] = useState<string | undefined>()

    function changeToLogin() { onChange('Login'); setInput({ UserName: '', Password: '', ReEnter: '' }); setMessage(undefined) }
    function changeToSignup() { onChange('Signup'); setInput({ UserName: '', Password: '', ReEnter: '' }); setMessage(undefined) }
    async function onLogin() {
        try {
            let { UserName, Message, error } = (await axios.post('http://192.168.72.101:5000/api/auth/Login', { UserName: Input.UserName, Password: md5(Input.Password) })).data
            if (UserName) { setData(UserName) }
            else if (Message) { setMessage(Message) }
            else { console.log(error) }
        }
        catch (error) { console.log(error) }
    }
    async function onSignup() {
        if (Input.Password === Input.ReEnter) {
            try {
                let { UserName, Message, error } = (await axios.post('http://192.168.72.101:5000/api/auth/CreateUser', { UserName: Input.UserName, Password: md5(Input.Password) })).data
                if (UserName) { setData(UserName) }
                else if (Message) { setMessage(Message) }
                else { console.log(error) }
            }
            catch (error) { console.log(error) }
        }
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
                                                        <Form.Control type="text" value={Input.UserName} placeholder="Enter User Name" onChange={(event) => { setInput({ ...Input, UserName: event.target.value }) }} />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formBasicPassword" >
                                                        <Form.Label>Password</Form.Label>
                                                        <Form.Control type="password" value={Input.Password} placeholder="Password" onChange={(event) => { setInput({ ...Input, Password: event.target.value }) }} />
                                                    </Form.Group>
                                                    <div className="d-grid">
                                                        <Button variant="primary" onClick={onLogin} > Login </Button>
                                                        {Message && <p style={{ color: 'red', fontSize: 'smaller' }}>{Message}</p>}
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
                                                        <Form.Control type="text" value={Input.UserName} placeholder="Enter User Name" onChange={(event) => { setInput({ ...Input, UserName: event.target.value }) }} />
                                                        {Message && <p style={{ color: 'red', fontSize: 'smaller' }}>{Message}</p>}
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formBasicPassword" >
                                                        <Form.Label>Password</Form.Label>
                                                        <Form.Control type="password" value={Input.Password} placeholder="Password" onChange={(event) => { setInput({ ...Input, Password: event.target.value }) }} />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formBasicReEnterPassword" >
                                                        <Form.Label>Reenter Password</Form.Label>
                                                        <Form.Control type="password" value={Input.ReEnter} placeholder="Password" onChange={(event) => { setInput({ ...Input, ReEnter: event.target.value }) }} />
                                                        {Input.ReEnter !== Input.Password && <p style={{ color: 'red', fontSize: 'smaller' }}>Password did not matched</p>}
                                                    </Form.Group>
                                                    <div className="d-grid">
                                                        <Button variant="primary" onClick={onSignup} > Signup </Button>
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

