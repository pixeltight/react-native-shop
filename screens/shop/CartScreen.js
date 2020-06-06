import React from 'react'
import { View, Text, FlatList, Button, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import CartItem from '../../components/shop/CartItem'
import colors from '../../constants/colors'
import * as cartActions from '../../store/actions/cart'
import * as orderActions from '../../store/actions/orders'
const CartScreen = props => {
  const dispatch = useDispatch()
  const cartTotalAmount = useSelector(state => state.cart.totalAmount)
  const cartItems = useSelector(state => {
    const transformedCartItems = []
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum
      })
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    )
  })

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>
            ${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        <Button
          title='Order Now'
          disabled={cartItems.length === 0}
          color={colors.defaultPurple}
          onPress={() => {
            return dispatch(orderActions.addOrder(cartItems, cartTotalAmount))
          }}
        />
      </View>
      <View>
        <Text>CART ITEMS</Text>
        <FlatList
          data={cartItems}
          keyExtractor={item => item.productId}
          renderItem={itemData => (
            <CartItem
              quantity={itemData.item.quantity}
              title={itemData.item.productTitle}
              amount={itemData.item.sum}
              deletable
              onRemove={() => {
                dispatch(cartActions.removeFromCart(itemData.item.productId))
              }}
            />
          )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    marginVertical: 20,
    marginHorizontal: 10
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10
  },
  summaryText: {
    fontFamily: 'roboto-regular',
    fontSize: 16,
    color: colors.medGray
  },
  amount: {
    fontFamily: 'roboto-bold',
    color: colors.textGray
  }
})

export default CartScreen
