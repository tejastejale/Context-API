import React from "react";
import {currencyFormatter} from "../util/formatting";

function Cartitems({name, price, quantity, onIn, onDe}) {
  return (
    <li className="cart-item">
      <p>
        {name} - {quantity} x {currencyFormatter.format(price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={onDe}>-</button>
        <button>{quantity}</button>
        <button onClick={onIn}>+</button>
      </p>
    </li>
  );
}

export default Cartitems;
