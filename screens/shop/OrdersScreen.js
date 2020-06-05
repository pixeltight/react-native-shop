import React from 'react'
import { Text, StyleSheet, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import HeaderButton from '../../components/UI/HeaderButton'
import OrderItem from '../../components/shop/OrderItem'
import colors from '../../constants/colors'

const OrdersScreen = props => {
  const orders = useSelector(state => state.orders.orders)

  return (
    <FlatList
      data={orders}
      keyExtractor={item => item.id}
      renderItem={itemData => {
        return (
          <OrderItem
            amount={itemData.item.totalAmount}
            date={itemData.item.readableDate}
            items={itemData.item.items}
          />
        )
      }}
    />
  )
}

OrdersScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Your Orders',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Cart'
          iconName='ios-menu'
          color={colors.defaultPurple}
          onPress={() => {
            navData.navigation.toggleDrawer()
          }}
          iconSize={36}
        />
      </HeaderButtons>
    )
  }
}

const styles = StyleSheet.create({})

export default OrdersScreen
