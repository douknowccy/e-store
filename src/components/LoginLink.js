import React from "react";
import { Link } from "react-router-dom";
import useGlobalUserContext from "../context/user";
import useGlobalCartContext from "../context/cart";
export default function LoginLink() {
  const { user, userLogout } = useGlobalUserContext();
  const { clearCart } = useGlobalCartContext();
  if (user.token) {
    return (
      <button
        className="login-btn"
        onClick={() => {
          userLogout();
          clearCart();
        }}
      >
        logout
      </button>
    );
  }
  return <Link to="/login">login</Link>;
}
