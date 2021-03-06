import React, { useState, useEffect } from 'react'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import data from '../component/csvjson.json'
import Navbar from './Navbar';
// import Footer from './Footer'

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
            {wishListData.length > 0 ?
                wishListData.map(item => {
                    if (item.avlble === 1) {
                        return (
                            <div style={{ margin: "15px", float: "left" }}>
                                <MDBCol style={{ maxWidth: "23rem", maxHeight: "25rem", marginBottom: 230 }}>
                                    <MDBCard>
                                        <MDBCardImage className="img-fluid" src={item.image}
                                            waves />
                                        <MDBCardBody>
                                            <MDBCardTitle style={{ fontSize: "15px" }}>Name : {item.name}</MDBCardTitle>
                                            <MDBCardText>category : {item.category}</MDBCardText>
                                            <MDBCardText style={{ fontSize: "12px" }}>description : {item.description}</MDBCardText>
                                            <MDBBtn color="green" style={{marginLeft:"20%"}} onClick={() => handleCart(item._id)}>Add To Cart</MDBBtn>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                            </div>
                        )
                    }
                    else{
                        return(
                            null
                        )
                    }
                }) : 
                <h1 style={{textAlign:"center", marginTop:"100px"}}> No Items Added to WishList </h1>
            }
        </div>
    )
}

