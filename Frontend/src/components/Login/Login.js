import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'
const Login = () => {
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('')
    const handleSignIn = async (e) =>{
        e.preventDefault()
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const data = {
            user:{
                email,
                password
            }
        }
        const response = await axios.post('http://ec2-3-86-255-74.compute-1.amazonaws.com:3005/api/v1/users', data)
        console.log(response)
        if(response?.data?.success){
            localStorage.setItem("token", response?.data?.token)
            localStorage.setItem("userEmail", response?.data?.result[0]?.email)
            setErrorMessage('')
            navigate('/my-profile')
        }else{
            setErrorMessage(response?.data?.message)
        }
    }
    return (
        <div className="login-style-div">
            <Container fluid>
                <div className="login-style">
                    <h3 className='text-center'>Login</h3>
                    <Form onSubmit={handleSignIn} className='w-75 mx-auto form-style'>
                        <Form.Floating className="mb-3">
                            <Form.Control
                               ref={emailRef}
                                id="floatingInputCustom"
                                type="email"
                                placeholder="name@example.com"
                                required
                            />
                            

                             <label htmlFor="floatingInputCustom">Email address</label>
 
                        {/* <div className="mb-3">
                        <label>Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                            />
                        </div> */}
                        </Form.Floating>
                        <Form.Floating>
                            <Form.Control
                                id="floatingPasswordCustom"
                                type="password"
                                ref={passwordRef}
                                placeholder="Password"
                                required
                            />
                            <label htmlFor="floatingPasswordCustom">Password</label>
                        </Form.Floating>
                        <p className='text-danger mb-0 pb-0'><small>{errorMessage && errorMessage}</small></p>
                        <Button className='login-btn mt-2' type="submit">
                            Login
                        </Button>
                        <p className='text-start mt-2 text-color'>Don't have an account? <Link className='link-style' to='/register'>Register Now</Link></p>
                    </Form>
                </div>
            </Container>

        </div>
    );
};

export default Login;