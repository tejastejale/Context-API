import React, {useContext} from "react";
import Modal from "../UI/Modal";
import CartContext from "../store/CartContext";
import {currencyFormatter} from "../util/formatting";
import Button from "../UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import Cartitems from "./Cartitems";

function Cart() {
  const cartContext = useContext(CartContext);
  const userProgressContext = useContext(UserProgressContext);

  const cartTotal = cartContext.items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);
  function handleHideChart() {
    userProgressContext.hideCart();
  }
  function handleCheckout() {
    userProgressContext.showCheckout();
  }
  return (
    <Modal
      className="cart"
      open={userProgressContext.progress === "cart"}
      onClose={userProgressContext.progress === "cart" ? handleHideChart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartContext.items.map((item) => (
          //   <li key={item.id}>
          //     {item.name} - {item.quantity}
          //   </li>
          <Cartitems
            key={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            onIn={() => cartContext.addItem(item)}
            onDe={() => cartContext.removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleHideChart}>
          Close
        </Button>
        {cartContext.items.length > 0 ? (
          <Button onClick={handleCheckout}>Go to Checkout</Button>
        ) : null}
      </p>
    </Modal>
  );
}

export default Cart;
