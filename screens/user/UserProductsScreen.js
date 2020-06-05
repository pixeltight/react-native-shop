import React from 'react'
import { FlatList, Text, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { deleteProduct } from '../../store/actions/products'

// import { CustomButton } from '../../components/UI/CustomButton'
import HeaderButton from '../../components/UI/HeaderButton'
import ProductThumbnail from '../../components/shop/ProductThumbnail'
import colors from '../../constants/colors'

const UserProductsScreen = props => {
  const dispatch = useDispatch()
  const userProducts = useSelector(state => state.products.userProducts)

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
          onSelect={() => {}}
        >
          <Button
            onPress={() => {}}
            title='Edit'
            color={colors.defaultPurple}
          />
          <Button
            onPress={() => {
              return dispatch(deleteProduct(itemData.item.productId))
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
    )
  }
}

export default UserProductsScreen
