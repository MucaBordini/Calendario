import React, { useState } from 'react';
import { /*useSelector,*/ useDispatch } from 'react-redux';
import {/* error_map, user_map,*/ login, register} from './userSlice';
import { Button, Form, Jumbotron, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './user.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

function validaLogin(email, password) {
    if (email === '' || password === '') {
        return (toast.error('Error! Login fields are empty.', { position: toast.POSITION.BOTTOM_RIGHT}))
    }
}

function validaRegister(name, email, dateOfBirth, password) {
    const mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    
    if ( email === '' || password === '' || name === '' || dateOfBirth === '') {
        return (toast.error('Error! Fill all the fields to register.', { position: toast.POSITION.BOTTOM_RIGHT}))
    }

    if (!mailFormat.test(email)){
        return (toast.error('Error! Bad formatted e-mail.', { position: toast.POSITION.BOTTOM_RIGHT}))
    }
    if ( password.lenght < 6 ) {
        return (toast.error('Error! Password must have at least 6 digits.', { position: toast.POSITION.BOTTOM_RIGHT}))
    }
    
}

function Login() {
    const [LoadingReg, setLoadingReg] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const [toggleForm, setToggleForm] = useState(false);


    function handleToggleForm() {
        setEmail('');
        setPassword('');
        toggleForm ? setToggleForm(false) : setToggleForm(true);
    }

    return (
        <div>
            <h1 className="title">Calendar i/o</h1>
            <Jumbotron style={{ backgroundColor: "#775577"}}>
                <Form>
                    <Form.Group controlId="formEmail">
                        <Form.Label style={{ color: "#FFFFFF"}}>Email address</Form.Label>
                        {toggleForm ? 
                        <Form.Control type="email" placeholder="Enter email" onChange={(ev) => setEmail(ev.target.value)} disabled/>
                        :
                        <Form.Control type="email" placeholder="Enter email" onChange={(ev) => setEmail(ev.target.value)} />
                        }
                        <Form.Text style={{ color: "#FFFFFF"}}>
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label style={{ color: "#FFFFFF"}}>Password</Form.Label>
                        {toggleForm ? 
                        <Form.Control type="password" placeholder="Password" onChange={(ev) => setPassword(ev.target.value)} disabled/>
                        :
                        <Form.Control type="password" placeholder="Password" onChange={(ev) => setPassword(ev.target.value)}/>
                        }
                        
                    </Form.Group>
                    {
                        Loading ?
                            <Button variant="outline-primary" size="lg" disabled>
                                <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                />
                            </Button>
                        :
                            <Button variant="outline-primary" size="lg" onClick={() => {
                                    setLoading(true); 
                                    if(!validaLogin(email,password)) {
                                        dispatch(login(email, password));
                                        setTimeout(function() {
                                            setLoading(false);
                                        }, 700);
                                    } else {
                                        setLoading(false);
                                    }
                                }}>
                                Login
                            </Button>
                    }
                    
                </Form>
            </Jumbotron>
            <p className="label">Don't have an account? Create one!</p>
            <Button variant="danger" onClick={() => handleToggleForm()}>
                Register
            </Button>
            {toggleForm ? (
                <div className="registerContainer">
                    <Jumbotron style={{ backgroundColor: "#6b6b6b", marginTop: 50}}>
                        <Form>
                            <Form.Group controlId="formBasicName">
                                <Form.Label style={{ color: "#FFFFFF"}}>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter name" onChange={(ev) => setName(ev.target.value)}/>
                            </Form.Group>
                            <Form.Group controlId="formEmail">
                                <Form.Label style={{ color: "#FFFFFF"}}>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" onChange={(ev) => setEmail(ev.target.value)}/>
                                <Form.Text style={{ color: "#FFFFFF"}}>
                                We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formDate">
                                <Form.Label style={{ color: "#FFFFFF"}}>Date of birth</Form.Label>
                                <Form.Control type="date" placeholder="Enter date of birth" onChange={(ev) => setDateOfBirth(ev.target.value)}/>
                            </Form.Group>
                            <Form.Group controlId="formPassword">
                                <Form.Label style={{ color: "#FFFFFF"}}>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={(ev) => setPassword(ev.target.value)}/>
                            </Form.Group>
                            {
                                LoadingReg ?
                                    <Button style={{marginTop: 30}} variant="outline-light" size="lg" disabled>
                                        <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        />
                                    </Button>
                                :
                                    <Button style={{marginTop: 30}} variant="outline-light" size="lg" onClick={() => {
                                        setLoadingReg(true)
                                        if(!validaRegister(name, email, dateOfBirth, password)) {
                                            dispatch(register(name, email, dateOfBirth, password));
                                            setTimeout(function() {
                                                setLoadingReg(false);
                                            }, 700);
                                        } else {
                                            setLoadingReg(false)
                                        }
                                        }}>
                                        Submit
                                    </Button>
                            }
                            
                        </Form>
                    </Jumbotron>
                </div>
            ) 
            :
                null
            }
        </div>
    );
}

export default Login;