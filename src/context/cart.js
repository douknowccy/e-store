// cart context
import React from "react";
// import localCart from "../utils/localCart";
import reducer from "./reducer";
import {
  REMOVE_ITEM,
  ADD_TO_CART,
  DECREASE_AMOUNT,
  INCREASE_AMOUNT,
  CLEAR_CART,
} from "./action";
function getCartFromLocalStorage() {
  return localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
}
const CartContext = React.createContext();

function CartProvider({ children }) {
  const [cart, dispatch] = React.useReducer(reducer, getCartFromLocalStorage());
  const [total, setTotal] = React.useState(0);
  const [cartItems, setCartItems] = React.useState(0);

  React.useEffect(() => {
    //local storage
    localStorage.setItem("cart", JSON.stringify(cart));

    let newCartItems = cart.reduce((total, cartItem) => {
      return (total += cartItem.amount);
    }, 0);

    setCartItems(newCartItems);

    let newTotal = cart.reduce((total, cartItem) => {
      return (total += cartItem.amount * cartItem.price);
    }, 0);
    newTotal = parseFloat(newTotal.toFixed(2));
    setTotal(newTotal);
  }, [cart]);

  const removeItem = (id) => {
    // setCart(cart.filter((item) => item.id !== id));
    dispatch({ type: REMOVE_ITEM, payload: id });
  };
  const increaseAmount = (id) => {
    // const newCart = cart.map((item) => {
    //   return item.id === id
    //     ? { ...item, amount: item.amount + 1 }
    //     : { ...item };
    // });
    // setCart(newCart);
    dispatch({ type: INCREASE_AMOUNT, payload: id });
  };
  const decreaseAmount = (id, amount) => {
    if (amount <= 1) {
      dispatch({ type: REMOVE_ITEM, payload: id });
    } else {
      dispatch({ type: DECREASE_AMOUNT, payload: id });
    }
    // if (amount <= 1) {
    //   removeItem(id);
    //   return;
    // } else {
    //   const newCart = cart.map((item) => {
    //     return item.id === id
    //       ? { ...item, amount: item.amount - 1 }
    //       : { ...item };
    //   });
    //   setCart(newCart);
    // }
  };

  const addToCart = (product) => {
    // const { id, image, title, price } = product;
    // console.log(image);
    // const item = cart.find((item) => item.id === id);
    // //cart have product increase amount +1 else add product to cart
    // if (item) {
    //   increaseAmount(id);
    //   return;
    // } else {
    //   const newItem = { id, image, title, price, amount: 1 };
    //   setCart([...cart, newItem]);
    //   return;
    // }
    const item = cart.find((item) => item.id === product.id);
    if (item) {
      dispatch({ type: INCREASE_AMOUNT, payload: product.id });
    } else {
      dispatch({ type: ADD_TO_CART, payload: product });
    }
  };
  const clearCart = () => {
    // setCart([]);
    dispatch({ type: CLEAR_CART });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        cartItems,
        removeItem,
        increaseAmount,
        decreaseAmount,
        addToCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default function useGlobalCartContext() {
  return React.useContext(CartContext);
}
export { CartProvider };
