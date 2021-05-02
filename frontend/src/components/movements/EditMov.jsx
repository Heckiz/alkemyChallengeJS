import React, { useState } from 'react'
import { Modal, Button, Form, InputGroup, FormControl } from 'react-bootstrap'
import { useDispatch } from "react-redux";
import { editMovement} from '../../redux/movementsDuck'



export default function CreateMov(props) {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [data, setData] = useState({

    concept: props.concept,
    amount: props.amount
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
    dispatch(editMovement(props.id, data))
    window.location.replace("/") 
  }
  return (
    <>
      <Button variant="warning" className='border border-dark border-2'  onClick={handleShow}>
        <i className="bi bi-pencil-fill"></i>
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header closeButton className='d-flex justify-content-center gap-5'>
          <Modal.Title className='text-decoration-underline'> <i class="bi bi-pencil"></i>  EDIT MOVEMENT</Modal.Title>
        </Modal.Header>
        <h5 className='text-muted text-center fst-italic fw-bolder'>[{props.type}]</h5>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>

            <div className="row justify-content-center">
              {/* CONCEPT */}
              <Form.Group className='col-10 col-lg-7 pb-3' >
                <Form.Control type="text" name='concept' placeholder={props.concept} onChange={handleInputChange} />
              </Form.Group>

              {/* AMOUNT */}
              <div className="col-10 col-lg-7 pb-3">
                <InputGroup >
                  <InputGroup.Prepend>
                    <InputGroup.Text>$</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl type='number' name='amount' placeholder={props.amount} min="1" max="1000000" onChange={handleInputChange} />
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
    </>
  );
}

