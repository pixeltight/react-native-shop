import { PRODUCTS } from '../../data/products-data'

const initialState = {
  products: PRODUCTS
}

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default productsReducer
