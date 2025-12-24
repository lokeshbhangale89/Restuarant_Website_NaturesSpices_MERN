import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getCookie } from '../../cookie';
import jwt_decode from 'jwt-decode';

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const accessToken = getCookie('access_token');
  const decoded = jwt_decode(accessToken);
  const userID = decoded._id;
  // console.log(userID)  

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/orders/getordersbyuser', {
          params: { _id: userID, accessToken: accessToken }
        });
        setOrders(response.data.orders);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="container" style={{'marginTop': '100px', 'marginBottom':'50px'}}>
      <h1 className='text-center mb-5'>Order Items</h1>
      {orders.length === 0 ? (
        <p className='text-center'>No orders found.</p>
      ) : (
        <table className="table table-striped table-bordered text-center">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Contact No</th>
              <th>Address</th>
              <th>Products</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.name}</td>
                <td>{order.contactno}</td>
                <td>{order.address}</td>
                <td>
                  <ul className="list-group">
                    {order.products.map((product) => (
                      <li key={product._id} className="list-group-item">
                        <div className="d-flex justify-content-between">
                          <span>{product.name}</span>
                          <span>${product.price}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </td>
                <td>${order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrdersList;
