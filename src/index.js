import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ProductProvider } from "./context/products";
import { CartProvider } from "./context/cart";
import { UserProvider } from "./context/user";
ReactDOM.render(
  <ProductProvider>
    <UserProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </UserProvider>
  </ProductProvider>,
  document.getElementById("root")
);
