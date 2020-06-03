import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import colors from '../constants/colors'

const CustomButton = props => {
  return (
    <TouchableOpacity onPress={props.onButtonPress}>
      <View style={{ ...styles.button, ...props.containerStyle }}>
        <Text style={{ ...styles.buttonText, ...props.textStyle }}>
          {props.children}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {},
  buttonText: {
    fontFamily: 'roboto-regular',
    fontSize: 14,
    color: colors.defaultPurple
  }
})

export default CustomButton
