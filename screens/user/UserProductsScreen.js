import React, { useState, useEffect, useCallback } from 'react'
import {
  View,
  FlatList,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { deleteProduct } from '../../store/actions/products'

// import { CustomButton } from '../../components/UI/CustomButton'
import HeaderButton from '../../components/UI/HeaderButton'
import ProductThumbnail from '../../components/shop/ProductThumbnail'
import colors from '../../constants/colors'

const UserProductsScreen = props => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const dispatch = useDispatch()
  const userProducts = useSelector(state => state.products.userProducts)

  const editProductHandler = id => {
    props.navigation.navigate('EditProduct', { productId: id })
  }

  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred!', error)
    }
  }, [error])

  const deleteHandler = useCallback(
    id => {
      setError(null)
      setIsLoading(true)
      Alert.alert('Are you sure you want to delete this item?', '', [
        { text: 'No', style: 'default' },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: async () => {
            try {
              await dispatch(deleteProduct(id))
            } catch (err) {
              setError(err.message)
            }
            setIsLoading(false)
          }
        }
      ])
    },
    [deleteHandler]
  )

  if (isLoading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size='large' color={colors.medGray} />
      </View>
    )
  }

  return (
    <FlatList
      data={userProducts}
      keyExtractor={item => item.productId}
      style={{ width: '100%', paddingHorizontal: 8 }}
      renderItem={itemData => (
        <ProductThumbnail
          image={itemData.item.imageUrl}
          title={itemData.item.productName}
          price={itemData.item.price}
          onSelect={() => {
            editProductHandler(itemData.item.productId)
          }}
        >
          <Button
            onPress={() => {
              editProductHandler(itemData.item.productId)
            }}
            title='Edit'
            color={colors.defaultPurple}
          />
          <Button
            onPress={() => {
              deleteHandler(itemData.item.productId)
            }}
            title='Delete'
            color={colors.defaultPurple}
          />
        </ProductThumbnail>
      )}
    />
  )
}

UserProductsScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Your Products',
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
          title='Add'
          iconName='ios-create'
          color={colors.defaultPurple}
          onPress={() => {
            navData.navigation.navigate('EditProduct')
          }}
          iconSize={23}
        />
      </HeaderButtons>
    )
  }
}

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default UserProductsScreen
