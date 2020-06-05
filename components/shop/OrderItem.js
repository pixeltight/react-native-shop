import React, { useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

import CartItem from './CartItem'
import colors from '../../constants/colors'

const OrderItem = props => {
  const [showDetails, setShowDetails] = useState(false)
  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>{props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button
        color={colors.defaultPurple}
        title={showDetails ? 'Hide Details' : 'Show Details'}
        onPress={() => {
          setShowDetails(prevState => !prevState)
        }}
      />
      {showDetails && (
        <View style={styles.detailItems}>
          {props.items.map(cartItem => (
            <CartItem
              key={cartItem.productId}
              quantity={cartItem.quantity}
              amount={cartItem.sum}
              title={cartItem.productTitle}
            />
          ))}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  orderItem: {
    shadowColor: '#000',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginTop: 20,
    marginHorizontal: 8,
    padding: 10
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  totalAmount: {
    fontFamily: 'roboto-bold',
    fontSize: 14
  },
  date: {
    fontSize: 12,
    fontFamily: 'roboto-regular',
    color: colors.medGray
  },
  detailItems: {}
})

export default OrderItem
