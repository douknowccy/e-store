import React, { useState } from "react";
import EmptyCart from "../components/Cart/EmptyCart";
import useGlobalUserContext from "../context/user";
import useGlobalCartContext from "../context/cart";
import { useHistory } from "react-router-dom";
//for card payment
import {
  CardElement,
  StripeProvider,
  Elements,
  injectStripe,
} from "react-stripe-elements";
import submitOrder from "../strapi/submitOrder";

function Checkout(props) {
  const { user, showAlert, hideAlert, alert } = useGlobalUserContext();
  const { cart, total, clearCart } = useGlobalCartContext();
  const history = useHistory();

  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const isEmpty = !name || alert.show;
  const handleSubmit = async (e) => {
    showAlert({ msg: "submitting order ... please wait" });
    e.preventDefault();
    const response = await props.stripe
      .createToken()
      .catch((error) => console.log(error));
    const { token } = response;
    if (token) {
      //submit order
      setError("");
      const { id } = token;
      let order = await submitOrder({
        name: name,
        total: total,
        items: cart,
        stripeTokenId: id,
        userToken: user.token,
      });

      if (order) {
        showAlert({ msg: "your order is complete" });
        clearCart();
        history.push("/");
        return;
      } else {
        showAlert({
          msg: "there was an error with your order. please try again!",
          type: "danger",
        });
      }
    } else {
      hideAlert();
      setError(response.error.message);
    }
  };
  if (cart.length < 1) {
    return <EmptyCart />;
  }
  return (
    <section className="section form">
      <h2 className="section-title">checkout</h2>
      <form className="checkout-form">
        <h3>
          order total : <span>${total}</span>
        </h3>
        {/* single Input */}
        <div className="form-control">
          <label htmlFor="name">name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {/* end of single Input */}
        {/* card element */}
        <div className="stripe-input">
          <label htmlFor="card-element">credit or debit card</label>
          <p className="stripe-info">
            using this credit card : <span>4242 4242 4242 4242</span>
            <br />
            enter any 5 digits for the zip code
            <br />
            enter any 3 digits for the CVC
          </p>
        </div>
        {/* end of card element */}
        {/* stripe element */}
        <CardElement className="card-element"></CardElement>
        {/* stripe error */}
        {error && <p className="form-empty">{error}</p>}
        {/* empty value */}
        {isEmpty ? (
          <p className="form-empty">plase fill out name field</p>
        ) : (
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary btn-block"
          >
            submit
          </button>
        )}

        {/* end of stripe element */}
      </form>
    </section>
  );
}

const CardForm = injectStripe(Checkout);

const StripeWrapper = () => {
  return (
    <StripeProvider apiKey="pk_test_51HSp0nEfgGHG5eqqP4RXQlaw2JD8IbId9bn1DLyMQk7Yn12ivMc5VjLxeGeb8Vv96WvaFKaB2diKj92BvhGy5e5s00bYEl7cD4">
      <Elements>
        <CardForm />
      </Elements>
    </StripeProvider>
  );
};

export default StripeWrapper;
