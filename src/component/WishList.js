import React, { useState, useEffect } from 'react'
import { MDBBtn, MDBCard, MDBContainer, MDBRow,MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import data from '../component/csvjson.json'
import Navbar from './Navbar';

export default function WishList() {

    const [wishListData, setWishListData] = useState([])

    useEffect(() => {
        let ids = JSON.parse(window.localStorage.getItem("wishIds"))
        let wishItems = []
        if (ids) {
            for (let i = 0; i < ids.length; i++) {
                console.log(ids[i]);
                let filterdItems = data.filter(a => a._id === ids[i])[0]
                wishItems.push(filterdItems)
            }
            setWishListData(wishItems)
        }

    }, [])

    const handleCart = (id) => {
        let arr = []
        let ids = JSON.parse(window.localStorage.getItem("cartIds"))
        if (ids) {
            let finalIds = [...ids, id]
            window.localStorage.setItem("cartIds", JSON.stringify(finalIds))
        }
        else {
            arr.push(id)
            window.localStorage.setItem("cartIds", JSON.stringify(arr))
        }
    }

    // console.log(wishListData)

    return (
        <div>
            <Navbar />
           { wishListData ?
              wishListData.map(item => {
                  if (item.avlble == 1){
                    return (
                      <div style={{margin:"15px", float:"left"}}>
                    <MDBCol style={{maxWidth: "23rem", maxHeight:"23rem", marginBottom:230}}>
                    <MDBCard>
                        <MDBCardImage className="img-fluid" src={item.image}
                        waves />
                        <MDBCardBody>
                        <MDBCardTitle style={{fontSize:"15px"}}>Name : {item.name}</MDBCardTitle>
                        <MDBCardText>category : {item.category}</MDBCardText>
                        <MDBCardText  style={{fontSize:"12px"}}>description : {item.description}</MDBCardText>
                        <MDBBtn color="green" onClick={() => handleCart(item._id)}>Add To Cart</MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                    </MDBCol>
                    </div>
                    )
                  }
              }) : null
          }
        </div>
    )
}

