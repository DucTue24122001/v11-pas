import { colors } from '@/configs/chakra-ui/color'
import { clientAction } from '@/configs/redux/client-slice'
import { RootState } from '@/configs/redux/store'
import { PromoEnum } from '@/constants/enum'
import { Box, Flex, Text } from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

type TPromotionLayoutProps = {
  children: React.ReactNode
}

const PromotionLayout = ({children, ...props}: TPromotionLayoutProps) => {
  const {allPromoType, currentPromoType} = useSelector((state: RootState) => state.client)
  const dispatch = useDispatch()
  const t = useTranslations()

  return (
    <Flex w={"100%"}
      minH={"90vh"}
      mb={"60px"}
      overflow={"hidden"}
      flexDir={"column"} {...props}>
      <Flex h={"50px"} bgColor={colors.default.bg} display={"flex"} alignItems={'center'} fontSize={"14px"}
        overflow={"auto"}>
          <Box sx={navItem} onClick={() => dispatch(clientAction.setCurrentPromotionType(PromoEnum.ALL))}
            color={currentPromoType === PromoEnum.ALL ? colors.primary : colors.default.font} pos={"relative"}>
            <Text>{t('all')}</Text>
          </Box>
          {allPromoType.map((type, i) =>{
            return <Box sx={navItem} key={i} onClick={() => dispatch(clientAction.setCurrentPromotionType(type))}
            color={currentPromoType === type ? colors.primary : colors.default.font} pos={"relative"}>
            <Text>{type}</Text>
          </Box>
          })}
      </Flex>
      <Flex className='layout' flexDir={"column"} h={"inherit"} w={"100%"}>
        {children}
      </Flex>
    </Flex>
  )
}

export default PromotionLayout

const navItem = {
  px: "15px",
  minW: "fit-content",
  cursor: "pointer",
  textTransform: "uppercase",
  fontWeight: 700
}