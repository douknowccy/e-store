import React from "react";
import { Link } from "react-router-dom";

import Hero from "../components/Hero";
import FeatureProducts from "../components/Products/FeaturedProducts";
export default function Home() {
  return (
    <>
      <Hero>
        <Link to="/products" className="btn btn-primary btn-hero">
          我的寶貝
        </Link>
      </Hero>
      <FeatureProducts />
    </>
  );
}
