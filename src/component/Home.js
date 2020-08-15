import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { MDBBtn, MDBCard, MDBContainer, MDBRow, MDBCardBody, MDBPagination, MDBCardImage, MDBCardTitle, MDBPageItem,  MDBCardText, MDBCol, MDBPageNav } from 'mdbreact';
import data from './csvjson.json'
import Navbar from './Navbar';
import Footer from './Footer'


export default function MediaCard() {
  const [allData, setAllData] = useState()
  const [search, setSearch] = useState()
  const [categories, setCategories] = useState()
  const [pageNumber, setPageNumber] = useState(1)
  const [totalPageNumber, setTotalPageNumber] = useState(null)
  const [avbleData, setAvblData] = useState()
  const [isPage, setIspage] = useState(false)

  useEffect(() => {
    setAvblData(data.filter((i) => i.avlble === 1))
    // setAllData(data)
    const uniqueCategory = data.filter(a => a.category !== "").map(b => b.category)
    const uniqueCat = ["all", ...new Set(uniqueCategory)]
    setTotalPageNumber(Math.ceil((data.filter((i) => i.avlble === 1).length)/15))
    setCategories(uniqueCat)
  }, [])
console.log(totalPageNumber)
  useEffect(()=> {
    setIspage(false)
     let initial = Number(pageNumber-1) * 15
     let final = Number(pageNumber)*15
     setAllData(avbleData ? avbleData.slice(initial, final) : null)
     console.log(initial,final)
  },[pageNumber,avbleData])

console.log(allData)
  const handleChange = (e) => {
    setSearch(e)
    let initial = Number(pageNumber-1) * 15
    let final = Number(pageNumber)*15
    if(e.value === "all"){
      setIspage(false)
      setAllData(avbleData ? avbleData.slice(initial, final) : null)
    }
    else{
      setIspage(true)
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

  const handlePagination = (page) => {
  setPageNumber(page)
  }
  return (
    <div>
      <Navbar />
      <div style={{ marginLeft: "950px" }}>
        <MDBContainer size="12" style={{ marginTop: "20px" }}>
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
      <div style={{ marginLeft: "20px" }}>
        {allData ?
          allData.map(item => {
            if (item.avlble === 1) {
              return (
                <div style={{ margin: "10px", float: "left", marginTop: "60px" }}>
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
      <div style={{marginTop:"1500px"}}>
        {
          !isPage ? 
          <MDBRow>
          <MDBCol>
            <MDBPagination circle>
            <MDBPageItem>
                {
                  pageNumber <= totalPageNumber && pageNumber >= totalPageNumber-2 ?
                  <MDBPageNav className="page-link" disabled >
                  First
                </MDBPageNav> : 
                 <MDBPageNav className="page-link" onClick={() => handlePagination(1)} >
                 First
               </MDBPageNav>
                }
            
              </MDBPageItem>
              <MDBPageItem>
                {
                     pageNumber <= 1 ?
                     <MDBPageNav className="page-link" aria-label="Previous" disabled>
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                   </MDBPageNav>
                   :
                   <MDBPageNav className="page-link" aria-label="Previous" onClick={() => handlePagination(pageNumber-1)}>
                    <span aria-hidden="true" >&laquo;</span>
                    <span className="sr-only" >Previous</span>
                  </MDBPageNav>
                }     
              </MDBPageItem>
              <MDBPageItem active>
                <MDBPageNav className="page-link" onClick={() => handlePagination(pageNumber)}>
                  {pageNumber} <span className="sr-only">(current)</span>
                </MDBPageNav>
              </MDBPageItem>
              <MDBPageItem >
              {
                pageNumber <= totalPageNumber -1 ? 
    
                <MDBPageNav className="page-link" onClick={() => handlePagination(pageNumber+1)}>
                  {pageNumber+1} <span className="sr-only">(current)</span>
                </MDBPageNav> :
                null
              }
             
              </MDBPageItem>
              <MDBPageItem >
                {
                  pageNumber <= totalPageNumber -2 ?
                  <MDBPageNav className="page-link" onClick={() => handlePagination(pageNumber+2)}>
                  {pageNumber+2} <span className="sr-only">(current)</span>
                </MDBPageNav> : null
    
                }
                
              </MDBPageItem>
              <MDBPageItem>
                {
                  pageNumber >= totalPageNumber ? 
                  <MDBPageNav className="page-link"  disabled>
                  &raquo;
                </MDBPageNav> :
                 <MDBPageNav className="page-link"  onClick={() => handlePagination(pageNumber +1)}>
                 &raquo;
               </MDBPageNav>
                }
              </MDBPageItem>
              <MDBPageItem>
                {
                  pageNumber <= totalPageNumber && pageNumber >= totalPageNumber-2 ?
                  <MDBPageNav className="page-link" disabled >
                  Last
                </MDBPageNav> : 
                 <MDBPageNav className="page-link" onClick={() => handlePagination(totalPageNumber-2)} >
                 Last
               </MDBPageNav>
                }
            
              </MDBPageItem>
            </MDBPagination>
          </MDBCol>
        </MDBRow> : null

        }
    </div>
    {
      !isPage ? 
      <div style={{marginTop:"100px"}}>
      <Footer />
    </div> : null
    }
   
    </div>
  );
}