import { colors } from '@/configs/chakra-ui/color';
import { Flex } from '@chakra-ui/react'
import React from 'react'

export const PaymentOption = ({children, ...props}: any) => {
  return (
      <Flex px={"14px"} flexDir={"column"} maxH={"100%"} cursor={'pointer'}
          gap={"6px"} borderRadius={3} bgColor={colors.default.white}
          transition={".3s"} minW={"100px"}
          alignItems={'center'} justifyContent={'center'} color={colors.default.footer} fontWeight={"bold"} 
          fontSize={"12px"} {...props}>
          {children}
      </Flex>
  )
}

export const PaymentList = ({children, ...props} : any) => {
  return (
    <Flex minH={"75px"} px={2} gap={3} bgColor={colors.default.bg} pb={3} 
      minW={"fit-content"} className='payment_list' {...props}>
      {children}
    </Flex>
  )
}