import React, { useEffect, useCallback, useReducer } from 'react'
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView
} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux'

import HeaderButton from '../../components/UI/HeaderButton'
import * as productsActions from '../../store/actions/products'
import Input from '../../components/UI/Input'
import colors from '../../constants/colors'

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    }
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    }
    let updatedFormIsValid = true
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValues: updatedValues,
      inputValidities: updatedValidities
    }
  }
  return state
}

const EditProductScreen = props => {
  const prodId = props.navigation.getParam('productId')
  const editedProduct = useSelector(state =>
    state.products.userProducts.find(prod => prod.productId === prodId)
  )
  const dispatch = useDispatch()

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.productName : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      description: editedProduct ? editedProduct.description : '',
      price: ''
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false
    },
    formIsValid: editedProduct ? true : false
  })

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert('Invalid Form values', 'Please check errors')
      return
    }
    if (editedProduct) {
      dispatch(
        productsActions.updateProduct(
          prodId,
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl
        )
      )
    } else {
      dispatch(
        productsActions.createProduct(
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl,
          +formState.inputValues.price
        )
      )
    }
    props.navigation.goBack()
  }, [dispatch, prodId, formState])

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler })
  }, [submitHandler])

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue, // text that was entered
        isValid: inputValidity,
        input: inputIdentifier
      })
    },
    [dispatchFormState]
  )

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior='padding'
      keyboardVerticalOffset={80}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id='title'
            keyboardType='default'
            label='Title'
            errorText='Please enter a valid title'
            returnKeyType='next'
            autoCorrect
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.productName : ''}
            initiallyValid={!!editedProduct}
            required
          />
          <Input
            id='imageUrl'
            label='Image Url'
            errorText='Please enter a valid image url'
            keyboardType='default'
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.imageUrl : ''}
            initiallyValid={!!editedProduct}
            required
          />
          {editedProduct ? null : (
            <Input
              id='price'
              label='Price'
              errorText='Please enter a valid price'
              keyboardType='decimal-pad'
              returnKeyType='next'
              onInputChange={inputChangeHandler}
              required
              min={0.1}
            />
          )}
          <Input
            id='description'
            label='Description'
            errorText='Please enter a valid description'
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.description : ''}
            initiallyValid={!!editedProduct}
            required
            minLength={5}
            blurOnSubmit
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  }
})

export default EditProductScreen
