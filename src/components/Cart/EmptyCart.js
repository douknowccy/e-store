import React from "react";
import { Link } from "react-router-dom";
export default function EmptyCart() {
  return (
    <section className="empty-cart section">
      <h2>還是空的．．．</h2>
      <Link to="/products" className="btn btn-primary">
        回去購物
      </Link>
    </section>
  );
}
