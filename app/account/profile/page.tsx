"use client"
import Card from '@/components/utils/Card'
import CopyButton from '@/components/utils/CopyButton'
import { useCheckTokenProvider } from '@/configs/providers/CheckTokenProvider'
import { Box, Center, Flex, Text } from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import React from 'react'

const Profile = () => {
  const accountDetail = useCheckTokenProvider()
  const t = useTranslations()

  return (
    <>
      <Card p={["20px 10px","20px 10px","30px 50px","30px 50px"]}>
        <Text sx={profileItem} fontSize={["16px","16px","24px","24px"]} fontWeight={'bold'}>{t('personal_info')}</Text>
        <Box fontSize={[14,14,16,16]}>
        <Flex sx={profileItem}>
          <Text minW={["170px","170px","300px","300px"]}>{t('full_name')}</Text>
          <Text>{accountDetail?.name}</Text>
        </Flex>
        <Flex sx={profileItem}>
          <Text minW={["170px","170px","300px","300px"]}>{t('username')}</Text>
          <Text>{accountDetail?.userName}</Text>
        </Flex>
        <Flex sx={profileItem}>
          <Text minW={["170px","170px","300px","300px"]}>ID</Text>
          <Text>{accountDetail?.surName}</Text>
        </Flex>
        <Flex sx={profileItem}>
          <Text minW={["170px","170px","300px","300px"]}>{t('mobile')}</Text>
          <Text>{accountDetail?.phoneNumber}</Text>
        </Flex>
        <Flex sx={profileItem} alignItems={'center'}>
          <Text minW={["170px","170px","300px","300px"]}>{t('referral_code')}</Text>
          <Center gap={5} flexWrap={"wrap"}>
            <Text>{accountDetail?.referralCode}</Text>
            <CopyButton h={"30px"} copyText={accountDetail?.referralCode}/>
          </Center>
        </Flex>
        </Box>
      </Card>
    </>
  )
}

export default Profile

const profileItem = {
  py: [4,4,3,3],
  borderBottom: [`1px solid #f2f5f9`,`1px solid #f2f5f9`,"none","none"]
}