import React from "react";
import ProductList from "./ProductList";
import useGlobalProductContext from "../../context/products";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

function PagnationProduct() {
  const { sorted, page, changePage } = useGlobalProductContext();

  //return array of sorted from page= 0
  if (sorted[page]) {
    return (
      <section>
        <ProductList products={sorted[page]} />
        {/* show buttons that sorted items > single page show */}
        {sorted.length > 1 && (
          <article className="pagination-buttons">
            {/* prev */}
            {page > 0 && (
              <button
                className="prev-page-btn"
                onClick={() => changePage(page - 1)}
              >
                <FaAngleDoubleLeft></FaAngleDoubleLeft>
              </button>
            )}
            {sorted.map((_, index) => {
              return (
                <button
                  className={`page-btn ${page === index && `page-btn-current`}`}
                  key={index}
                  onClick={() => {
                    changePage(index);
                  }}
                >
                  {index + 1}
                </button>
              );
            })}
            {/* next */}
            {page < sorted.length - 1 && (
              <button
                className="next-page-btn"
                onClick={() => changePage(page + 1)}
              >
                <FaAngleDoubleRight></FaAngleDoubleRight>
              </button>
            )}
          </article>
        )}
      </section>
    );
  } else {
    return <h3 className="search-errors">沒有符合搜尋結果的寶貝</h3>;
  }
}

export default PagnationProduct;
