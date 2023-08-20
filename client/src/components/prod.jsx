/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useContext} from 'react'
import { ShopContext } from './shopcontext'
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Details from '../pages/details';
import './prod.css'
import product from './product.svg'

const prod = (props) => {
  const updateProduct = (type ,id ) => {
    console.log(id);
    let updatedData = {
      "Pid": id,
      "type":type
    }
    
    axios.put('http://localhost:8000/updateProducts', updatedData)
      .then(response => {
        console.log(response);
        // setData(updatedData); // Update local state if update on server succeeds
      })
      .catch(error => {
        console.error(error);
      });
    
    const date = new Date();
    if (type != 6 && type != 5) {
  
      let userlog = {
        "Uid": localStorage.getItem("Uid"),
        "Pid": id,
        "type": type,
        "time": date.getTime()
      }
      axios.put('http://localhost:8000/updateUserLogs', userlog)
      .then(response => {
        console.log(response);
        // setData(updatedData); // Update local state if update on server succeeds
      })
      .catch(error => {
        console.error(error);
      });
    };
  }

    const {id, name, price, image, brand} = props.data;
    const { addToCart, cartItems, viewProductDetails} = useContext(ShopContext);

    const cartItemAmount = cartItems[id];
  return <>
 <div className="col mb-5">
            <Link key={id}  className="card h-100 m-auto item-color">
        <img src={product} className="card-img-top img-fluid" alt="image" />
              <div className="card-body">
              <p className="card-text mb-2">{brand}</p>
                <h5>{name} </h5>
                <ReactStars
                    count={5}
                    edit={false}
                    value={4}
                    size={24}
                    activeColor="#EA9D5A"
                />
                <div className="mb-3">
                <p className="price mb-2"><span className="red">{price} </span>&nbsp;  <strike>{price * 2}$</strike></p>
            <Link to='/details' onClick={() => viewProductDetails(id)
            }>
              <p className="text-center"><button className='fs-4' id='clear-cart'
                onClick={() => updateProduct(1 , id)}
              >View Details</button></p>
                </Link>
                </div>
               <div className="d-flex justify-content-center">
               <button 
                  onClick={() => {
                    updateProduct(3 , id)
                    addToCart(id);
                event.target.classList.toggle("red");
                  }}
                  className="myButton"
                >
                  Add To Cart
                  {cartItemAmount > 0 && `(${cartItemAmount})`}
                </button>
               
              
               </div>
              </div>
            </Link>

            
        </div>
  </>
}

export default prod