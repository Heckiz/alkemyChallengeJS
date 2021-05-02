import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import { Nav, Navbar} from 'react-bootstrap'

export default class Navigation extends Component {



    render() {
        return (
            <Navbar bg="dark" expand="lg"  variant="dark" className="px-5 py-4 row">
            
            <NavLink className="fst-italic fw-bolder text-decoration-none col-6 text-center" to="/">

            <Navbar.Brand className='brand' >
               <span className="w text-warning border-bottom border-5 border-danger">W</span>
               <span className="ance border-bottom border-5 border-success ">allance</span> 
             </Navbar.Brand>

            </NavLink>
           
            <Navbar.Toggle id='buttonCollapse' aria-controls="basic-navbar-nav" className='col-4'/>

            <Navbar.Collapse id="basic-navbar-nav" >

              <Nav className="pt-4 d-block font-monospace row" >

                {/* Home */}
                <NavLink className='navlink' exact activeClassName="selected" to='/'>
                  HOME
                </NavLink>
                {/* aboutDev */}
                {/* <NavLink className='navlink' exact activeClassName="selected" to='/about'>
                 ABOUT
                 <span className="fst-italic">.dev</span>
                </NavLink> */}

              </Nav>
              
            </Navbar.Collapse>
          </Navbar>
        )
    }
}
