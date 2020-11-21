import React from "react";
import useGlobalProductContext from "../../context/products";
function Filter() {
  const {
    filters: { search, category, shipping, price },
    sorted,
    updateFilter,
  } = useGlobalProductContext();
  return (
    <section className="filters-section">
      <h2 className="section-title">搜尋寶貝</h2>
      <form className="filters-form">
        <div className="">
          <div className="form-group">
            {/* search input */}
            <label htmlFor="search">搜尋</label>
            <input
              placeholder="搜尋．．．
            "
              className="form-control"
              type="text"
              id="search"
              name="search"
              value={search}
              onChange={updateFilter}
            />
            {/* search input */}
          </div>
          {/* select category */}
          <div className="form-group">
            <label htmlFor="category">類別</label>
            <select
              name="category"
              id="category"
              className="form-control"
              value={category}
              onChange={updateFilter}
            >
              <option value="all">全部</option>
              <option value="MOBILE">手機</option>
              <option value="LAPTOP">筆電</option>
              <option value="PC">電腦</option>
              <option value="ACCESSORY">配件</option>
            </select>
          </div>
          {/* select category */}
          {/* free shipping */}
          <div className="form-group">
            <input
              type="checkbox"
              name="shipping"
              checked={shipping}
              onChange={updateFilter}
            />
            <label htmlFor="shipping">免運</label>
          </div>
        </div>

        {/* free shipping */}
        <div className="price-group">
          <p>價格</p>
          <label>
            <input
              type="radio"
              name="price"
              value="all"
              checked={price === "all"}
              onChange={updateFilter}
            />
            全部
          </label>
          <label>
            <input
              type="radio"
              name="price"
              value="0"
              checked={price === 0}
              onChange={updateFilter}
            />
            0 - $300
          </label>
          <label>
            <input
              type="radio"
              name="price"
              value="300"
              checked={price === 300}
              onChange={updateFilter}
            />
            300 - $650
          </label>
          <label>
            <input
              type="radio"
              name="price"
              value="650"
              checked={price === 650}
              onChange={updateFilter}
            />
            Over $650
          </label>
        </div>
      </form>
      <h2>符合條件有 ： {sorted.flat().length}</h2>
      <hr />
    </section>
  );
}

export default Filter;
