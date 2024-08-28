import {useContext} from "react";
import Button from "../UI/Button";
import logo from "../assets/logo.jpg";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";

export default function Head() {
  const context = useContext(CartContext);
  const progresscontext = useContext(UserProgressContext);
  const totalitems = context.items.reduce((totalitemnumber, item) => {
    return totalitemnumber + item.quantity;
  }, 0);
  function handleShowCart() {
    progresscontext.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <h1>ReactFood</h1>
        <img src={logo} alt="logo" />
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>
          Cart({totalitems})
        </Button>
      </nav>
    </header>
  );
}
