import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image, Button } from 'react-native'
import { useSelector } from 'react-redux'

import CustomButton from '../components/CustomButton'
import colors from '../constants/colors'

const ProductDetailsScreen = props => {
  const productId = props.navigation.getParam('productId')
  const selectedProduct = useSelector(state =>
    state.products.products.find(product => product.productId === productId)
  )
  return (
    <ScrollView>
      <Image source={{ uri: selectedProduct.imageUrl }} style={styles.image} />
      <CustomButton
        containerStyle={styles.actions}
        textStyle={styles.buttonText}
        onButtonPress={() => {
          console.log(`product details add to cart button`)
        }}
      >
        Add to Cart
      </CustomButton>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  )
}

ProductDetailsScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('productName')
  }
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 250
  },
  actions: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'roboto-bold'
  },
  price: {
    fontSize: 16,
    color: colors.textGray,
    textAlign: 'center',
    marginBottom: 12,
    fontFamily: 'roboto-bold'
  },
  description: {
    fontSize: 12,
    textAlign: 'center',
    marginHorizontal: 15,
    fontFamily: 'roboto-regular'
  }
})

export default ProductDetailsScreen
