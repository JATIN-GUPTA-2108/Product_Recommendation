import React from "react";
import "./category.css";
import { useState, useEffect } from "react";
import Prod from "../components/prod";
import { PRODUCTS } from "../components/products"
import axios from "axios";
function Category() {
  const [recommendedProducts, setRecommendedProducts ] = useState([]);
  const [toBeDisplayed, setToBeDisplayed] = useState([]);

  useEffect( () => {
    console.log("hell")
    axios.post("http://localhost:5000/api/recommendation_system", { param: localStorage.getItem("Uid") }).then((response) => {
      // console.log(response.data);
      // JSON.stringify(response)
      console.log(response.data.result)
      setRecommendedProducts(prevArray => [...prevArray,2 ]);

      // setRecommendedProducts( ...recommendedProducts,...response.data.result)
      // console.log(recommendedProducts)
      const filteredList = PRODUCTS.filter(dict => response.data.result.includes(dict.id));
      console.log(filteredList)

      setToBeDisplayed(filteredList)
      console.log(toBeDisplayed)

    });
  }, [])
  // calling python function
  
  ///////
  
  
  
  
  const [Men, setMen] = useState("false");
  const [Women, setWomen] = useState("false");
  const [Kids, setKids] = useState("false");
  const [Mouse, setMouse] = useState("false");
  const [Chargers, setChargers] = useState("false");
  const [Makeup, setMakeup] = useState("false");
  const [Fitness, setFitness] = useState("false");
  const [Keyboards, setKeyboards] = useState("false");
  const [Combs, setCombs] = useState("false");
  const [Refrigerators, setRefrigerators] = useState("false");
  const [Laptops, setLaptops] = useState("false");
  const [Airconditioners, setAirconditioners] = useState("false");
  const [Perfumes, setPerfumes] = useState("false");
  const [Smartphones, setSmartphones] = useState("false");

  // const set = new Set();
  const [state, setState] = useState(new Set("p"))


  // const [Men, setMen] = useState(new Set());
  // const [Women, setWomen] = useState(new Set());


  const ChangeMen = (event) => {
    const Type = event.target.value;
    let val = !Men;
    console.log(val);

    setMen(!Men);

    if (Men) {
      
      // set.add(Type);
      // setMen(prev => new Set(prev.add(event)))
      setState(prev => new Set(prev.add(Type)))
      console.log(state);
      // const filteredList = toBeDisplayed.filter(dict => toBeDisplayed.Category.includes(state));

      // console.log(set);
    } else {
      console.log("false");
      if (state.has(Type)) {
        // set.delete(Type);
        setState(prev => {
          prev.delete(Type);
          return new Set(prev);
        })

      }
      console.log(state);
    }
    console.log(state);
  };

  const ChangeWomen = (event) => {
    const Type = event.target.value;
    let val = !Women;
    console.log(val);

    setWomen(!Women);

    if (Women) {
      // set.add(Type);
      setState(prev => new Set(prev.add(Type)))

      console.log(state);
    } else {
      console.log("false");
      if (state.has(Type)) {
        setState(prev => {
          prev.delete(Type);
          return new Set(prev);
        })
      }
      console.log(state);
    }
    console.log(state);
  };

  const ChangeKids = (event) => {
    const Type = event.target.value;
    let val = !Kids;
    console.log(val);

    setKids(!Kids);

    if (Kids) {
      setState(prev => new Set(prev.add(Type)))
      console.log(state);
    } else {
      console.log("false");
      if (state.has(Type)) {
        setState(prev => {
          prev.delete(Type);
          return new Set(prev);
        })
      }
      console.log(state);
    }
    console.log(state);
  };

  const ChangeMouse = (event) => {
    const Type = event.target.value;
    let val = !Mouse;
    console.log(val);

    setMouse(!Mouse);

    if (Mouse) {
      setState(prev => new Set(prev.add(Type)))
      console.log(state);
    } else {
      console.log("false");
      if (state.has(Type)) {
        setState(prev => {
          prev.delete(Type);
          return new Set(prev);
        })
      }
      console.log(state);
    }
    console.log(state);
  };

  const ChangeChargers = (event) => {
    const Type = event.target.value;
    let val = !Chargers;
    console.log(val);

    setChargers(!Chargers);

    if (Chargers) {
      setState(prev => new Set(prev.add(Type)))
      console.log(state);
    } else {
      console.log("false");
      if (state.has(Type)) {
        setState(prev => {
          prev.delete(Type);
          return new Set(prev);
        })
      }
      console.log(state);
    }
    console.log(state);
  };

  const ChangeMakeup = (event) => {
    const Type = event.target.value;
    let val = !Makeup;
    console.log(val);

    setMakeup(!Makeup);

    if (Makeup) {
      setState(prev => new Set(prev.add(Type)))
      console.log(state);
    } else {
      console.log("false");
      if (state.has(Type)) {
        setState(prev => {
          prev.delete(Type);
          return new Set(prev);
        })
      }
      console.log(state);
    }
    console.log(state);
  };

  const ChangeFitness = (event) => {
    const Type = event.target.value;
    let val = !Fitness;
    console.log(val);

    setFitness(!Fitness);

    if (Fitness) {
      setState(prev => new Set(prev.add(Type)))
      console.log(state);
    } else {
      console.log("false");
      if (state.has(Type)) {
        setState(prev => {
          prev.delete(Type);
          return new Set(prev);
        })
      }
      console.log(state);
    }
    console.log(state);
  };

  const ChangeKeyboards = (event) => {
    const Type = event.target.value;
    let val = !Keyboards;
    console.log(val);

    setKeyboards(!Keyboards);

    if (Keyboards) {
      setState(prev => new Set(prev.add(Type)))
      console.log(state);
    } else {
      console.log("false");
      if (state.has(Type)) {
        setState(prev => {
          prev.delete(Type);
          return new Set(prev);
        })
      }
      console.log(state);
    }
    console.log(state);
  };

  const ChangeCombs = (event) => {
    const Type = event.target.value;
    let val = !Combs;
    console.log(val);

    setCombs(!Combs);

    if (Combs) {
      setState(prev => new Set(prev.add(Type)))
      console.log(state);
    } else {
      console.log("false");
      if (state.has(Type)) {
        setState(prev => {
          prev.delete(Type);
          return new Set(prev);
        })
      }
      console.log(state);
    }
    console.log(state);
  };

  const ChangeRefrigerators = (event) => {
    const Type = event.target.value;
    let val = !Refrigerators;
    console.log(val);

    setRefrigerators(!Refrigerators);

    if (Refrigerators) {
      setState(prev => new Set(prev.add(Type)))
      console.log(state);
    } else {
      console.log("false");
      if (state.has(Type)) {
        setState(prev => {
          prev.delete(Type);
          return new Set(prev);
        })
      }
      console.log(state);
    }
    console.log(state);
  };

  const ChangeLaptops = (event) => {
    const Type = event.target.value;
    let val = !Laptops;
    console.log(val);

    setLaptops(!Laptops);

    if (Laptops) {
      setState(prev => new Set(prev.add(Type)))
      console.log(state);
    } else {
      console.log("false");
      if (state.has(Type)) {
        setState(prev => {
          prev.delete(Type);
          return new Set(prev);
        })
      }
      console.log(state);
    }
    console.log(state);
  };

  const ChangeAirconditioners = (event) => {
    const Type = event.target.value;
    let val = !Airconditioners;
    console.log(val);

    setAirconditioners(!Airconditioners);

    if (Airconditioners) {
      setState(prev => new Set(prev.add(Type)))
      console.log(state);
    } else {
      console.log("false");
      if (state.has(Type)) {
        setState(prev => {
          prev.delete(Type);
          return new Set(prev);
        })
      }
      console.log(state);
    }
    console.log(state);
  };

  const ChangePerfumes = (event) => {
    const Type = event.target.value;
    let val = !Perfumes;
    console.log(val);

    setPerfumes(!Perfumes);

    if (Perfumes) {
      setState(prev => new Set(prev.add(Type)))
      console.log(state);
    } else {
      console.log("false");
      if (state.has(Type)) {
        setState(prev => {
          prev.delete(Type);
          return new Set(prev);
        })
      }
      console.log(state);
    }
    console.log(state);
  };

  const ChangeSmartphones = (event) => {
    const Type = event.target.value;
    let val = !Smartphones;
    console.log(val);
    setSmartphones(!Smartphones);

    if (Smartphones) {
      setState(prev => new Set(prev.add(Type)))
      console.log(state);
    } else {
      console.log("false");
      if (state.has(Type)) {
        setState(prev => {
          prev.delete(Type);
          return new Set(prev);
        })
      }
      console.log(state);
    }
    console.log(state);
  };

  return (
    <>
      <div className="container main-body">
        <div className="left">
          <h2 className="mx-5 mt-4 category-col">Categories</h2>

          <div className="form-check mx-5 my-1.5">
            <input
              class="form-check-input"
              type="checkbox"
              value="men"
              id="flexCheckDefault"
              onChange={ChangeMen}
            />
            <label class="form-check-label" for="flexCheckDefault">
              Men
            </label>
          </div>

          <div class="form-check mx-5 my-1.5">
            <input
              class="form-check-input"
              type="checkbox"
              value="women"
              id="flexCheckDefault"
              onChange={ChangeWomen}
            />
            <label class="form-check-label" for="flexCheckDefault">
              Women
            </label>
          </div>

          <div class="form-check mx-5 my-1.5">
            <input
              class="form-check-input"
              type="checkbox"
              value="kids"
              id="flexCheckDefault"
              onChange={ChangeKids}
            />
            <label class="form-check-label" for="flexCheckDefault">
              Kids
            </label>
          </div>

          <div class="form-check mx-5 my-1.5">
            <input
              class="form-check-input"
              type="checkbox"
              value="mouse"
              id="flexCheckDefault"
              onChange={ChangeMouse}
            />
            <label class="form-check-label" for="flexCheckDefault">
              Mouse
            </label>
          </div>
          <div class="form-check mx-5 my-1.5">
            <input
              class="form-check-input"
              type="checkbox"
              value="smartphones"
              id="flexCheckDefault"
              onChange={ChangeSmartphones}
            />
            <label class="form-check-label" for="flexCheckDefault">
              Smartphones
            </label>
          </div>

          <div class="form-check mx-5 my-1.5">
            <input
              class="form-check-input"
              type="checkbox"
              value="chargers"
              id="flexCheckDefault"
              onChange={ChangeChargers}
            />
            <label class="form-check-label" for="flexCheckDefault">
              Chargers
            </label>
          </div>

          <div class="form-check mx-5 my-1.5">
            <input
              class="form-check-input"
              type="checkbox"
              value="makeup"
              id="flexCheckDefault"
              onChange={ChangeMakeup}
            />
            <label class="form-check-label" for="flexCheckDefault">
              Makeup
            </label>
          </div>

          <div class="form-check mx-5 my-1.5">
            <input
              class="form-check-input"
              type="checkbox"
              value="fitness"
              id="flexCheckDefault"
              onChange={ChangeFitness}
            />
            <label class="form-check-label" for="flexCheckDefault">
              Fitness
            </label>
          </div>

          <div class="form-check mx-5 my-1.5">
            <input
              class="form-check-input"
              type="checkbox"
              value="keyboards"
              id="flexCheckDefault"
              onChange={ChangeKeyboards}
            />
            <label class="form-check-label" for="flexCheckDefault">
              Keyboards
            </label>
          </div>

          <div class="form-check mx-5 my-1.5">
            <input
              class="form-check-input"
              type="checkbox"
              value="combs"
              id="flexCheckDefault"
              onChange={ChangeCombs}
            />
            <label class="form-check-label" for="flexCheckDefault">
              Combs
            </label>
          </div>

          <div class="form-check mx-5 my-1.5">
            <input
              class="form-check-input"
              type="checkbox"
              value="refrigerators"
              id="flexCheckDefault"
              onChange={ChangeRefrigerators}
            />
            <label class="form-check-label" for="flexCheckDefault">
              Refrigerators
            </label>
          </div>

          <div class="form-check mx-5 my-1.5">
            <input
              class="form-check-input"
              type="checkbox"
              value="laptops"
              id="flexCheckDefault"
              onChange={ChangeLaptops}
            />
            <label class="form-check-label" for="flexCheckDefault">
              Laptops
            </label>
          </div>

          <div class="form-check mx-5 my-1.5">
            <input
              class="form-check-input"
              type="checkbox"
              value="airConditoners"
              id="flexCheckDefault"
              onChange={ChangeAirconditioners}
            />
            <label class="form-check-label" for="flexCheckDefault">
              Air Conditoners
            </label>
          </div>

          <div class="form-check mx-5 my-1.5">
            <input
              class="form-check-input"
              type="checkbox"
              value="perfumes"
              id="flexCheckDefault"
              onChange={ChangePerfumes}
            />
            <label class="form-check-label" for="flexCheckDefault">
              Perfumes
            </label>
          </div>
          <br />
        </div>

        <div className="right">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            {console.log(toBeDisplayed)}
            {[...toBeDisplayed].map((product) => (
              <Prod key={product.id} data={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Category;
