import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import ProductDetailsScreen from '../screens/ProductDetailsScreen'
import ProductsScreen from '../screens/ProductsScreen'
import colors from '../constants/colors'

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: colors.defaultPurple
  },
  headerTitleStyle: {
    fontFamily: 'roboto-bold'
  },
  headerTintColor: colors.white
}

const ProductsNavigator = createStackNavigator(
  {
    Products: {
      screen: ProductsScreen
    },
    ProductDetails: {
      screen: ProductDetailsScreen
    }
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
)

export default createAppContainer(ProductsNavigator)
