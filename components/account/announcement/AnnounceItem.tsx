import { colors } from '@/configs/chakra-ui/color';
import { Flex, Text } from '@chakra-ui/react'
import moment from 'moment';
import React from 'react'

const AnnounceItem = ({data} : any) => {
  
  return (
    <Flex p={"20px 10px"} gap={"5px"} flexDir={'column'}  borderBottom={`1px solid ${colors.default.table}`}>
      <Flex justifyContent={'space-between'} w={"100%"}>
        <Text fontWeight={600}>{data?.title}</Text>
        <Text>{moment(new Date(data.startTime)).format("MMMM DD")}</Text>
      </Flex>
      <Text>{data?.body}</Text>
    </Flex>
  )
}

export default AnnounceItem