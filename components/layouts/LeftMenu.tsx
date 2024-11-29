"use client"
import React from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { RootState } from '@/configs/redux/store'
import { useTenancy } from '@/configs/providers/TenancyProvider'
import { useTranslations } from 'next-intl'
import { colors } from '@/configs/chakra-ui/color'
import { PageEnum } from '@/constants/enum'
import { checkCurrentRouter } from '@/constants/hooks/checkCurrentRouter'
import { usePathname, useRouter } from 'next/navigation'

const LeftMenu = () => {
  const {accountDetail} = useSelector((state: RootState) => state.account)
  const tenancy = useTenancy()
  const router = useRouter()
  const pathname = usePathname()
  const currentRouter = checkCurrentRouter(pathname)
  const t = useTranslations()

  const focusMenuItem = {
    ...menuItem,
    color: colors.default.white,
    borderRadius: 5,
    // bg: (tenancy?.mainColor || colors.primaryBg),
    bg:colors.primaryBg,
    _hover: {bgColor: tenancy?.mainColor}
  }
  
  return (
    <Box minW={"250px"} bgColor={colors.default.white} display={["none","none","none","block"]} color={colors.secondary} fontWeight={'600'} py={"30px"} borderRadius={10} h={'fit-content'}>
        <Text sx={menuHeading} textTransform={"uppercase"}>{t('banking')}</Text>
          <Flex flexDir={"column"}>
            <Box onClick={() => router.push(`/${PageEnum.Account}/${PageEnum.Deposit}`)} sx={currentRouter === PageEnum.Deposit ? focusMenuItem : menuItem}>
              <Text>{t('deposit')}</Text>
            </Box>
            <Box onClick={() => router.push(`/${PageEnum.Account}/${PageEnum.Withdraw}`)} sx={currentRouter === PageEnum.Withdraw ? focusMenuItem : menuItem}>
              <Text>{t('withdraw')}</Text>
            </Box>
            <Box onClick={() => router.push(`/${PageEnum.Account}/${PageEnum.BankAccount}`)} sx={currentRouter === PageEnum.BankAccount ? focusMenuItem : menuItem}>
              <Text>{t('bank_account')}</Text>
            </Box>
            <Box onClick={() => router.push(`/${PageEnum.Account}/${PageEnum.Record}`)} sx={currentRouter === PageEnum.Record ? focusMenuItem : menuItem}>
              <Text>{t('records')}</Text>
            </Box>
          </Flex>
          <Text sx={menuHeading} textTransform={"uppercase"} mt={"30px"}>{t('user_account')}</Text>
          <Flex flexDir={"column"} fontSize={"16px"} color={colors.default.gray}>
            <Box onClick={() => router.push(`/${PageEnum.Account}/${PageEnum.Profile}`)} sx={currentRouter === PageEnum.Profile ? focusMenuItem : menuItem}>
              <Text>{t('profile')}</Text>
            </Box>
            <Box onClick={() => router.push(`/${PageEnum.Account}/${PageEnum.Inbox}`)} sx={currentRouter === PageEnum.Inbox ? focusMenuItem : menuItem}>
              <Text>{t('inbox')}</Text>
            </Box>
            <Box onClick={() => router.push(`/${PageEnum.Account}/${PageEnum.Announce}`)} sx={currentRouter === PageEnum.Announce ? focusMenuItem : menuItem}>
              <Text>{t('announcement')}</Text>
            </Box>
            <Box onClick={() => router.push(`/${PageEnum.Account}/${PageEnum.ChangePass}`)} sx={currentRouter === PageEnum.ChangePass ? focusMenuItem : menuItem}>
              <Text>{t('change_password')}</Text>
            </Box>
          </Flex>
          <Text sx={menuHeading} textTransform={"uppercase"} mt={"30px"}>{t("reward")}</Text>
          <Flex flexDir={"column"} fontSize={"16px"} color={colors.default.gray}>
            <Box onClick={() => router.push(`/${PageEnum.Account}/${PageEnum.Vip}`)} sx={pathname.includes(PageEnum.Vip) ? focusMenuItem : menuItem}>
              <Text>{t("vip")}</Text>
            </Box>
            <Box onClick={() => router.push(`/${PageEnum.Account}/${PageEnum.Affiliate}`)} sx={pathname.includes(PageEnum.Affiliate) ? focusMenuItem : menuItem}>
              <Text>{t("affiliate")}</Text>
            </Box>
            <Box onClick={() => router.push(`/${PageEnum.Account}/${PageEnum.Downline}`)} sx={pathname.includes(PageEnum.Downline) ? focusMenuItem : menuItem}>
              <Text>{t("downline")}</Text>
            </Box>
          </Flex>
        </Box>
  )
}

const menuItem = {
  p: "10px 40px",
  color: colors.default.gray,
  fontSize: "16px",
  cursor: "pointer",
  transition: ".3s",
  _hover: {bgColor: "#f9f9f9"}
}

const menuHeading = {
  fontSize: "20px",
  mb: "10px",
  fontWeight: 700,
  p: "10px 30px",
}

export default LeftMenu