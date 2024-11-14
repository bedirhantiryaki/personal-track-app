// src/store.js
import { createStore } from "redux";

// Başlangıç durumu (initial state)
const initialState = {
  count: 0,
};

// Reducer fonksiyonu
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        count: state.count + 1,
      };
    case "DECREMENT":
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
};

// Store oluşturuluyor
const store = createStore(reducer);

export default store;
