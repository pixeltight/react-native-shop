import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import colors from '../constants/colors'

const CustomButton = props => {
  return (
    <TouchableOpacity onPress={props.onButtonPress}>
      <View style={{ ...styles.button, ...props.style }}></View>
      <Text style={{ ...styles.buttonText, ...props.textStyling }}>
        {props.children}
      </Text>
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
