import React, { useState } from 'react'
import { Modal, Button, Form, InputGroup, FormControl } from 'react-bootstrap'
import { useDispatch } from "react-redux";
import { createMovement } from '../../redux/movementsDuck'


export default function CreateMov() {

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    concept: '',
    type: '',
    amount: 0,
    user: localStorage.getItem('userId')
  })


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value

    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createMovement(data))
    window.location.replace("/") 
   }

  return (
    <div className='d-flex justify-content-center row  '>
      <Button className='col-6 col-lg-2 ' variant="primary" onClick={handleShow}>
        <i className="bi bi-plus-circle"></i> NEW MOVEMENT
        </Button>

      <Modal
        show={show}
        onHide={handleClose}
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header closeButton className='d-flex justify-content-center gap-5'>
          <Modal.Title className='text-decoration-underline'> <i className="bi bi-plus-circle"></i>  CREATE MOVEMENT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>

            <div className="row justify-content-center">
              {/* CONCEPT */}
              <Form.Group className='col-10 col-lg-7 pb-3' >
                <Form.Control type="text" name='concept' placeholder="Concept" onChange={handleInputChange} />
              </Form.Group>

              {/* TYPE */}
              <Form.Group className='col-10 col-lg-7 pb-3'>
                <Form.Control as="select" name='type' onChange={handleInputChange}>
                  <option value="0">Type</option>
                  <option value="ingress">Ingress</option>
                  <option value="egress">Egress</option>
                </Form.Control>
              </Form.Group>

              {/* AMOUNT */}
              <div className="col-10 col-lg-7 pb-3">
                <InputGroup >
                  <InputGroup.Prepend>
                    <InputGroup.Text>$</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl type='number' name='amount' placeholder="Amount" min="1" max="1000000" onChange={handleInputChange} />
                </InputGroup>
              </div>

            </div>

            <Modal.Footer className='justify-content-center'>
              <Button type='submit' variant="secondary" className="block">
                Submit
            </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>

      </Modal>
    </div>
  );
}

