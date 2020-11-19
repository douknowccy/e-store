import React from "react";
import ProductList from "./ProductList";
import useGlobalContext from "../../context/products";
import Loading from "../Loading";
export default function FeaturedProducts() {
  const { isLoading, featured, products } = useGlobalContext();
  if (isLoading) {
    return <Loading />;
  }
  return <ProductList title="featured products" products={featured} />;
}
