import React, {useReducer} from "react";

const CartContext = React.createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (item) => {},
  clearCart: () => {},
});

function CartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const updatedItems = [...state.items];

    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({...action.item, quantity: 1});
    }
    return {...state, items: updatedItems};
  }

  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    const updatedItems = [...state.items];

    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {...state, items: updatedItems};
  }

  if (action.type === "CLEAR_CART") {
    return {...state, items: []};
  }

  return state;
}
export function CartContextProvider({children}) {
  const [cart, dispatchCartAction] = useReducer(CartReducer, {items: []});

  const addItem = (item) => {
    dispatchCartAction({type: "ADD_ITEM", item});
  };

  const removeItem = (id) => {
    dispatchCartAction({type: "REMOVE_ITEM", item: {id}});
  };

  const clearCart = () => {
    dispatchCartAction({type: "CLEAR_CART"});
  };

  const contextValue = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  };

  console.log(contextValue);
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartContext;
