import { ADD_TO_CART } from '../actions/cart'
import CartItem from '../../models/cart-item'

const initialState = {
  items: {},
  totalAmount: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product
      const prodTitle = addedProduct.productName
      const prodPrice = addedProduct.price

      let updatedOrNewCartItem

      if (state.items[addedProduct.productId]) {
        // item is already in cart
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.productId].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.productId].sum + prodPrice
        )
      } else {
        updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle)
      }
      return {
        ...state,
        items: {
          ...state.items,
          [addedProduct.productId]: updatedOrNewCartItem
        },
        totalAmount: state.totalAmount + prodPrice
      }
    default:
      return state
  }
}
