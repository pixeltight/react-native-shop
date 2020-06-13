import { PRODUCTS } from '../../data/products-data'
import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  SET_PRODUCTS
} from '../actions/products'
import Product from '../../models/product'

const initialState = {
  products: PRODUCTS,
  userProducts: PRODUCTS.filter(product => product.ownerId === 'u1')
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        products: action.products,
        userProducts: action.products.filter(prod => prod.ownerId === 'u1')
      }
    case CREATE_PRODUCT:
      const newProduct = new Product(
        action.productData.id,
        'u1',
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      )
      return {
        ...state,
        products: state.products.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct)
      }
    case UPDATE_PRODUCT:
      // update userProducts state
      const productIndex = state.userProducts.findIndex(
        prod => prod.productId === action.pid
      )
      const updatedProduct = new Product(
        action.pid,
        state.userProducts[productIndex].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[productIndex].price
      )
      const updatedUserProducts = [...state.userProducts]
      updatedUserProducts[productIndex] = updatedProduct
      // update products state
      const availableProductIndex = state.products.findIndex(
        product => product.productId === action.pid
      )
      const updatedAvailableProducts = [...state.products]
      updatedAvailableProducts[availableProductIndex] = updatedProduct
      return {
        ...state,
        products: updatedAvailableProducts,
        userProducts: updatedUserProducts
      }
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
