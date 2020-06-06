import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'

import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen'
import ProductsScreen from '../screens/shop/ProductsScreen'
import CartScreen from '../screens/shop/CartScreen'
import OrdersScreen from '../screens/shop/OrdersScreen'
import UserProductsScreen from '../screens/user/UserProductsScreen'
import EditProductScreen from '../screens/user/EditProductScreen'
import { Ionicons } from '@expo/vector-icons'
import colors from '../constants/colors'

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: colors.defaultPurple
  },
  headerTitleStyle: {
    fontFamily: 'roboto-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'roboto-regular'
  },
  headerTintColor: colors.white
}

const ProductsNavigator = createStackNavigator(
  {
    Products: ProductsScreen,
    ProductDetails: ProductDetailsScreen,
    Cart: CartScreen
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons name='ios-cart' color={drawerConfig.tintColor} size={23} />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
)

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons name='ios-list' color={drawerConfig.tintColor} size={23} />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
)

const AdminNavigator = createStackNavigator(
  {
    UserProducts: UserProductsScreen,
    EditProduct: EditProductScreen
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons name='ios-create' color={drawerConfig.tintColor} size={23} />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
)

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator
  },
  {
    contentOptions: {
      activeTintColor: colors.defaultPurple
    }
  }
)

export default createAppContainer(ShopNavigator)
