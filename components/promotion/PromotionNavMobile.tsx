import { colors } from '@/configs/chakra-ui/color'
import { useTenancy } from '@/configs/providers/TenancyProvider'
import { clientAction } from '@/configs/redux/client-slice'
import { RootState } from '@/configs/redux/store'
import { PromoEnum } from '@/constants/enum'
import { Box, Flex, Text } from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'


const PromotionNavMobile = () => {
  const dispatch = useDispatch()
  const {currentPromoType, allPromoType} = useSelector((state: RootState) => state.client)
  const t = useTranslations()
  const tenancy = useTenancy()

  return (
    <Flex h={"50px"} bgColor={colors.default.bg} display={["flex","flex","none","none"]} alignItems={'center'} fontSize={"14px"}
      overflow={"auto"}>
        <Box sx={navItem} onClick={() => dispatch(clientAction.setCurrentPromotionType(PromoEnum.ALL))}
          color={currentPromoType === PromoEnum.ALL ? (tenancy?.mainColor || colors.primary) : colors.default.font} pos={"relative"}>
          <Text>{t('all')}</Text>
        </Box>
      {allPromoType.map((type, i) =>{
          return <Box sx={navItem} key={i} onClick={() => dispatch(clientAction.setCurrentPromotionType(type))}
          color={currentPromoType === type ? (tenancy?.mainColor || colors.primary) : colors.default.font} pos={"relative"}>
          <Text>{type}</Text>
        </Box>
      })}
    </Flex>
  )
}

export default PromotionNavMobile

const navItem = {
  px: "15px",
  minW: "fit-content",
  cursor: "pointer",
  textTransform: "uppercase",
  fontWeight: 700
}