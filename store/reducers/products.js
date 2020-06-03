import { PRODUCTS } from '../../data/products-data'

const initialState = {
  products: PRODUCTS,
  cart: []
}

const productsReducer = (state = initialState, action) => {
  return state
}

export default productsReducer
