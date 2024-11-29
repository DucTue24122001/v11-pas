/* eslint-disable react/no-unescaped-entities */
import { Center, Text } from '@chakra-ui/react'
import React from 'react'

const NotFoundPage = () => {
  return (
    <Center h={"100dvh"} gap={5}>
      <Text color={"#344050"} fontSize={"0.8333333333rem"} fontWeight={600} fontFamily={`"Poppins", sans-serif`}>
        404
      </Text>
      <Text>The page you're looking for is not found.</Text>
    </Center>
  )
}

export default NotFoundPage