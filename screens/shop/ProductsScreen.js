import React, { useState, useEffect, useCallback } from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  ActivityIndicator
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import ProductThumbnail from '../../components/shop/ProductThumbnail'
import CustomButton from '../../components/UI/CustomButton'
import * as cartActions from '../../store/actions/cart'
import * as productsActions from '../../store/actions/products'
import HeaderButton from '../../components/UI/HeaderButton'
import colors from '../../constants/colors'

const ProductsScreen = props => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const products = useSelector(state => state.products.products)
  const dispatch = useDispatch()

  const loadProducts = useCallback(async () => {
    setError(null)
    setIsLoading(true)
    try {
      await dispatch(productsActions.fetchProducts())
    } catch (err) {
      setError(err.message)
    }
    setIsLoading(false)
  }, [dispatch, setIsLoading, setError])

  // navigation listener - drawer navigation will not prompt refresh,
  // may lead to stale data
  useEffect(() => {
    const willFocusSub = props.navigation.addListener('willFocus', loadProducts)

    return () => {
      willFocusSub.remove()
    }
  }, [loadProducts])

  useEffect(() => {
    loadProducts()
  }, [dispatch, loadProducts])

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

  if (error) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.message}>An error occurred.</Text>
        <Button
          title='Try again'
          onPress={loadProducts}
          color={colors.defaultPurple}
        />
      </View>
    )
  }

  if (isLoading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size='large' color={colors.medGray} />
      </View>
    )
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.message}>
          No products found. Please try adding some.
        </Text>
      </View>
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
  },
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  message: {
    fontFamily: 'roboto-regular',
    fontSize: 12
  }
})

export default ProductsScreen
