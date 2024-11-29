import { colors } from '@/configs/chakra-ui/color'
import { Text } from '@chakra-ui/react'
import React from 'react'

export const ErrorText = ({children, ...props}: any) => {
  return (
    <Text color={colors.error} fontSize={"sm"} {...props}>{children}</Text>
  )
}
export const SuccessfulText = ({children, ...props}: any) => {
  return (
    <Text color={colors.default.green} fontSize={"sm"} {...props}>{children}</Text>
  )
}

