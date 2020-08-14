import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { MDBBtn, MDBCard, MDBContainer, MDBRow,MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import data from './csvjson.json'
import Navbar from './Navbar';
import Footer from './Footer';

  
  export default function MediaCard() {
    const [allData, setAllData] = useState()
    const [search, setSearch] = useState()
    const [categories,setDataTanisq] = useState()
    let ids = JSON.parse(window.localStorage.getItem("wishIds"))

    console.log(data)
    console.log(ids)

    useEffect(() => {
        setAllData(data)
        const uniqueCategory = data.filter(a => a.category !== "").map(b => b.category)
        const uniqueCat = [...new Set(uniqueCategory)]
        setDataTanisq(uniqueCat)
    }, [])
    const handleChange = (e) => {
       setSearch(e)
       setAllData(data.filter( a=> a.category === e.value ))
    }
    console.log(categories)
    console.log(search)
  
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
      if (ids) {
          let finalIds = [...ids, id]
          let uniqueIds = [...new Set(finalIds)]
          window.localStorage.setItem("wishIds", JSON.stringify(uniqueIds))
      }
      else {
          arr.push(id)
          window.localStorage.setItem("wishIds", JSON.stringify(arr))
      }
  }
    return (
    <div>
      <Navbar />
      <MDBContainer style={{marginTop:"20px"}}>
        <MDBRow>
          <MDBCol size="4">
          <Select
            placeholder='Category'
            value={search || ''}
            id='Category'
            options={
                categories ? categories.map(item => ({value:item,label: item})) : null
            }
            onChange={handleChange}
        />        
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    { allData ?
              allData.map(item => {
                  if (item.avlble == 1){
                    return (
                      <div style={{margin:"10px", float:"left"}}>
                    <MDBCol style={{maxWidth: "25rem", maxHeight:"23rem", marginBottom:250}}>
                    <MDBCard>
                        <MDBCardImage className="img-fluid" src={item.image}
                        waves />
                        <MDBCardBody>
                        <MDBCardTitle style={{fontSize:"15px"}}>Name : {item.name}</MDBCardTitle>
                        <MDBCardText>category : {item.category}</MDBCardText>
                        <MDBCardText  style={{fontSize:"12px"}}>description : {item.description}</MDBCardText>
                        <MDBBtn color="green" onClick={() => handleCart(item._id)}>Add</MDBBtn>
                        <MDBBtn color="blue" onClick={() => handleWishlist(item._id)}>Add to Wishlist</MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                    </MDBCol>
                    </div>
                    )
                  }
              }) : null
          }
      </div>
    );
  }
//   # data = {
//     #     "id": assign_obj[i].id,
//     #     "item": [
//     #         {
//     #             "id": assign_obj[i].kit.id,
//     #             "item_name": assign_obj[i].kit.kit_name,
//     #             # "item_description": assign_obj[i].kit.item.item_description,
//     #             # "sku_code": assign_obj[i].kit.item.sku_code,
//     #             # "barcode": assign_obj[i].kit.item.barcode,
//     #             # "sac_code": assign_obj[i].kit.item.sac_code,
//     #             # "is_language_subject_textbook": assign_obj[i].kit.item.is_language_subject_textbook,
//     #             # "is_uniform_item": assign_obj[i].kit.item.is_uniform_item,
//     #             # "is_delivery_item": assign_obj[i].kit.item.is_delivery_item,
//     #             # "can_be_sold_alone_to_all": assign_obj[i].kit.item.can_be_sold_alone_to_all,
//     #             # "item_compulsory": assign_obj[i].kit.item.item_compulsory,
//     #             # "gender": assign_obj[i].kit.item.gender,
//     #             # "upload_image": assign_obj[i].kit.item.upload_image,
//     #             # "sale_price": assign_obj[i].kit.item.sale_price,
//     #             # "tax_code": assign_obj[i].kit.item.tax_code,
//     #             # "is_price_inclusive_of_gst": assign_obj[i].kit.item.is_price_inclusive_of_gst,
//     #             # "final_price_after_gst": assign_obj[i].kit.item.final_price_after_gst,
//     #             # "academic_year": assign_obj[i].kit.item.academic_year,
//     #             # "branch": assign_obj[i].kit.item.branch,
//     #             # "store_sub_category": assign_obj[i].kit.item.store_sub_category,
//     #             # "store_item_category": assign_obj[i].kit.item.store_item_category,
//     #             # "unit_of_measurement": assign_obj[i].kit.item.unit_of_measurement,
//     #             # "color": assign_obj[i].kit.item.color
//     #         }
//     #     ],
//     #     "academic_year": assign_obj[i].academic_year.id,
//     #     "grade": assign_obj[i].grade.id,
//     #     "student": assign_obj[i].student.id,
//     #     "kit": assign_obj[i].kit.id,
//     #     "branch": assign_obj[i].branch.id
//     # }
//     return Response({"id": assign_obj[i].id})