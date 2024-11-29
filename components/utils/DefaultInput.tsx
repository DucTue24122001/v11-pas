import { colors } from '@/configs/chakra-ui/color'
import { Input } from '@chakra-ui/react'
import React from 'react'

const DefaultInput = ({...props}: any) => {
  return (
    <Input _focusVisible={{outline: "none"}} h={["50px","50px","35px","35px"]}
      border={[`1px solid #fff`,`1px solid #fff`,`1px solid ${colors.default.input}`,`1px solid ${colors.default.input}`]} 
      _focus={{border: [`1px solid #fff`,`1px solid #fff`,`1px solid ${colors.default.input}`,`1px solid ${colors.default.input}`]}}
      bgColor={[colors.default.bg,colors.default.bg,colors.default.white,colors.default.white]} autoComplete="off" {...props}></Input>
  )
}

export default DefaultInput