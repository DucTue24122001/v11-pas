"use client"
import { Flex } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'next/navigation'
import AccountNavBar from './AccountNavBar'
import { accountAction } from '@/configs/redux/account-slice'
import { colors } from '@/configs/chakra-ui/color'
import LeftMenu from '@/components/layouts/LeftMenu'
import { useBreakpoint } from '@/constants/hooks/useBreakpoint'

const AccountLayout = ({children}: any) => {
  const dispatch = useDispatch()
  const params = useParams()
  const isBreakpoint = useBreakpoint(900)
  
  useEffect(() => {
    dispatch(accountAction.setCurrentMailRead(null))
  }, [params, dispatch])

  return (
    <>
    {isBreakpoint ? 
    <Flex flexDir={'column'} w={"100%"} color={colors.secondary}>
      <AccountNavBar />
      <Flex mx={'auto'} minH={'90vh'} gap={5} w={"100%"} pb={"80px"}>
        <Flex flexDir={'column'} w={"inherit"} gap={2} >
          {children}
        </Flex>
      </Flex>
    </Flex>
    :
    <Flex justifyContent={"center"} h={"fit-content"} alignItems={"center"} mt={10}>
      <Flex gap={10} pb={"80px"} >
          <LeftMenu />
          <Flex mx={'auto'} minH={'90vh'} gap={5} w={"100%"} pb={"80px"}>
            <Flex flexDir={'column'} w={"1200px"} gap={2} >
              {children}
            </Flex>
          </Flex>
      </Flex>
    </Flex>
    }
    </>
  )
}

export default AccountLayout