import { Box, Flex, Text } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { AccountGroupEnum, PageEnum } from '@/constants/enum'
import { useTenancy } from '@/configs/providers/TenancyProvider'
import { colors } from '@/configs/chakra-ui/color'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'

const navItem = {
  px: "15px",
  minW: "fit-content",
  cursor: "pointer",
  textTransform: "uppercase"
}

const AccountNavBar = () => {
  const tenancy = useTenancy()
  const t = useTranslations();
  const pathname = usePathname()
  const router = useRouter()

  const accountGroup = useMemo(() => {
    return checkAccountGroup(pathname)
  },[pathname])

  if (pathname.includes(PageEnum.Transaction)) return null

  return (
    <Flex h={"50px"} display={"flex"} bgColor={colors.default.bg} alignItems={'center'} fontSize={"14px"} fontWeight={'bold'} overflow={'auto'}>
      {accountGroup === AccountGroupEnum.BANK && <Flex>
      <Box sx={navItem} color={pathname.includes(PageEnum.Deposit) ? colors.primary : undefined}
        onClick={() => router.push(`${PageEnum.Deposit}`)}>
        <Text>{t('deposit')}</Text>
      </Box>
      <Box sx={navItem} color={pathname.includes(PageEnum.Withdraw) ? colors.primary : undefined}
        onClick={() => router.push(`${PageEnum.Withdraw}`)}>
        <Text >{t('withdraw')}</Text>
      </Box>
      <Box sx={navItem} color={pathname.includes(PageEnum.Record) ? colors.primary : undefined}
        onClick={() => router.push(`${PageEnum.Record}`)}>
        <Text >{t('records')}</Text>
      </Box>
      </Flex>}
      {accountGroup === AccountGroupEnum.USER && <Flex>
      <Box sx={navItem} color={pathname.includes(PageEnum.Profile) ? colors.primary : undefined}
        onClick={() => router.push(`${PageEnum.Profile}`)}>
        <Text >{t('profile')}</Text>
      </Box>
      <Box sx={navItem} color={pathname.includes(PageEnum.ChangePass) ? colors.primary : undefined}
        onClick={() => router.push(`${PageEnum.ChangePass}`)}>
        <Text>{t('change_password')}</Text>
      </Box>
      <Box sx={navItem} color={pathname.includes(PageEnum.BankAccount) ? colors.primary : undefined}
        onClick={() => router.push(`${PageEnum.BankAccount}`)}>
        <Text>{t('bank_account')}</Text>
      </Box>
      </Flex>}
      {accountGroup === AccountGroupEnum.MESSAGE && 
      <Flex w={"100%"} justifyContent={'space-around'}>
        <Box sx={navItem} color={pathname.includes(PageEnum.Inbox) ? colors.primary : undefined}
        onClick={() => router.push(`${PageEnum.Inbox}`)}>
          <Text>{t('inbox')}</Text>
        </Box>
        <Box sx={navItem} color={pathname.includes(PageEnum.Announce) ? colors.primary : undefined}
        onClick={() => router.push(`${PageEnum.Announce}`)}>
          <Text>{t('announcement')}</Text>
        </Box>
      </Flex>}
      {accountGroup === AccountGroupEnum.VIP && 
      <Flex>
        <Box sx={navItem} color={pathname.includes(PageEnum.Vip) ? colors.primary : undefined}
        onClick={() => router.push(`${PageEnum.Vip}`)}>
          <Text>Vip</Text>
        </Box>
        <Box sx={navItem} color={pathname.includes(PageEnum.Affiliate) ? colors.primary : undefined}
        onClick={() => router.push(`${PageEnum.Affiliate}`)}>
          <Text>Affiliate</Text>
        </Box>
        <Box sx={navItem} color={pathname.includes(PageEnum.Downline) ? colors.primary : undefined}
        onClick={() => router.push(`${PageEnum.Downline}`)}>
          <Text>Downline</Text>
        </Box>
      </Flex>}
    </Flex>
  )
}

export default AccountNavBar

export const checkAccountGroup = (pathname: string) => {
  const paramsList = pathname.split("/");
  switch (true) {
    case paramsList.some((el: any) => el === PageEnum.Deposit):
      return AccountGroupEnum.BANK;
    case paramsList.some((el: any) => el === PageEnum.Withdraw):
      return AccountGroupEnum.BANK;
    case paramsList.some((el: any) => el === PageEnum.Record):
      return AccountGroupEnum.BANK;
    case paramsList.some((el: any) => el === PageEnum.Profile):
      return AccountGroupEnum.USER;
    case paramsList.some((el: any) => el === PageEnum.BankAccount):
      return AccountGroupEnum.USER;
    case paramsList.some((el: any) => el === PageEnum.ChangePass):
      return AccountGroupEnum.USER;
    case paramsList.some((el: any) => el === PageEnum.Inbox):
      return AccountGroupEnum.MESSAGE;
    case paramsList.some((el: any) => el === PageEnum.Announce):
      return AccountGroupEnum.MESSAGE;
    case paramsList.some((el: any) => el === PageEnum.Vip):
      return AccountGroupEnum.VIP;
    case paramsList.some((el: any) => el === PageEnum.Affiliate):
      return AccountGroupEnum.VIP;
    case paramsList.some((el: any) => el === PageEnum.Downline):
      return AccountGroupEnum.VIP;
  }
};
