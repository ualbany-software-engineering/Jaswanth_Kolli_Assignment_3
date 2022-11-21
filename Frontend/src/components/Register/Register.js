import axios from 'axios';
import React from 'react';
import { Container, FloatingLabel, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css'
const Register = () => {
    const navigate = useNavigate()
    const handleCreateUser = async(e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const desc = e.target.desc.value;
        const img = e.target.img.value;
        const data = {
            name,
            email,
            password,
            desc,
            img
        }
        console.log(data)
        if(data){
            const response = await axios.post('http://ec2-3-86-255-74.compute-1.amazonaws.com:3005/api/v1/users/register', data)
            console.log(response)
            if(response?.data?.acknowledged){
                navigate('/')
            }
        }
    }
    return (
        <div>
            <Container fluid className='register-page'>
                <div className='register-style mx-auto p-4'>
                    <h3>Create a New Account</h3>
                    <form onSubmit={handleCreateUser}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Name"
                            className="mb-3">
                            <Form.Control type="name" name='name' placeholder="Your Name" required />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Email address"
                            className="mb-3">
                            <Form.Control type="email" name='email' placeholder="name@example.com" required />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Image"
                            className="mb-3">
                            <Form.Control type="file" name='img' placeholder="Your Image" required />
                        </FloatingLabel>
                        <FloatingLabel className='mb-3' controlId="floatingTextarea2" label="Description">
                            <Form.Control
                                name="desc"
                                as="textarea"
                                placeholder="Description"
                                style={{ height: '100px' }}
                                required
                            />
                        </FloatingLabel>

                        <FloatingLabel className="mb-3" controlId="floatingPassword" label="Password">
                            <Form.Control type="password" name="password" placeholder="Password" required />
                        </FloatingLabel>
                        <button className='w-100 mt-3 login-btn' type="submit">Register</button>
                    </form>
                    <p className='text-start m-2'>Already have an account?<Link className='text-primary ms-1 fw-bold' to='/login'>Login</Link> </p>

                </div>
            </Container>
        </div>
    );
};

export default Register;