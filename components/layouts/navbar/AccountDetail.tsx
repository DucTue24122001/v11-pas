import { colors } from '@/configs/chakra-ui/color'
import { useCheckTokenProvider } from '@/configs/providers/CheckTokenProvider'
import { useTenancy } from '@/configs/providers/TenancyProvider'
import { useBreakpoint } from '@/configs/providers/ViewportProvider'
import { clientAction } from '@/configs/redux/client-slice'
import { convertDecimalNum } from '@/helpers/functions'
import { HamburgerIcon } from '@chakra-ui/icons'
import { Box, Center, Text } from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import React from 'react'
import { useDispatch } from 'react-redux'
import ImageLanguage from '../ImageLanguage'
import ClientService from '@/helpers/ClientService'
import { useRouter } from 'next/navigation'

const AccountDetail = () => {
  const tenancy = useTenancy()
  const accountStatus = useCheckTokenProvider()
  const dispatch = useDispatch()
  const isBreakpoint = useBreakpoint()
  const t = useTranslations()
  const router = useRouter()

  return (
    <Center gap={3}>
      <Box>
        <Text whiteSpace={"nowrap"}>{accountStatus?.name}</Text>
        <Text whiteSpace={"nowrap"}>
          {tenancy?.currency}: <span style={{color: colors.default.success}}>{convertDecimalNum(accountStatus?.balance)}</span>
        </Text>
      </Box>
      {isBreakpoint ? <HamburgerIcon
        sx={hamburgerIco} 
        onClick={() => dispatch(clientAction.handleShowMenu(true))}/> :
        <>
          <Box sx={button} border={"1px solid rgba(255,255,255,.2)"} ml={"1.025641vw"} 
            onClick={() => {
              ClientService.logout();
              router.push("/"); 
            }}>
            {t('logout')}
          </Box>
          <ImageLanguage ml={"1.025641vw"}/>
        </>}
    </Center>
  )
}

export default AccountDetail

const hamburgerIco = {
  fontSize:"25px",
  cursor:'pointer', 
}

const button = {
  borderRadius:"5.128205vw",
  p:[".512821vw 4.102564vw",".512821vw 4.102564vw",".512821vw 20px",".512821vw 20px"],
  color:"#fff",
  cursor: "pointer",
}