import React, { useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

import CartItem from './CartItem'
import colors from '../../constants/colors'
import Card from '../UI/Card'

const OrderItem = props => {
  const [showDetails, setShowDetails] = useState(false)
  return (
    <Card style={styles.orderItem}>
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
    </Card>
  )
}

const styles = StyleSheet.create({
  orderItem: {
    marginTop: 20,
    marginHorizontal: 8,
    marginTop: 50,
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
