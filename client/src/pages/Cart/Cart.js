// import { Link } from 'react-router-dom';
import CartItem from '../../components/CartItem/CartItem';
// import { useEffect } from 'react';
import { getCookie } from '../../cookie';
import jwt_decode from 'jwt-decode'
import { useEffect, useState } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState([]);
  const [cartempty, setCartempty] = useState(false);

  const accessToken = getCookie('access_token');
  const decoded = jwt_decode(accessToken);
  const userID = decoded._id;

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (accessToken) {
          const response = await axios.get(`http://localhost:4000/api/carts/getcartitems`, {
            params: { _id: userID, accessToken: accessToken }
          })
          if (response.data.cart && response.data.total) {
            setCartItems(response.data.cart);
            setCartTotal(response.data.total)
          }
          else {
            setCartempty(true)
          }
        }
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, []);

  const onRemoveFromCart = async (productId) => {
    try {
      if (!accessToken) {
        return alert('Please log in to remove product from cart');
      }

      const response = await axios.delete(`http://localhost:4000/api/carts/removeproductfromcart`, {
        params: { _id: userID, accessToken: accessToken, productId: productId }
      });

      alert(response.data.message);

      const cartResponse = await axios.get(`http://localhost:4000/api/carts/getcartitems`, {
        params: { _id: userID, accessToken: accessToken }
      });
      setCartItems(cartResponse.data.cart);
      setCartTotal(cartResponse.data.total);
    } catch (error) {
      alert(error);
    }
  };

  const [name, setName] = useState('')
  const [contactno, setContact] = useState('')
  const [address, setAddress] = useState('')

  const onToken = async (token) => {
    // console.log(token);
    if (!name || !contactno || !address) {
      alert("Please fill all the required fields");
    }
    else if (!cartItems) {
      alert("Add an item to proceed for checkout")
    }

    else {
      try {

        await axios.post('http://localhost:4000/api/orders/createorders', { userID, name, contactno, address, cartItems, cartTotal, accessToken });
        // alert('Sign up successful');
        // navigate('/login')
        // console.log("returned from post request")

        await axios.delete(`http://localhost:4000/api/carts/removeallfromcart`, {
          params: { _id: userID, accessToken: accessToken }
        });

        const cartResponse = await axios.get(`http://localhost:4000/api/carts/getcartitems`, {
          params: { _id: userID, accessToken: accessToken }
        });

        alert('Your order has been placed successfully')
        setCartItems(cartResponse.data.cart);
        setCartTotal(cartResponse.data.total);

        setName("");
        setContact("");
        setAddress("");

        navigate('/fooditems')
      } catch (error) {
        alert(`Failed to create an order: ${error.message}`);
      }
    }
    // fetch('/save-stripe-token', {
    //   method: 'POST',
    //   body: JSON.stringify(token),
    //   }).then(response => {
    //     response.json().then(data => {
    //       alert(`We are in business, ${data.email}`);
    //     });
    //   });
  }

  return (
    <div className="container my-5 pt-5">
      <div className="row pt-5">
        <div className="col-12 col-md-8 pt-3">
          {cartempty === true ? (
            <div className="text-center">Your cart is empty</div>
          ) : (
            cartItems.map((item) => (
              <CartItem
                key={item._id}
                fooditem={item}
                onRemoveFromCart={onRemoveFromCart}
              />
            ))
          )}

        </div>
        <div className="col-12 col-md-4 ">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">Cart Summary</h5>
              <div className='card-body container'>
                <form>
                  <div className="form-group m-3">
                    <label htmlFor="user">Name</label>
                    <input type="text" className="form-control mt-2" id="user" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="form-group m-3">
                    <label htmlFor="contactno">Contact No</label>
                    <input type="tel" className="form-control mt-2" id="contactno" placeholder="Enter Contact no" value={contactno} onChange={(e) => setContact(e.target.value)} />
                  </div>
                  <div className="form-group m-3">
                    <label htmlFor="address">Address</label>
                    <input type="text" className="form-control mt-2" id="address" placeholder="Enter Delivery Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                  </div>
                </form>
              </div>
              <h6 className="card-subtitle mb-2 text-muted text-center">
                Total: Rs. {cartTotal}
              </h6>
              {/* <Link to="/checkout" className="btn btn-success btn-lg btn-block">
                Proceed to checkout
              </Link> */}
              <div className='text-center'>
                <StripeCheckout
                  // key={math.random()}
                  name='Your Order'
                  amount={cartTotal*100}
                  currency="INR"
                  token={onToken}
                  stripeKey=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
