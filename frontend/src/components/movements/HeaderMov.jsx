import React from 'react'
import {useHistory} from 'react-router-dom'
import { Button, Dropdown,Card } from 'react-bootstrap'

export default function HeaderMov(props) {

    const location=useHistory();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('username')
        const redirect = () => {return location.go('/')}
        setTimeout((redirect), 1800)    }


    const styleBalance = ()=>{
      return {
          background:props.balance > 0 ? '#1dc45e' : '#ea4d57'
      }}

    return (

        <div className="d-flex justify-content-between col-lg-7 col-11 my-2 align-items-center">
            {/* Balance */}
            <Card className='col-5 col-lg-4 text-center' style={styleBalance()}>
                <Card.Body>
                    <Card.Subtitle className="mb-2 fw-bolder font-monospace">TOTAL BALANCE</Card.Subtitle>
                    <Card.Text className='fs-5 fw-bolder  border-top border-secondary border-5'>
                        ${props.balance}
                  </Card.Text>
                </Card.Body>
            </Card>

            {/* Dropdown User */}
            <Dropdown >
                <Dropdown.Toggle variant="primary" className='text-white' size="lg">
                    {localStorage.getItem('username')}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item className='d-flex justify-content-center'>
                        <Button variant='danger' onClick={handleLogout}>LOGOUT</Button>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}
