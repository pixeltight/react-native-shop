import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { Ionicons } from '@expo/vector-icons'
import colors from '../../constants/colors'

const CartItem = props => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{props.quantity} </Text>
        <Text style={styles.mainText}>{props.title}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.amount}>${props.amount.toFixed(2)}</Text>
        {props.deletable && (
          <TouchableOpacity
            onPress={props.onRemove}
            style={styles.deleteButton}
          >
            <Ionicons name='ios-trash' size={30} color={colors.defaultPurple} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cartItem: {
    padding: 6,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 4
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  mainText: {
    fontFamily: 'roboto-regular',
    color: colors.medGray,
    fontSize: 14
  },
  amount: {},
  deleteButton: {
    marginLeft: 12,
    paddingHorizontal: 9,
    paddingVertical: 2,
    backgroundColor: '#EFEFEF',
    borderRadius: 18,
    width: 36,
    height: 36
  }
})

export default CartItem
