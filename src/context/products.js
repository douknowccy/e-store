// products context
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import url from "../utils/URL";
//filter products with featured true setting new array
import {
  featuredProducts,
  faltternProducts,
  pagination,
} from "../utils/helpers";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState([]);
  //extra state for sort and paginagtion and filter
  const [sorted, setSorted] = useState([]);
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    shipping: false,
    price: "all",
  });

  //fetch data
  useEffect(() => {
    axios.get(`${url}/products`).then((response) => {
      const products = faltternProducts(response.data);
      //format data
      const featured_products = featuredProducts(products);

      setFeatured(featured_products);
      setProducts(products);
      setSorted(pagination(products));
      setIsLoading(false);
    });

    return () => {};
  }, []);
  //filter
  useEffect(() => {
    let newProducts = [...products].sort((a, b) => a.price - b.price);
    const { search, category, shipping, price } = filters;
    if (category !== "all") {
      newProducts = newProducts.filter((item) => item.category === category);
    }
    if (shipping === true) {
      newProducts = newProducts.filter(
        (item) => item.free_shipping === shipping
      );
    }
    //search term with query match query from start
    if (search !== "") {
      newProducts = newProducts.filter((item) => {
        let title = item.title.toLowerCase().trim();
        return title.startsWith(search) ? item : null;
      });
    }
    if (price !== "all") {
      newProducts = newProducts.filter((item) => {
        if (price === 0) {
          return item.price < 300;
        } else if (price === 300) {
          return item.price > 300 && item.price < 650;
        } else {
          return item.price > 650;
        }
      });
    }
    setPage(0);
    setSorted(pagination(newProducts));
  }, [filters, products]);

  const changePage = (index) => {
    setPage(index);
  };

  const updateFilter = (e) => {
    const type = e.target.type;
    const filter = e.target.name;
    const value = e.target.value;
    let filterValue;
    if (type === "checkbox") {
      filterValue = e.target.checked;
    } else if (type === "radio") {
      value === "all" ? (filterValue = value) : (filterValue = parseInt(value));
    } else {
      filterValue = value;
    }
    setFilters({ ...filters, [filter]: filterValue });
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        isLoading,
        featured,
        sorted,
        page,
        filters,
        changePage,
        updateFilter,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export default function useGlobalProductContext() {
  return useContext(ProductContext);
}
