"use client"
import PromotionLayout from '@/components/promotion/PromotionLayout'
import PromotionModal from '@/components/promotion/PromotionModal'
import httpClient from '@/configs/axios/api'
import { colors, shadow } from '@/configs/chakra-ui/color'
import { useTenancy } from '@/configs/providers/TenancyProvider'
import { clientAction } from '@/configs/redux/client-slice'
import { RootState } from '@/configs/redux/store'
import { PromoEnum } from '@/constants/enum'
import { Respond, TPromotion } from '@/constants/type'
import { getCookie } from '@/helpers/functions'
import { Box, Flex, Grid, Image, Spinner, Text, useToast } from '@chakra-ui/react'
import { useLocale, useTranslations } from 'next-intl'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Promotion = () => {
  const local = useLocale()
  const tenancy = useTenancy()
  const dispatch = useDispatch()
  const toast = useToast()
  const t = useTranslations()
  const {promotionCheck, currentPromoType, promotionList} = useSelector((state: RootState) => state.client)
  const [isFetching, setIsFetching] = useState(false)

  const selectPromo = (promo: TPromotion) => {
    dispatch(clientAction.handleShowPromotionModal(true))
    dispatch(clientAction.setCurrentPromo(promo))
  }

  useEffect(() => {
    (async () => {
      try {
        setIsFetching(true)
        const res: Respond = await httpClient.Promotion.getAll(tenancy?.tenancyName)
        if (res.success) {
          dispatch(clientAction.setPromoList((res.result)))
        } else {
          toast({
            status: 'error',
            title: res.error.message,
          })
        }
        setIsFetching(false)
      } catch (err: any) {
        setIsFetching(false)
        console.log(err);
        toast({
          status: "error",
          title: err?.response?.data?.error?.message || t('something_went_wrong'),
        })
      } finally {

      }
    })()
  }, [local, promotionCheck])

  const filterPromo = useMemo(() => {
    if (currentPromoType === PromoEnum.ALL) {
      return promotionList
    }
    const promo = promotionList.filter(prom => prom?.typeName === currentPromoType)
    if (promo) {
      return promo
    } else {
      return []
    }
  }, [currentPromoType, promotionList])

  return (
    <Box>
      <PromotionLayout>
        <Grid templateColumns={"repeat(1, 1fr)"} pt={"10px"} pb={"30px"} px={"5px"} gap={4}>
          {filterPromo.map((promo, i) => (
            <Box key={i} boxShadow={shadow.promotion} borderRadius={10} cursor={'pointer'} 
              onClick={() => selectPromo(promo)}>
              <Image alt={"image-1"} src={promo?.urlImage} w={"100%"} borderTopLeftRadius={"5px"} 
                borderTopRightRadius={"5px"}/>
              <Flex p={"10px 15px"} bgColor={colors.default.white} flexDir={'column'} gap={"0px"} 
                borderBottomLeftRadius={"5px"} borderBottomRightRadius={"5px"}>
                <Text textTransform={"uppercase"} fontWeight={700} fontSize={"15px"} 
                  color={colors.primary}>
                    {promo?.name}
                </Text>
                <Text fontSize={"16px"} color={colors.default.font}>{promo?.content}</Text>
              </Flex>
            </Box>
          ))}
        </Grid>
        {isFetching && <Spinner alignSelf={'center'} mt={"10px"} color={colors.primary}/>}
        <PromotionModal/>
      </PromotionLayout>
    </Box>
  )
}

export default Promotion
