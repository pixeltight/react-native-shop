import React, { useState } from 'react'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'
import { enableScreens } from 'react-native-screens'

import ProductsNavigator from './navigation/ProductsNavigator'
import productsReducer from './store/reducers/products'

enableScreens()

const rootReducer = combineReducers({
  products: productsReducer
})

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const fetchFonts = () =>
  Font.loadAsync({
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf')
  })

export default function App () {
  const [fontLoaded, setFontLoaded] = useState(false)

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    )
  }

  return (
    <Provider store={store}>
      <ProductsNavigator />
    </Provider>
  )
}
