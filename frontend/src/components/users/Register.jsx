import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';

import { Card, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Register() {
    let location = useHistory();
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const handleInputChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })

    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (data.password !== data.confirmPassword) {
            toast.error("Passwords do not match!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000
            });
            document.getElementById("formRegister").reset();
        }else{
            (async function createUser() {
                try {
                    const response = await axios.post('api/users/signup', data);
                    toast.success("Register complete! ", {
                         position: toast.POSITION.TOP_CENTER,
                   autoClose: 3000
                     });
                    const redirect = () => { return location.push('signin') }
                   setTimeout((redirect), 1800)
                } catch (error) {
    
                    toast.error('Email already exists', {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 3000
                    });
    
                    console.error(error);
                }
            })()
            
    
        }

  
    }

    return (
        <div className='mt-3 row justify-content-center'>
            <ToastContainer className='mt-2' transition={Flip} />
            <Card className=" shadow-lg p-3 rounded col-lg-5">
                <Card.Header as='h5' className='shadow text-center pb-3'>SIGNUP</Card.Header>
                <Card.Body>

                    <Form id='formRegister' onSubmit={handleSubmit}>

                        <div className="row justify-content-center">
                            {/* USERNAME */}
                            <Form.Group controlId="username" className='col-10 pb-3' >
                                <Form.Control type="text" placeholder="Username" name='username' onChange={handleInputChange} />
                            </Form.Group>

                            {/* EMAIL */}
                            <Form.Group controlId="email" className='col-10 pb-3' >
                                <Form.Control type="email" placeholder="Email" name='email' onChange={handleInputChange} />
                            </Form.Group>

                            {/* PASSWORD */}
                            <Form.Group controlId="password" className='col-10 pb-3'>
                                <Form.Control type="password" placeholder="Password" name='password' onChange={handleInputChange} />
                            </Form.Group>

                            {/* CONFIRM PASSWORD */}
                            <Form.Group controlId="confirmPassword" className='col-10 pb-3'>
                                <Form.Control type="password" placeholder="Confirm password" name='confirmPassword' onChange={handleInputChange} />
                            </Form.Group>

                        </div>

                        <div className="d-grid pt-2">
                            <Button variant="primary" type="submit" className='block'>
                                Submit
                        </Button>
                        </div>

                    </Form>
                </Card.Body>
                <Card.Footer className='text-center'>
                    <span className="fw-bolder card-link">you already have an account?
                 <Link to="/signin"> LOGIN NOW</Link>
                    </span>
                </Card.Footer>
            </Card>
        </div>
    )
}

