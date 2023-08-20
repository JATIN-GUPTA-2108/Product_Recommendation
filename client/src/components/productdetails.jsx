/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { useState } from "react";
import { ShopContext } from "./shopcontext";
import { PRODUCTS, PRODUCTS1 } from "./products";
import axios from "axios";
import "./productdetails.css";

const ProductDetails = () => {
  const updateProduct = (type, id) => {
    console.log(id);

    let updatedData = {
      Pid: id,
      type: type,
      rating: rating
    };

    axios
      .put("http://localhost:8000/updateProducts", updatedData)
      .then((response) => {
        console.log(response);
        // setData(updatedData); // Update local state if update on server succeeds
      })
      .catch((error) => {
        console.error(error);
      });

    const date = new    Date();
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

  const {
    selectedProduct,
    closeProductDetails,
    addToCart,
    cartItems,
    removeToCart,
    updateCartItemCount,
  } = useContext(ShopContext);

  // Set selectedProduct to 0
  const productId = selectedProduct || 0;

  const product =
    PRODUCTS.find((p) => p.id === productId) ||
    PRODUCTS1.find((p) => p.id === productId);

  if (!product) {
    return null;
  }
  const cartItemAmount = cartItems[product.id];

  const [rating, setrating] = useState(0);
  const [like, setlike] = useState(true);
  const [dislike, setdislike] = useState(true);

  // const Rating = (event) => {
  //   let val=event.target.value
  //   setrating(val);
  // };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-lg-6">
          <div className="card p-5 m-auto">
            <img
              src={product.image}
              alt=""
              className="card-img-top img-fluid p-2"
            />
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card p-3 m-auto">
            <div className="card-body">
              <h5 className="card-title">{product.brand}</h5>
              <h3 className="card-text">{product.name}</h3>
              <p className="card-text">
                <span className="text-danger fs-4 me-2">{product.price}$</span>
                <strike>{product.price * 2}$</strike>
              </p>
              <p className="card-text">{product.description}</p>
              <p className="card-text mb-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />{" "}
                Quibusdam tempore unde aperiam, consectetur harum a eum error,{" "}
                <br /> libero nemo quisquam ex assumenda corrupti rerum aut quod
                et sint facere reprehenderit?
              </p>

              <div className="d-flex align-items-center mb-3 col-6">
                <button
                  className="btn btn-outline-secondary me-2"
                  onClick={() => addToCart(product.id)}
                >
                  +
                </button>
                <input
                  className="form-control text-center"
                  type="number"
                  value={cartItems[product.id]}
                  onChange={(e) =>
                    updateCartItemCount(Number(e.target.value), product.id)
                  }
                />
                <button
                  className="btn btn-outline-secondary ms-2"
                  onClick={() => removeToCart(product.id)}
                >
                  -
                </button>

                <div className="rating mx-5 my-2 prod-rating" >
                  <label for="customRange2" class="form-label">
                    Product Rating
                  </label>
                  {rating}
                  <input
                    type="range"
                    class="form-range"
                    min="0"
                    max="5"
                    id="customRange2"
                    onChange={(e) => setrating(e.target.value)}
                  />
                </div>
                <button onClick={() => {
                  updateProduct(6, product.id);
                }}
                > Submit Rating</button>
              </div>

              <div className="d-flex mx-auto">
                {like == true ? (
                  <>
                    <button
                      type="button"
                      class="btn btn-success like"
                      onClick={() => {
                        updateProduct(2, product.id);
                        setlike(false);
                      }}
                    >
                      Like
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      class="btn btn-success like disabled"
                      onClick={() => {
                        updateProduct(2, product.id);
                      }}
                    >
                      Like
                    </button>
                  </>
                )}

                {/* <button
                  type="button"
                  class="btn btn-success like"
                  onClick={() => {
                    updateProduct(1, product.id);
                  }}
                >
                  Like
                </button>
                 */}

                {dislike == true ? (
                  <>
                    <button
                      type="button"
                      class="btn btn-danger dislike"
                      onClick={() => {
                        updateProduct(-2, product.id);
                        setdislike(false);
                      }}
                    >
                      Dislike
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      class="btn btn-danger dislike disabled"
                      onClick={() => {
                        updateProduct(-2, product.id);
                      }}
                    >
                      Dislike
                    </button>
                  </>
                )}



                {/* <button
                  type="button"
                  class="btn btn-danger dislike"
                  onClick={() => {
                    updateProduct(2, product.id);
                  }}
                >
                  Dislike
                </button> */}
                <button
                  onClick={() => {
                    addToCart(product.id);
                    // console.log("najf")
                    updateProduct(3, product.id);
                    event.target.classList.toggle("red");
                  }}
                  id="button-link"
                  className="myButton cartadd"
                >
                  Add To Cart
                  {cartItemAmount > 0 && ` (${cartItemAmount})`}
                </button>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="d-flex justify-content-center flex-column align-items-center">
              <h2 className="text-center mb-2">More products of the same</h2>
              <p className="mb-2">
                We have more products, visit the shop to get amazing deals from
                us!!
              </p>
            </div>
            <div className="d-none d-md-block">
              <div className="row mb-3">
                <div className="col-6 col-md-4 col-lg-8 mx-auto">
                  <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
                    {PRODUCTS.slice(3, 7).map((product) => (
                      <div key={product.id} className="col">
                        <div className="card h-100">
                          <img
                            src={product.image}
                            className="card-img-top"
                            alt="..."
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-6 col-md-4 col-lg-8 mx-auto">
                  <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
                    {PRODUCTS1.slice(2, 6).map((product) => (
                      <div key={product.id} className="col">
                        <div className="card h-100">
                          <img
                            src={product.image}
                            className="card-img-top"
                            alt="..."
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;