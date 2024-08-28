import React, {useContext} from "react";
import CartContext from "../store/CartContext";
import Modal from "../UI/Modal";
import {currencyFormatter} from "../util/formatting";
import Input from "../UI/Input";
import Button from "../UI/Button";
import UserProgressContext from "../store/UserProgressContext";

function Checkout() {
  const cartContext = useContext(CartContext);
  const userProgressContext = useContext(UserProgressContext);
  function handleHideChart() {
    userProgressContext.hideCart();
  }
  function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const customerData = Object.fromEntries(fd.entries());
    fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order: {
          items: cartContext.items,
          customer: customerData,
        },
      }),
    });
  }
  const cartTotal = cartContext.items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);
  return (
    <Modal
      open={userProgressContext.progress === "checkout"}
      onClose={handleHideChart}
    >
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label={"Full Name"} id={"name"} type="text" />
        <Input label={"E-mail"} id={"email"} type="email" />
        <Input label={"Address"} id={"street"} type="text" />
        <div className="control-row">
          <Input label={"Postal-code"} id={"postal-code"} type="text" />
          <Input label={"City"} id={"city"} type="text" />
        </div>
        <p className="modal-actions">
          <Button type="button" textOnly onClick={handleHideChart}>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}

export default Checkout;
