import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Card, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Login() {
    const [data, setData] = useState({
        email: "",
        password: "",
    })
    const handleInputChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        (async function loginUser() {
            try {
                const res = await axios.post('api/users/signin', data);

                toast.success("Login successful! ", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000
                });
                console.log(res.data)
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('userId', res.data.id)
                localStorage.setItem('username', res.data.username)

                const redirect = () => { return window.location.replace("/");}
                setTimeout((redirect), 1800)

            } catch (error) {
                document.getElementById("formLogin").reset();

                toast.error('Invalid email or password.', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000
                });

                console.error(error);
            }
        })();
     


    }

    return (

        <div className='mt-3 row justify-content-center'>
            <ToastContainer className='mt-2' transition={Flip} />
            <Card className=" shadow-lg p-3 rounded col-lg-5">
                <Card.Header as='h5' className='shadow text-center pb-3'>LOGIN</Card.Header>
                <Card.Body>

                    <Form id='formLogin' onSubmit={handleSubmit} >

                        <div className="row justify-content-center">
                            {/* USERNAME */}
                            <Form.Group controlId="email" className='col-10 pb-3' >
                                <Form.Control type="email" placeholder="Email" name="email" onChange={handleInputChange} />
                            </Form.Group>

                            {/* PASSWORD */}
                            <Form.Group controlId="password" className='col-10 pb-3'>
                                <Form.Control type="password" placeholder="Password" name="password" onChange={handleInputChange} />
                            </Form.Group>
                        </div>

                        <div className="d-grid pt-4">
                            <Button variant="primary" type="submit" className='block'>
                                Submit
                            </Button>
                        </div>

                    </Form>
                </Card.Body>
                <Card.Footer className='text-center'>
                    <span className="fw-bolder card-link">do not have an account yet?
                         <Link to="/signup"> REGISTER NOW</Link>
                    </span>
                </Card.Footer>
            </Card>
        </div>

    )
}
