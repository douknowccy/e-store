import React from "react";
import { Link } from "react-router-dom";
import useGlobalCartContext from "../../context/cart";

export default function CartLink() {
  const { cartItems } = useGlobalCartContext();

  return (
    <div className="cart-link-container">
      <Link to="/cart">cart</Link>
      <span className="cart-link-total">{cartItems}</span>
    </div>
  );
}
