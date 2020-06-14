import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

import colors from '../../constants/colors'
import Card from '../UI/Card'

const ProductThumbnail = props => {
  return (
    <Card style={styles.thumbnailContainer}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={props.onSelect} activeOpacity={0.5}>
          <Image source={{ uri: props.image }} style={styles.image} />
        </TouchableOpacity>
      </View>
      <View style={styles.details}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.price}>${props.price.toFixed(2)}</Text>
      </View>
      <View style={styles.actions}>{props.children}</View>
    </Card>
  )
}

const styles = StyleSheet.create({
  thumbnailContainer: {
    width: '100%',
    marginTop: 20,
    borderRadius: 10,
    height: 250
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
    color: colors.darkGray,
    fontFamily: 'roboto-bold'
  },
  price: {
    fontSize: 14,
    color: colors.textGray,
    fontFamily: 'roboto-regular'
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
