import { colors } from '@/configs/chakra-ui/color'
import { ChakraProps, Select, SelectProps } from '@chakra-ui/react'
import React from 'react'

type TDefaultSelect = SelectProps & {
  children?: React.ReactNode
}


const DefaultSelect = ({children, ...props}: TDefaultSelect) => {
  return (
    <Select _focusVisible={{outline: "none"}} h={["50px","50px","35px","35px"]}
      border={[`1px solid ${colors.default.white}`,`1px solid ${colors.default.white}`,`1px solid ${colors.default.input}`,`1px solid ${colors.default.input}`]} 
      _focus={{border: [`1px solid ${colors.default.white}`,`1px solid ${colors.default.white}`,`1px solid ${colors.default.input}`,`1px solid ${colors.default.input}`]}}
      bgColor={[colors.default.bg,colors.default.bg,colors.default.white,colors.default.white]}
      {...props}
      >
      {children}
    </Select>
  )
}

export default DefaultSelect