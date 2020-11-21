import React from "react";

export default function Hero({ children }) {
  return (
    <div className="hero">
      <div className="banner">
        <h1>IPhone 12 Pro</h1>
        <p>躍升，超越．</p>
        {children}
      </div>
    </div>
  );
}
