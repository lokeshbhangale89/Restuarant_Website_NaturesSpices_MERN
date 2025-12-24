import "./FoodItems.css";
import { Link } from 'react-router-dom';
import FoodCard from "../../components/FoodItemCard/FoodCard";
import { useEffect, useState } from "react";
// import fooditems from "../../data/foo9ditems_data";
import { getCookie } from "../../cookie";
import jwt_decode from 'jwt-decode'
import axios from 'axios';

const FoodItems = () => {

  const [fooditems, setFooditems] = useState([]);

  const onAddToCart = async (product, quantity) => {
    const accessToken = getCookie("access_token");

    if(accessToken){
      try {
        const decoded = jwt_decode(accessToken);
        // console.log(decoded._id)
        var userid = decoded._id;

        const response = await axios.post(
          "http://localhost:4000/api/carts/addtocart",
          {
            userID: userid,
            product: product,
            quantity: quantity,
            accessToken: accessToken
          },
        );

        alert(response.data.message)
      } catch (error) {
        console.error(error);
      }
    }
    else{
      alert("Please login to add items in cart")
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/products/getallproducts');
        setFooditems(response.data.products);
        
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container fooditems mb-5">
      <div className="d-flex justify-content-center align-items-center mb-4">
        <Link to='/cart' className="btn btn-dark">Go to Cart</Link>
      </div>

      <h2 className="text-center mb-3">Popular Food</h2>
      <h2 className="text-center mb-4 text-secondary">Our Special Dishes</h2>
      <div className="row row-cols-1 row-cols-md-4 g-4 text-center">
        {fooditems.map((fooditem) => (
          <FoodCard
            key={fooditem.id}
            fooditem={fooditem}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  )
}

export default FoodItems
