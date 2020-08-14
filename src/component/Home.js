import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { MDBBtn, MDBCard, MDBContainer, MDBRow, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import data from './csvjson.json'
import Navbar from './Navbar';


export default function MediaCard() {
  const [allData, setAllData] = useState()
  const [search, setSearch] = useState()
  const [categories, setCategories] = useState()

  useEffect(() => {
    setAllData(data)
    const uniqueCategory = data.filter(a => a.category !== "").map(b => b.category)
    const uniqueCat = ["all", ...new Set(uniqueCategory)]
    setCategories(uniqueCat)
  }, [])

console.log(categories)
  const handleChange = (e) => {
    setSearch(e)
    if(e.value === "all"){
      setAllData(data)
    }
    else{
      setAllData(data.filter(a => a.category === e.value))
    }
  }
   console.log(search)
  // Add to Cart
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

  //   Added To WishList 
  const handleWishlist = (id) => {
    console.log(id)
    let arr = []
    let ids = JSON.parse(window.localStorage.getItem("wishIds"))
    if(ids) {
      for(var i =0; i < ids.length; i++){
        if (ids[i] === id){
          alert("Already added to WishLish")
        }
        else{
            let finalIds = [...ids, id]
            let uniqueIds = [...new Set(finalIds)]
            window.localStorage.setItem("wishIds", JSON.stringify(uniqueIds))
          }
      }
    }
      else {
        arr.push(id)
        window.localStorage.setItem("wishIds", JSON.stringify(arr))
      }
  }


  return (
    <div>
      <Navbar />
      <div style={{ marginLeft: "950px" }}>
        <MDBContainer style={{ marginTop: "20px" }}>
          <MDBRow>
            <MDBCol size="10">
              <Select
                placeholder='Category'
                value={search || ''}
                id='Category'
                options={
                  categories ? categories.map(item => ({ value: item, label: item })) : null
                }
                onChange={handleChange}
              />
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
      <div style={{ marginLeft: "80px" }}>
        {allData ?
          allData.map(item => {
            if (item.avlble === 1) {
              return (
                <div style={{ margin: "10px", float: "left", marginTop: "10px" }}>
                  <MDBCol style={{ maxWidth: "25rem", maxHeight: "23rem", marginBottom: 260 }}>
                    <MDBCard>
                      <MDBCardImage className="img-fluid" src={item.image}
                        waves />
                      <MDBCardBody>
                        <MDBCardTitle style={{ fontSize: "15px" }}>Name : {item.name}</MDBCardTitle>
                        <MDBCardText>category : {item.category}</MDBCardText>
                        <MDBCardText style={{ fontSize: "12px" }}>description : {item.description}</MDBCardText>
                        <MDBBtn color="green" onClick={() => handleCart(item._id)}>Buy</MDBBtn>
                        <MDBBtn color="blue" onClick={() => handleWishlist(item._id)}>Add to Wishlist</MDBBtn>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </div>
              )
            }
            else {
              return (
                null
              )
            }
          }) 
          : null
        }
      </div>
    </div>
  );
}