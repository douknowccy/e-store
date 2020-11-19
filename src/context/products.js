// products context
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import url from "../utils/URL";
//filter products with featured true setting new array
import { featuredProducts, faltternProducts } from "../utils/helpers";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    axios.get(`${url}/products`).then((response) => {
      const products = faltternProducts(response.data);
      const featured = featuredProducts(products);
      setProducts(products);
      setFeatured(featured);

      setIsLoading(false);
    });

    return () => {};
  }, []);

  return (
    <ProductContext.Provider value={{ products, isLoading, featured }}>
      {children}
    </ProductContext.Provider>
  );
}

export default function useGlobalProductContext() {
  return useContext(ProductContext);
}
