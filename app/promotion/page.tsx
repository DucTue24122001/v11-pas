"use client"
import PromotionLayout from '@/components/promotion/PromotionLayout'
import { Box, Flex, Grid, Image, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useMemo, useState } from 'react'
import PromotionDesktopModal from '@/components/promotion/PromotionDesktopModal'
import { useDispatch, useSelector } from 'react-redux'
import PromotionMobileModal from '@/components/promotion/PromotionMobileModal'
import { useBreakpoint } from '@/constants/hooks/useBreakpoint'
import { RootState } from '@/configs/redux/store'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import ClientService from '@/helpers/ClientService'
import { Respond } from '@/constants/type'
import httpClient from '@/configs/axios/api'
import { clientAction } from '@/configs/redux/client-slice'
import { PromoEnum } from '@/constants/enum'
import { colors, shadow } from '@/configs/chakra-ui/color'
import Footer from '@/components/layouts/Footer'
import { useTenancy } from '@/configs/providers/TenancyProvider'


const Promotion = () => {
  const dispatch = useDispatch()
  const {isShowPromotionModal, currentPromoType, promotionList, promotionCheck} = useSelector((state: RootState) => state.client)
  const mobileBreakpoint = useBreakpoint(720)
  const [checkLogin, setCheckLogin] = useState(false);
  const toast = useToast()
  const router = useRouter()
  const [isLanguage, setIsLanguage] = useState("my")
  const [isLoading,setIsLoading] = useState(false)
  const tenancy = useTenancy()
  const t = useTranslations()
  console.log(tenancy);
  
  

  useEffect(() => {
    setCheckLogin(ClientService.isAuthenticated());
  });
  useEffect(() => {
    if (window !== undefined) {
      const language:any = localStorage.getItem("MY_LANGUAGE")
      setIsLanguage(language)
    }
  })

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true)
        const res: Respond = await httpClient.Promotion.getAll(
          tenancy?.tenancyName
        )
        if (res.success) {
          dispatch(clientAction.setPromoList(res.result))
        } else {
          toast({
            status: 'error',
            title: res.error.message,
          })
        }
        setIsLoading(false)
      } catch (err: any) {
        setIsLoading(false)
        console.log(err);
        // checkIsTimeoutToken(err, router)
        toast({
          status: "error",
          title: err?.response?.data?.error?.message || t('something_went_wrong'),
        })
      } finally {

      }
    })()
  }, [isLanguage, promotionCheck, tenancy])

  const selectPromo = (promo: any) => {
    if (mobileBreakpoint) {
      window.scrollTo({ 
        top: 0,
        behavior: "smooth"
      }); 
      
    }
    dispatch(clientAction.handleShowPromotionModal(true))
    dispatch(clientAction.setCurrentPromo(promo))
  }

  const filterPromo = useMemo(() => {
    if (currentPromoType === PromoEnum.ALL) {
      return promotionList
    }
    const promo = promotionList.filter((prom:any)=> prom.typeName === currentPromoType)
    if (promo) {
      return promo
    } else {
      return []
    }
  }, [currentPromoType, promotionList])

  return (
    <>
    <Flex maxW={"1400px"} mx={"auto"}>
    {((mobileBreakpoint && !isShowPromotionModal) || !mobileBreakpoint) && <PromotionLayout isLogin={checkLogin}>
      {filterPromo.length !== 0 && <Grid templateColumns={["repeat(1, 1fr)","repeat(1, 1fr)","repeat(2, 1fr)","repeat(2, 1fr)"]} pt={"10px"} pb={"30px"} px={["5px","5px","5px","5px","5px","0px"]} gap={4}>
        {filterPromo.map((promo:any, i:number) => (
          <Box key={i} boxShadow={shadow.promotion} borderRadius={10} cursor={'pointer'} onClick={() => selectPromo(promo)}>
          <Image alt={"image-1"} src={promo.urlImage} w={"100%"} borderTopLeftRadius={["5px","5px","10px","10px"]} borderTopRightRadius={["5px","5px","10px","10px"]}/>
          <Flex p={["10px 15px","10px 15px","20px 30px","20px 30px"]} bgColor={colors.default.white} flexDir={'column'} gap={["0px","0px","10px","10px"]} 
            borderBottomLeftRadius={["5px","5px","10px","10px"]} borderBottomRightRadius={["5px","5px","10px","10px"]}>
            <Text textTransform={"uppercase"} fontWeight={700} fontSize={["15px","15px","18px","18px"]} 
              color={(tenancy?.mainColor || colors.primary)}>
                {promo.name}
            </Text>
            <Text fontSize={"16px"} color={colors.default.font}>{promo.content}</Text>
          </Flex>
        </Box>
        ))}
      </Grid>}
    </PromotionLayout>}
    {!mobileBreakpoint ? <PromotionDesktopModal/> : <PromotionMobileModal/>}
    </Flex>
    {!mobileBreakpoint && <Footer/>}
    </>
  )
}

export default Promotion