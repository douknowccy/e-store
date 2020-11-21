import React from "react";
import useGlobalProductContext from "../context/products";
import Loading from "../components/Loading";
// import ProductList from "../components/Products/ProductList";
import Filter from "../components/Products/Filter";
import PagnationProduct from "../components/Products/PagnationProduct";
export default function Products() {
  const { isLoading } = useGlobalProductContext();

  if (isLoading) {
    return <Loading />;
  }

  return (
    //  <ProductList title="our products" products={sorted} />;
    <>
      <Filter />
      <PagnationProduct />
    </>
  );
}
