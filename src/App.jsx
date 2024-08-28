import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Head from "./components/Header";
import Meals from "./components/Meals";
import {CartContextProvider} from "./store/CartContext";
import UserProgressContext from "./store/UserProgressContext";
import {UserProgressContextProvider} from "./store/UserProgressContext";

function App() {
  return (
    <>
      <UserProgressContextProvider>
        <CartContextProvider>
          <Head />
          <Meals />
          <Cart />
          <Checkout />
        </CartContextProvider>
      </UserProgressContextProvider>
    </>
  );
}

export default App;
