import Card from '@/components/utils/Card'
import { colors } from '@/configs/chakra-ui/color'
import { Box, Flex, Text } from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import React from 'react'

const BankAccountDetail = ({bankInfo} : any) => {
  const t = useTranslations()

  return (
    <Card p={"20px 10px"} gap={5}>
        <Text fontSize={"14px"} mb={"0px"} fontWeight={"bold"}>{t('bank_info')}</Text>
        <Flex gap={"10px"} p={"10px"} display={"none"} flexDir={"column"} maxW={"400px"} bgColor={colors.default.bg}
          fontSize={"15px"} borderRadius={10}>
          <Flex>
            <Text minW={"140px"}>{t('bank_name')}</Text>
            <Text fontWeight={'bold'}>{bankInfo.bankName} ({bankInfo.bankShortName})</Text>
          </Flex>
          <Flex>
            <Text minW={"140px"}>{t('account_name')}</Text>
            <Text fontWeight={'bold'}>{bankInfo.accountName}</Text>
          </Flex>
          <Flex>
            <Text minW={"140px"}>{t('account_number')}</Text>
            <Text fontWeight={'bold'}>{bankInfo.accountNumber}</Text>
          </Flex>
        </Flex>
        <Flex flexDir={'column'} display={"flex"} fontSize={"14px"}>
          <Flex sx={resBankInfo}>
            <Text>{t('bank_name')}</Text>
            <Text>{bankInfo.bankName} ({bankInfo.bankShortName})</Text>
          </Flex>
          <Flex sx={resBankInfo}>
            <Text>{t('account_name')}</Text>
            <Text>{bankInfo.accountName}</Text>
          </Flex>
          <Flex sx={resBankInfo}>
            <Text>{t('account_number')}</Text>
            <Text>{bankInfo.accountNumber}</Text>
          </Flex>
        </Flex>
        <Box fontSize={'14px'}>
          <Text>{t('to_change')}</Text>
          <Text fontWeight={600} color={colors.primary} cursor={'pointer'}>{t('customer_support')}</Text>
        </Box>
    </Card>
  )
}

export default BankAccountDetail

const resBankInfo = {
  justifyContent: 'space-between',
  py: 4,
  borderBottom: `1px solid ${colors.default.bg}`
}