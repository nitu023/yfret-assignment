import React, { useState, useEffect } from 'react'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import data from '../component/csvjson.json'
import Navbar from './Navbar';
// import Footer from './Footer'

export default function Cart() {

    const [cartData, setCartData] = useState([])
    const [itemCount, setItemCount] = useState([])

    useEffect(() => {
        let ids = JSON.parse(window.localStorage.getItem("cartIds"))
        let uniqueIds = [...new Set(ids)]
        let cartItems = []
        let countItems = []
        if(ids){
            for(let i = 0; i<uniqueIds.length;i++){
                console.log(uniqueIds[i]);
                let filterdItems = data.filter(a=>a._id === uniqueIds[i])
                cartItems.push(filterdItems[0])        
            }
            for(let i = 0; i<uniqueIds.length;i++){
                let count = 0
                for(let j = 0; j<ids.length;j++){             
                    if(uniqueIds[i] === ids[j]){
                        count += 1
                    }
                }
                countItems.push(count)
            }
            setCartData(cartItems)
            setItemCount(countItems)
        }     
    }, [])

    // console.log(wishListData)

    return (
        <div>
            <Navbar />
            {cartData && itemCount?
                cartData.map((item,index) => {
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
                                            <MDBBtn color="red" style={{marginLeft:"20%"}}>No. of Items: {itemCount[index]}</MDBBtn>
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
                }) : null
            }
        </div>
    )
}

