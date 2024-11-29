import { colors } from '@/configs/chakra-ui/color'
import { Flex } from '@chakra-ui/react'
import React from 'react'

const Card = ({children, ...props}: any) => {
  return (
    <Flex w={"100%"} flexDir={'column'} bgColor={colors.default.white} borderRadius={10}  {...props}>
      {children}
    </Flex>
  )
}

export default Card