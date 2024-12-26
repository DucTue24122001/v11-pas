import { Center, Flex, InputGroup, InputLeftElement, Text } from '@chakra-ui/react'
import React from 'react'
import { SearchIcon } from '@chakra-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslations } from 'next-intl'
import { RootState } from '@/configs/redux/store'
import { useTenancy } from '@/configs/providers/TenancyProvider'
import { colors } from '@/configs/chakra-ui/color'
import { PromoEnum } from '@/constants/enum'
import { clientAction } from '@/configs/redux/client-slice'
import DefaultInput from '../utils/DefaultInput'

const PromotionNavDesktop = () => {
  const dispatch = useDispatch()
  const {currentPromoType, allPromoType} = useSelector((state: RootState) => state.client)
  const t = useTranslations()
  const tenancy = useTenancy()

  return (
    <Flex mt={"30px"} mb={"10px"} justifyContent={'space-between'} alignItems={'center'} display={["none","none","flex","flex"]} px={["5px","5px","5px","5px","5px","0px"]}>
      <Flex bgColor={colors.default.white} borderRadius={"10px"}>
        <Center sx={navItem} onClick={() => dispatch(clientAction.setCurrentPromotionType(PromoEnum.ALL))}
            border={currentPromoType === PromoEnum.ALL ? `1px solid ${tenancy?.mainColor || colors.primary}` : `1px solid ${colors.default.white}`} 
            pos={"relative"}>
            <Text w={"100%"} textAlign={'center'} borderRight={"1px solid #e7e7e7"}
              color={currentPromoType === PromoEnum.ALL ? (tenancy?.mainColor || colors.primary) : colors.default.font}>
              {t("all")}
            </Text>
          </Center>
        {allPromoType.map((type, i) => {
          return <Center sx={navItem} key={i} onClick={() => dispatch(clientAction.setCurrentPromotionType(type))}
            border={currentPromoType === type ? `1px solid ${tenancy?.mainColor || colors.primary}` : `1px solid ${colors.default.white}`} 
            pos={"relative"}>
            <Text w={"100%"} textAlign={'center'} borderRight={i !== (allPromoType.length - 1) ? "1px solid #e7e7e7" : "none"}
              color={currentPromoType === type ? (tenancy?.mainColor || colors.primary) : colors.default.font}>
              {type}
            </Text>
          </Center>
          })}
      </Flex>
      <InputGroup h={"40px"} w={"250px"}>
        <InputLeftElement color={"gray"}>
          <SearchIcon />
        </InputLeftElement>
        <DefaultInput pl={9} h={"100%"} placeholder={t('search')}/>
      </InputGroup>
    </Flex>
  )
}

export default PromotionNavDesktop

export const promotionItemDummy = [
  {name: "all", value: PromoEnum.ALL},
  {name: "welcome_bonus", value: PromoEnum.WELCOME},
  {name: "deposit", value: PromoEnum.DEPOSIT},
  // {name: "Reward", value: PromoEnum.REWARD},
]

const navItem = {
  borderRadius: "10px",
  textTransform: "uppercase",
  h: "45px",
  w: "180px",
  fontSize: "14px",
  transition: "all .3s",
  fontWeight: "700",
  cursor: "pointer",
  letterSpacing: "1.5px",
  _hover: {
    bgColor: "#f9f9f9"
  }
}