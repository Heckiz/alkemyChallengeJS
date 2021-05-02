import React,{useState} from 'react';
import {Link} from 'react-router-dom'
import { Card} from 'react-bootstrap'
import Movements from '../components/movements/Movements'
const Home = () => {

    const [logged] = useState(localStorage.getItem('token'));

    return (
            <div>
                 {  logged ?  <Movements/> :
                  <div className='row d-flex justify-content-center'>
                
                    <h1 className='text-center px-5 py-3 py-lg-5 fw-bolder'>Your personal budget control now easier.</h1>
        
                     <Card className="text-center bg-success col-10 col-lg-7 py-4 py-lg-4 row">
        
                    <Card.Title className="text-center fs-2 fw-bolder font-monospace text-decoration-underline">
                        CONTROLS THE BALANCE
                    </Card.Title>
        
                    <Card.Body className="text-cemter fs-3 fst-italic">
                        Manage income and expenses with intuitive tracking. See the balance between the operations performed and draw your conclusions.
                    </Card.Body>
        
        
                    <Link to="/signin" className="fw-bolder bg-primary btn btn-primary border-info col-lg-5 mx-auto mb-2">
                        GET STARTED AT WALLANCE
                    </Link>  <span className="fw-bolder card-link ">do not have an account yet? 
            <Link to="/signup" className='text-white'> REGISTER NOW</Link>
            </span>
                </Card>
            </div> 
            }
            </div>
    );
}

export default Home;
