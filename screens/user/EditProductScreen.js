import React, { useState, useEffect, useCallback } from 'react'
import { View, ScrollView, Text, StyleSheet, TextInput } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux'

import HeaderButton from '../../components/UI/HeaderButton'
import * as productsActions from '../../store/actions/products'
import colors from '../../constants/colors'

const EditProductScreen = props => {
  const prodId = props.navigation.getParam('productId')
  const editedProduct = useSelector(state =>
    state.products.userProducts.find(prod => prod.productId === prodId)
  )
  const dispatch = useDispatch()

  const [title, setTitle] = useState(
    editedProduct ? editedProduct.productName : ''
  )
  const [imageUrl, setImageUrl] = useState(
    editedProduct ? editedProduct.imageUrl : ''
  )
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState(
    editedProduct ? editedProduct.description : ''
  )

  const submitHandler = useCallback(() => {
    if (editedProduct) {
      dispatch(
        productsActions.updateProduct(prodId, title, description, imageUrl)
      )
    } else {
      dispatch(
        productsActions.createProduct(title, description, imageUrl, +price)
      )
    }
    props.navigation.goBack()
  }, [dispatch, prodId, title, description, imageUrl, price])

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler })
  }, [submitHandler])

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={text => setTitle(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={text => setImageUrl(text)}
          />
        </View>
        {editedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={text => setPrice(text)}
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={text => setDescription(text)}
          />
        </View>
      </View>
    </ScrollView>
  )
}

EditProductScreen.navigationOptions = navData => {
  const submitFn = navData.navigation.getParam('submit')
  return {
    headerTitle: navData.navigation.getParam('productId')
      ? 'Edit Product'
      : 'Add Product',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Save'
          iconName='ios-checkmark'
          color={colors.defaultPurple}
          onPress={submitFn}
          iconSize={42}
        />
      </HeaderButtons>
    )
  }
}

const styles = StyleSheet.create({
  form: {
    margin: 10
  },
  formControl: {
    width: '100%'
  },
  label: {
    fontFamily: 'roboto-bold',
    marginTop: 12,
    color: colors.textGray
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
    marginBottom: 8
  }
})

export default EditProductScreen
