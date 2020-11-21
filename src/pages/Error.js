import React from "react";
import { Link } from "react-router-dom";
export default function Error() {
  return (
    <section className="error-page section">
      <div className="error-container">
        <h1>錯誤頁面</h1>
        <Link to="/" className="btn btn-primary">
          回首頁
        </Link>
      </div>
    </section>
  );
}
