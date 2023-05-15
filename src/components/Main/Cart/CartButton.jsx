import React from "react";

import "./CartButton.scss";

export default function CartButton(props) {
  return (
    <div
      className="cart-btn"
      onClick={() => props.setCartShown((prev) => !prev)}
    >
      <h3>Cart</h3>
    </div>
  );
}
