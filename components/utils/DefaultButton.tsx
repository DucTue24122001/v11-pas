import { colors } from '@/configs/chakra-ui/color'
import { Button } from '@chakra-ui/react'
import React from 'react'

const DefaultButton = ({children, ...props}: any) => {
  return (
    <Button _focusVisible={{outline: "none"}} w={"100%"} h={["50px","50px","50px","40px","40px"]} fontSize={"15px"} 
      bg={!props.colorScheme && colors.primaryBg} 
      color={"#fff"}
      _hover={{filter: "brightness(85%)"}} transition={".3s"}
      {...props}>
      {children}
    </Button>
  )
}

export default DefaultButton