import React from "react";
import useGlobalProductContext from "../context/products";
import Loading from "../components/Loading";
import ProductList from "../components/Products/ProductList";
export default function Products() {
  const { isLoading, products } = useGlobalProductContext();

  if (isLoading) {
    return <Loading />;
  }

  return <ProductList title="our products" products={products} />;
}
