import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getMovementsPagination,getMovementsPaginationNext,getMovementsPaginationBack,getMovementsData,deleteMovement } from '../../redux/movementsDuck'
import { format } from 'timeago.js'

import CreateMov from './CreateMov'
import EditMov from './EditMov'
import HeaderMov from './HeaderMov'

import { Form, Table, ProgressBar, Button, Alert, OverlayTrigger, Tooltip } from 'react-bootstrap';

const Movements = () => {

    
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => { 
            await dispatch(getMovementsPagination());
            await dispatch(getMovementsData());
         })();
    }, [])

    const movementsPagination = useSelector(state => state.movements.movementsPagination);
    const movementsData = useSelector(state => state.movements.movementsData);
    const page =useSelector(state => state.movements.page);

    // Calculations
    let porcentageIngress = 0;
    let porcentageEgress = 0;
    const amountIngress = movementsData.filter(mov => mov.type === 'ingress').map(mov => mov.amount).reduce((a, b) => a + b, 0);
    const amountEgress = movementsData.filter(mov => mov.type === 'egress').map(mov => mov.amount).reduce((a, b) => a + b, 0);
    const totalAmount = amountIngress + amountEgress;
     porcentageIngress = (amountIngress * 100 / totalAmount).toFixed(2)
     porcentageEgress = (amountEgress * 100 / totalAmount).toFixed(2)
    const balanceTotal = (amountIngress - amountEgress)

    return (
        <div>

            {
                movementsData.length === 0
                &&
                <div className='d-flex justify-content-center'>
                    <Alert variant="success" className='position-absolute' style={{ top: '40%' }}>
                        <Alert.Heading>Welcome to Wallance</Alert.Heading>
                        <p> start your balance sheet now</p>
                    </Alert>
                </div>
            }

            <div className='row justify-content-center'>

                <HeaderMov balance={balanceTotal} />
                <div className='row justify-content-center'>
                    {/* Movements Table */}
                    <div className=" col-lg-8 overflow-auto" style={{ height: '40vh' }}>

                        <Table striped bordered hover className='text-center' >
                            <thead>
                                <tr style={{ background: 'black', color: 'white' }}>
                                    <th>Cocept</th>
                                    <th>Amount </th>
                                    <th>Type</th>
                                    <th>#</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    movementsPagination.map((mov) => (
                                        <tr className='font-monospace fw-bolder' key={mov.id} style={{ background: mov.type === 'ingress' ? '#1dc45e' : '#ea4d57' }} key={mov._id}>
                                            <OverlayTrigger overlay={<Tooltip >{format(mov.date)}</Tooltip>}>
                                                <td>
                                                    <span>
                                                        {mov.concept}
                                                    </span>
                                                </td>
                                            </OverlayTrigger>

                                            <td>${mov.amount}</td>

                                            <td>{(mov.type).toUpperCase()}</td>

                                            <td className='d-flex gap-1 justify-content-center justify-content-lg-around'>
                                                <EditMov id={mov.id} concept={mov.concept} amount={mov.amount} type={mov.type} />
                                                <Button variant="danger" className='border border-dark border-2' onClick={async (e) => {
                                                    e.preventDefault();
                                                    dispatch(deleteMovement(mov.id));
                                                    window.location.replace('/');
                                                }}>
                                                <i className="bi bi-trash"></i>
                                                </Button>
                                            </td>
                                        </tr>))
                                }
                            </tbody>
                        </Table>

            {/* Pagination Nav*/}
            <div class="d-flex justify-content-between">

                {/* Back Page */}
                    { page>0 && 
                 <Button variant="dark" className='col-3 col-lg-1' onClick={async (e) => {
                                                    e.preventDefault();
                                                    dispatch(getMovementsPaginationBack());
                                                }}>
                    <span><i className="bi bi-arrow-left-square-fill"> prev</i></span>
                </Button> }

                      <span>
                          page {page +1}
                      </span>
                {/* Next Page */}
                <Button variant="dark" className='col-3 col-lg-1' onClick={async (e) => {
                                                    e.preventDefault();
                                                    dispatch(getMovementsPaginationNext());
                                                }}>
                    <span>next <i className="bi bi-arrow-right-square-fill"></i></span>
                </Button>

                 </div>

                 </div>
        
                    {/* Progress Bar */}
                    <div className="col-10 col-lg-8 mt-3">
                        {
                            <ProgressBar className='w-100 mb-1'>
                                <ProgressBar variant="success" now={porcentageIngress} key={1} />
                                <ProgressBar variant="danger" now={porcentageEgress} key={3} />
                            </ProgressBar>
                        }
                    </div>
                </div>

                <div className="row col-lg-6 w-100 justify-content-center">
                    {/* Total Ingress */}
                    <div className='col-6 col-lg-3 text-center'>
                        <Table striped bordered hover variant="success" >
                            <tbody>
                                <tr>
                                    <th colSpan="2">Total Ingress</th>
                                </tr>
                                <tr>
                                    <td>${amountIngress}</td>
                                    <td>%{porcentageIngress}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                    {/* Total Egress */}
                    <div className='col-6 col-lg-3 text-center'>
                        <Table striped bordered hover variant="danger">
                            <tbody>
                                <tr>
                                    <th colSpan="2">Total Egress</th>
                                </tr>
                                <tr>
                                    <td>${amountEgress}</td>
                                    <td>%{porcentageEgress}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>

                </div>
                <CreateMov/>
            </div>
        </div>
    );
}

export default Movements;
