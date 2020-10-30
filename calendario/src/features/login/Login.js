import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { error_map, user_map, login } from './loginSlice';
import { Button, Form, Jumbotron } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

function validaLogin(email, password) {
    if (email === '' || password === '') {
        return (toast.error('Error! Login fields are empty', { position: toast.POSITION.BOTTOM_RIGHT}))
    }
}

function Login() {
    //const user = useSelector(user_map);
    //const error = useSelector(error_map);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();


    return (
        <div>
            <h1 className="title">Calendar i/o</h1>
            <Jumbotron style={{ backgroundColor: "#775577"}}>
                <Form>
                    <Form.Group controlId="formEmail">
                        <Form.Label style={{ color: "#FFFFFF"}}>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(ev) => setEmail(ev.target.value)}/>
                        <Form.Text style={{ color: "#FFFFFF"}}>
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label style={{ color: "#FFFFFF"}}>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(ev) => setPassword(ev.target.value)}/>
                    </Form.Group>
                    <Button variant="outline-primary" size="lg" onClick={() => {if(!validaLogin(email,password)) {dispatch(login(email, password));}}}>
                        Login
                    </Button>
                </Form>
            </Jumbotron>
            <p className="label">Don't have an account? Create one!</p>
            <Button variant="danger">
                Register
            </Button>
        </div>
    );
}

export default Login;