import React from "react";
import { useParams } from "react-router-dom";
import useGlobalProductContext from "../context/products";
import useGlobalCartContext from "../context/cart";
import { useHistory } from "react-router-dom";
import Loading from "../components/Loading";

export default function ProductDetails() {
  const { id } = useParams();
  const history = useHistory();

  const { products } = useGlobalProductContext();
  const { addToCart } = useGlobalCartContext();
  const product = products.find((item) => item.id === parseInt(id));
  //also prevent the undefine array product rendering
  if (!product) {
    return <Loading />;
  } else {
    const { image, title, price, description } = product;
    return (
      <section className="single-product">
        <img src={image} alt={title} />
        <article>
          <h1>{title}</h1>
          <h2>{price}</h2>
          <p>{description}</p>
          <button
            className="btn btn-primary btn-block"
            onClick={() => {
              // add to cart
              addToCart(product);
              history.push("/cart");
            }}
          >
            加入購物車
          </button>
        </article>
      </section>
    );
  }
}
