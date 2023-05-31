import React, { useEffect, useState } from 'react';

import './CheckoutPopUp.scss';
import StoreApiRequest from '../../../helper/shopware api/apiHelper';
import useUIStore from '../../../store/store';


export default function CheckoutPopUp() {

    const [cartData, setCartData] = useState([])
    const [paymentMethod, setPaymentMethod] = useState("credit-card");
    const [paymentConfirmed, setPaymentConfirmed] = useState(false);
    const userContextToken = useUIStore((state) => state.userContextToken);

    useEffect(()=>{
        StoreApiRequest.addToCart(userContextToken).then((res) =>{
            console.log(res.lineItems)
            setCartData(res.lineItems);
        }
          
        );
    },[])


    /* TODO: Implement Submit Function */
    function onCreditCartSubmit(e){}
    function onPayPalSubmit(){}
    function onClaranaSubmit(){}

    function onRemoveFromCart(id){
      console.log('---------------- ID -------------------')
      console.log(id)
      StoreApiRequest.removeFromCart(userContextToken, [id]).then((res)=> setCartData(res.lineItems));
    }





  return (
    <div className="checkout-popup">
      {!paymentConfirmed && (
        <div className="checkout">
          <div className="items">
            <h1>CheckOut</h1>
            <ul>
              {cartData.map((val) => (
                <li key={val.id}>
                
                  {val.label}
                
                <button onClick={()=>onRemoveFromCart(val.id)}>X</button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1>Payment Detail</h1>
            <form onSubmit={(e)=>onCreditCartSubmit()}>
              <label>
                Payment Method:
                <select onChange={(e) => setPaymentMethod(e.target.value)}>
                  <option value="credit-card" selected>
                    Credit Card
                  </option>
                  <option value="paypal">PayPal</option>
                  <option value="clarana">Clarana</option>
                </select>
                <br />
                {paymentMethod == "credit-card" && (
                  <label htmlFor="cardHolder">
                    CardHodler
                    <input type="text" id="cardHolder" disabled={true} />
                  </label>
                )}
                {paymentMethod == "paypal" && (
                  <a
                    onClick={onPayPalSubmit}
                    href={null}
                    style={{ cursor: "pointer" }}
                  >
                    PayPal{" "}
                  </a>
                )}
                {paymentMethod == "clarana" && (
                  <a
                    onClick={onClaranaSubmit}
                    href={null}
                    style={{ cursor: "pointer" }}
                  >
                    Clarana
                  </a>
                )}
              </label>
            </form>
          </div>
        </div>
      )}

      {paymentConfirmed && (
        <div>
          <h1>Thank you for your Order</h1>
        </div>
      )}
    </div>
  );
}
