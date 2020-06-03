import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'

import { PRODUCTS } from '../data/products-data'
import ProductThumbnail from '../components/ProductThumbnail'
import { Ionicons } from '@expo/vector-icons'

import colors from '../constants/colors'

const ProductsScreen = props => {
  const renderThumbnail = itemData => (
    <ProductThumbnail
      title={itemData.item.productName}
      image={itemData.item.imageUrl}
      price={itemData.item.price}
      onViewDetails={() => {
        props.navigation.navigate({
          routeName: 'ProductDetails'
        })
      }}
    />
  )
  return (
    <View style={{ backgroundColor: colors.medGray }}>
      <FlatList
        data={PRODUCTS}
        renderItem={renderThumbnail}
        keyExtractor={(item, index) => item.productId}
        style={{ width: '100%', paddingHorizontal: 8 }}
      />
    </View>
  )
}

ProductsScreen.navigationOptions = navData => {
  return {
    headerTitle: 'All Products',
    headerLeft: () => (
      <View style={styles.iconContainer}>
        <Ionicons
          name='ios-menu'
          size={30}
          color='#fff'
          onPress={() => {
            console.log('MENU BUTTON CLICK')
          }}
        />
      </View>
    ),
    headerRight: () => (
      <View style={styles.iconContainer}>
        <Ionicons
          name='ios-cart'
          size={24}
          color='#fff'
          onPress={() => {
            console.log('CART BUTTON CLICK')
          }}
        />
      </View>
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
