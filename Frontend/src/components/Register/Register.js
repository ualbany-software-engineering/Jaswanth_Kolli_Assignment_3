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
        const pics = e.target.pics.value;
        const data = {
            name,
            email,
            password,
            desc,
            img
        }
        console.log(pics)
             if (pics.type === "image/jpeg" || pics.type === "image/png") {
               const data2 = new FormData();
               data2.append("file", pics);
                data2.append("upload_preset", "Profilemaker");
                data2.append("cloud_name", "dftfpxf4f");
                fetch("https://api.cloudinary.com/v1_1/dftfpxf4f/image/upload", {
                 method: "post",
                 body: data2,
               })
                  .then((res) => res.json())
                  .then((data2) => {
                    console.log(data2.url.toString());
                    console.log({...data,image2:data2.url.toString()})
                    
                    //console.log(pic);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
             } 
        // const postDetails = (pics) => {
            
        //    };
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
                            label="Full Name"
                            className="mb-3">
                            <Form.Control type="name" name='name' placeholder="Your Name" required />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Enter Your Email Id"
                            className="mb-3">
                            <Form.Control type="email" name='email' placeholder="name@example.com" required />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="formFileLg"
                            label="Profile Picture"
                            className="mb-3">
                            <Form.Control type="text" name='img'  placeholder="Your Image" required />
                        </FloatingLabel>
                        <FloatingLabel className='mb-3' controlId="floatingTextarea2" label="Enter Your Description">
                            <Form.Control
                                name="desc"
                                as="textarea"
                                placeholder="Your Description"
                                style={{ height: '100px' }}
                                required
                            />
                        </FloatingLabel>

                        <FloatingLabel className="mb-3" controlId="floatingPassword" label="Create a Password">
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