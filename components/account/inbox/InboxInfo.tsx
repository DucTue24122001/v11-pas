import { accountAction } from '@/configs/redux/account-slice'
import { RootState } from '@/configs/redux/store'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import { Box, Center, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const InboxInfo = () => {
  const {currentMailRead}: any = useSelector((state: RootState) => state.account)
  const dispatch = useDispatch()
  
  return (
    <>
      <Box>
        <Flex minH={"50px"} alignItems={'center'} borderBottom={"1px solid #d9dee4"} w={"100%"}>
          <Center cursor={'pointer'} onClick={() => dispatch(accountAction.setCurrentMailRead(null))}>
            <ChevronLeftIcon fontSize={20} color={"rgba(48,48,48,.54)"}/>
            <Text ml={"5px"} fontSize={16} fontWeight={700}>{currentMailRead.subject}</Text>
          </Center>
        </Flex>
        <Box p={"20px 5px"}>
          <Text>{currentMailRead.body}</Text>
        </Box>
      </Box>
    </>
  )
}

export default InboxInfo