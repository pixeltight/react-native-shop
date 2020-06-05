import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import ProductThumbnail from '../../components/shop/ProductThumbnail'
import CustomButton from '../../components/UI/CustomButton'
import * as cartActions from '../../store/actions/cart'
import HeaderButton from '../../components/UI/HeaderButton'
import colors from '../../constants/colors'

const ProductsScreen = props => {
  const products = useSelector(state => state.products.products)
  const dispatch = useDispatch()

  const selectItemHandler = (id, title) => {
    props.navigation.navigate({
      routeName: 'ProductDetails',
      params: {
        productId: id,
        productName: title
      }
    })
  }

  const renderThumbnail = itemData => {
    return (
      <ProductThumbnail
        title={itemData.item.productName}
        image={itemData.item.imageUrl}
        price={itemData.item.price}
        onSelect={() => {
          selectItemHandler(itemData.item.productId, itemData.item.productName)
        }}
      >
        <CustomButton
          onButtonPress={() =>
            selectItemHandler(
              itemData.item.productId,
              itemData.item.productName
            )
          }
        >
          View Details
        </CustomButton>
        <CustomButton
          onButtonPress={() => dispatch(cartActions.addToCart(itemData.item))}
        >
          Add to Cart
        </CustomButton>
      </ProductThumbnail>
    )
  }
  return (
    <FlatList
      data={products}
      renderItem={renderThumbnail}
      keyExtractor={(item, index) => item.productId}
      style={{ width: '100%', paddingHorizontal: 8 }}
    />
  )
}

ProductsScreen.navigationOptions = navData => {
  return {
    headerTitle: 'All Products',
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
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Cart'
          iconName='ios-cart'
          color={colors.defaultPurple}
          iconSize={24}
          onPress={() => {
            navData.navigation.navigate('Cart')
          }}
        />
      </HeaderButtons>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 23
  },
  iconContainer: {
    paddingHorizontal: 12
  }
})

export default ProductsScreen
