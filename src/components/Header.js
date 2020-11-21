import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import CartLink from "../components/Cart/CartLink";
import useGlobalUserContext from "../context/user";
import LoginLink from "../components/LoginLink";
export default function Header() {
  const { user } = useGlobalUserContext();
  return (
    <header className="header">
      <img src={logo} alt="E-store" className="logo" />
      <nav>
        <ul>
          <div className="header-link">
            <li>
              <Link to="/">回首頁</Link>
            </li>
            <li>
              <Link to="/about">關於</Link>
            </li>
            <li>
              <Link to="/products">寶貝</Link>
            </li>
            {user.token && (
              <li>
                <Link to="/checkout">結帳</Link>
              </li>
            )}
          </div>
          <div className="header-link">
            <LoginLink />
            <CartLink />
          </div>
        </ul>
      </nav>
    </header>
  );
}
