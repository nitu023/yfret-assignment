import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse } from "mdbreact";

export default function Navbar() {
      const [isOpen,setisOpen] = useState()
      let ids = JSON.parse(window.localStorage.getItem("wishIds"))
      let ids1 = JSON.parse(window.localStorage.getItem("cartIds"))
  

   const  toggleCollapse = () => {
    setisOpen(!this.state.isOpen)
  }
    return (
      <MDBNavbar color="blue" dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text h3">E-Commerce</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
          <MDBNavbarNav left style={{marginLeft:"10px", marginTop:"6px"}}>
            <Link to="/" className="white-text h5">Home</Link>
          </MDBNavbarNav>
          <MDBNavbarNav right>
          <Link to='/wishlist' className="white-text h5"><i class="fa fa-heart" aria-hidden="true" style={{color:"red"}}></i><span class="badge">{ids.length}</span></Link>
          </MDBNavbarNav>
          <MDBNavbarNav right style={{marginRight:"60px"}}>
            <Link to='/cart' className="white-text h5"><i class="fa fa-shopping-cart" ></i><span class="badge">{ids1.length}</span></Link>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
}
