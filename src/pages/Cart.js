import React from "react";
import useGlobalCartContext from "../context/cart";
import EmptyCart from "../components/Cart/EmptyCart";
import CartItem from "../components/Cart/CartItem";
import { Link } from "react-router-dom";
import useGlobalUserContext from "../context/user";

export default function Cart() {
  const { user } = useGlobalUserContext();
  const { cart, total } = useGlobalCartContext();

  if (cart.length === 0) {
    return <EmptyCart />;
  }
  return (
    <section className="cart-items section">
      <h2>購物車</h2>
      {cart.map((item) => {
        return <CartItem key={item.id} {...item} />;
      })}
      <h2>總共 : $ {total}</h2>
      {user.token ? (
        <Link to="/checkout" className="btn btn-primary btn-block">
          結帳
        </Link>
      ) : (
        <Link to="/login" className="btn btn-primary btn-block">
          登入
        </Link>
      )}
    </section>
  );
}
