import { PRODUCTS } from '../../data/products-data'
import { DELETE_PRODUCT } from '../actions/products'

const initialState = {
  products: PRODUCTS,
  userProducts: PRODUCTS.filter(product => product.ownerId === 'u1')
}

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          prod => prod.productId !== action.pid
        ),
        products: state.products.filter(prod => prod.productId !== action.pid)
      }
    default:
      return state
  }
}
