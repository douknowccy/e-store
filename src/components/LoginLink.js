import React from "react";
import { Link, useHistory } from "react-router-dom";
import useGlobalUserContext from "../context/user";
import useGlobalCartContext from "../context/cart";
export default function LoginLink() {
  const history = useHistory();
  const { user, userLogout } = useGlobalUserContext();
  const { clearCart } = useGlobalCartContext();
  if (user.token) {
    return (
      <button
        className="login-btn"
        onClick={() => {
          userLogout();
          clearCart();
          history.push("/");
        }}
      >
        登出
      </button>
    );
  }
  return <Link to="/login">登入</Link>;
}
