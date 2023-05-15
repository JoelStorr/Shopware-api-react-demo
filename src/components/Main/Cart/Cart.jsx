import React, { useEffect } from 'react';

import './Cart.scss'

export default function Cart(props) {


    useEffect(()=>{
        /* TODO: Get Cart Data on Mount */
    },[])


  return (
    <>
    <div className='cart-bg' onClick={()=>props.setCartShown(prev=>!prev)}></div>
    <div className='cart'>
        <h1>Cart</h1>
        <button onClick={()=>props.setCartShown(prev=>!prev)} >Close</button>
    </div>

    </>
  )
}
