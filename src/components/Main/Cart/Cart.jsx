import React, { useEffect, useState } from 'react';

import './Cart.scss'
import StoreApiRequest from '../../../helper/shopware api/apiHelper';
import useUIStore from '../../../store/store';

import Login from '../../Header/login/Login';
import Register from '../../Header/register/Register';

export default function Cart(props) {

    const [cartData, setCartData] = useState([]);

    let userContextToken = useUIStore((state) => state.userContextToken);

    useEffect(()=>{
        /* TODO: Get Cart Data on Mount */

      StoreApiRequest.addToCart(userContextToken).then(res=>setCartData(res.lineItems));

    },[])


    function onGoToCheckout(){
      props.setCartShown((prev) => !prev);
      props.setCheckoutShown((prev)=>!prev);
      /* TODO: Write Checkout Logic */
    }

    function onRemove(id){
      /* TODO: Send API Request to reomove Item form Cart */
    }


  return (
    <>
      <div
        className="cart-bg"
        onClick={() => props.setCartShown((prev) => !prev)}
      ></div>
      <div className="cart">
        <h1>Cart</h1>
        {cartData.length != 0 && (
          <ul>
            {cartData.map((val) => (
              <li ke={val.id}>
                <p>{val.label}</p>
                <button onClick={() => onRemove(val.id)}>X</button>
              </li>
            ))}
          </ul>
        )}

        {props.userIsLoggedIn ? (
          <>
            <button onClick={onGoToCheckout}>Check out</button>
            <button onClick={() => props.setCartShown((prev) => !prev)}>
              Close
            </button>
          </>
        ) : (
          <div onClick={() => props.setCartShown((prev) => !prev)}>
            <Login />
            <Register />
          </div>
        )}
      </div>
    </>
  );
}
