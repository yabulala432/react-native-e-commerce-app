import { createSlice } from "@reduxjs/toolkit";

/**
 * [{"carouselImages": [Array], "color": "Pastel Green", "id": 0, "image": "https://www.phoneplacekenya.com/wp-content/uploads/2021/01/Airpods-Max-e.jpg", "offer": [Object], "oldPrice": 24999, "price": 23999, "quantity": 1, "size": "8GB RAM, 128GB Storage", "title": "OnePlus Nord CE 3 Lite 5G (Pastel Green, 8GB RAM, 128GB Storage)"}]
 */

export interface Cart {
  carouselImages: string[];
  color: string;
  id: number;
  image: string;
  offer: object;
  oldPrice: number;
  price: number;
  quantity: number;
  size: string;
  title: string;
}

interface CartState {
  cart: Cart[];
}

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [] as Cart[],
  },
  reducers: {
    addToCart: (state, action: { payload: Cart }) => {
      const itemPresent = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (itemPresent) {
        itemPresent.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: { payload: Cart }) => {
      const removeItem = state.cart.filter(
        (item) => item.id !== action.payload.id
      );
      state.cart = removeItem;
    },
    increamentQuantity: (state, action: { payload: Cart }) => {
      const itemPresent = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (itemPresent) {
        itemPresent.quantity++;
      }
    },
    decreamentQuantity: (state, action: { payload: Cart }) => {
      const itemPresent = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (itemPresent && itemPresent.quantity == 1) {
        const removeItem = state.cart.filter(
          (item) => item.id !== action.payload.id
        );
        state.cart = removeItem;
      } else if (itemPresent) {
        itemPresent.quantity--;
      }
    },
    cleanCart: (state) => {
      state.cart = [];
    },
    setCustomQuantity: (state, action: { payload: Cart }) => {
      // from the user
      const itemPresent = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (itemPresent) {
        itemPresent.quantity = action.payload.quantity;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increamentQuantity,
  decreamentQuantity,
  cleanCart,
  setCustomQuantity,
} = CartSlice.actions;

export default CartSlice.reducer;
