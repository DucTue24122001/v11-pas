import { Box, Center, Flex, Image, Text } from '@chakra-ui/react'
import diamondVip from "@/public/images/06_Diamond.png"
import premierVip from "@/public/images/01_Premier.png"
import bronzeVip from "@/public/images/02_Bronze.png"
import silverVip from "@/public/images/03_Silver.png"
import goldVip from "@/public/images/04_Gold.png"
import platinumVip from "@/public/images/05_Platinium.png"
import chairmanVip from "@/public/images/07_Chairman.png"
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/configs/redux/store'
import { useTranslations } from 'next-intl'
import { colors } from '@/configs/chakra-ui/color'
import { numberWithCommas } from '@/helpers/functions'
import { VipLevel } from '@/constants/enum'

const VipInfo = () => {
  const {accountVipDetail} = useSelector((state: RootState) => state.account)
  const t = useTranslations();

  return (
    <>
    <Center flexDir={'column'}>
      <Box pos={'relative'}>
        <Image alt='vip' src={VipImage(accountVipDetail?.currentLevelName)} maxH={"190px"}/>
        <Box color={colors.vip.other} pos={'absolute'} bottom={5} left={5}
          fontSize={15} fontWeight={700} textTransform={"uppercase"}>
          <Text>{accountVipDetail?.username}</Text>
          <Text fontSize={12.5}>ID {accountVipDetail?.userId}</Text>
        </Box>
      </Box>
    </Center>
    <Box w={"100%"} mt={2}>
      <Text textTransform={'uppercase'} fontWeight={700} fontSize={14}
        color={colors.default.gray}>{accountVipDetail?.status ? t("vip_point") : t("turnover")}</Text>
    </Box>
    <Flex w={"100%"} justifyContent={'space-between'}>
      <Text fontSize={28} fontWeight={700}>{accountVipDetail?.status ? numberWithCommas(accountVipDetail?.points) : numberWithCommas(accountVipDetail?.turnover)}</Text>
      <Flex flexDir={'column'}>
        <Text alignSelf={'flex-end'}>{accountVipDetail?.status ? numberWithCommas(accountVipDetail?.nextLevelPoint) : numberWithCommas(accountVipDetail?.nextLevelWinloss)}</Text>
        {accountVipDetail?.nextLevelPoint && <Text>{t("required_in_total")}</Text>}
      </Flex>
    </Flex>
    <Box w={'90%'} h={3} background={"rgba(0, 0, 0, 0.1)"} borderRadius={50}>
      {accountVipDetail && <Box 
        w={((accountVipDetail?.status ? accountVipDetail?.points : accountVipDetail?.turnover) / (accountVipDetail?.status ? accountVipDetail?.nextLevelPoint : accountVipDetail?.nextLevelWinloss) * 100) >= 100 ? 
          "100%" : 
          ((accountVipDetail?.status ? accountVipDetail?.points : accountVipDetail?.turnover) / (accountVipDetail?.status ? accountVipDetail?.nextLevelPoint : accountVipDetail?.nextLevelWinloss) * 100) + "%"} 
          h={'100%'} background={colors.primary} borderRadius={50}/>}
    </Box>
    {accountVipDetail?.nextLevelName && <Text color={colors.primary} fontSize={14}>{t("next_level")}, {accountVipDetail?.nextLevelName} Club</Text>}
    </>
  )
}

const VipImage = (rank: undefined | string) => {
  
  if (rank) {
    switch (rank.toLowerCase()) {
      case VipLevel.PREMIER:
        return premierVip.src
      case VipLevel.BRONZE:
        return bronzeVip.src
      case VipLevel.SILVER:
        return silverVip.src
      case VipLevel.GOLD:
        return goldVip.src
      case VipLevel.PLATINUM:
        return platinumVip.src
      case VipLevel.DIAMOND:
        return diamondVip.src
      case VipLevel.CHAIRMAN:
        return chairmanVip.src
      default :
        return premierVip.src
    }
  } else {
    return premierVip.src
  }
}

export default VipInfo