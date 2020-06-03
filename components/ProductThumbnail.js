import React from 'react'
import { View, Text, StyleSheet, Image, Button } from 'react-native'

import CustomButton from '../components/CustomButton'
import colors from '../constants/colors'

const ProductThumbnail = props => {
  return (
    <View style={styles.thumbnailContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: props.image }} style={styles.image} />
      </View>
      <View style={styles.details}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.price}>${props.price.toFixed(2)}</Text>
      </View>
      <View style={styles.actions}>
        <CustomButton onButtonPress={props.onViewDetails}>
          View Details
        </CustomButton>
        <CustomButton>Add to Cart</CustomButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  thumbnailContainer: {
    height: 200,
    width: '100%',
    backgroundColor: '#efefef',
    marginBottom: 20,
    borderRadius: 10,
    height: 250,
    shadowColor: '#000',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  details: {
    alignItems: 'center',
    padding: 10,
    height: '20%'
  },
  title: {
    fontSize: 18,
    color: '#888'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '20%',
    paddingHorizontal: 20
  }
})

export default ProductThumbnail
