import React from 'react'
import { HeaderButton } from 'react-navigation-header-buttons'
import { Ionicons } from '@expo/vector-icons'

import colors from '../../constants/colors'

const CustomHeaderButton = props => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={props.iconSize}
      color={colors.white}
    />
  )
}

export default CustomHeaderButton
