import {
  REMOVE_ITEM,
  ADD_TO_CART,
  DECREASE_AMOUNT,
  INCREASE_AMOUNT,
  CLEAR_CART,
} from "./action";
export default (state, action) => {
  switch (action.type) {
    case REMOVE_ITEM:
      return state.filter((item) => item.id !== action.payload);
    case ADD_TO_CART:
      const { id, image, title, price } = action.payload;
      //add new product with amount :1
      let product = { id, image, title, price, amount: 1 };
      return [...state, product];
    case DECREASE_AMOUNT:
      return state.map((item) => {
        return item.id === action.payload
          ? { ...item, amount: item.amount - 1 }
          : { ...item };
      });

    case INCREASE_AMOUNT:
      return state.map((item) => {
        return item.id === action.payload
          ? { ...item, amount: item.amount + 1 }
          : { ...item };
      });

    case CLEAR_CART:
      return [];
    default:
      return state;
  }
};
