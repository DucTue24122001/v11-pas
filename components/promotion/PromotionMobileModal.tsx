import { Box, Center, Flex, Image, Link, ListItem, OrderedList, Spinner, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useTenancy } from '@/configs/providers/TenancyProvider'
import ClientService from '@/helpers/ClientService'
import { numberWithCommas, toNormalNum } from '@/helpers/functions'
import { Respond } from '@/constants/type'
import httpClient from '@/configs/axios/api'
import { clientAction } from '@/configs/redux/client-slice'
import { colors } from '@/configs/chakra-ui/color'
import { PageEnum, PoliciesEnum, PromoEnum, StatusPromotion } from '@/constants/enum'
import DefaultButton from '../utils/DefaultButton'
import DefaultInput from '../utils/DefaultInput'
import { ErrorText } from '../utils/NotificationText'
import { RootState } from '@/configs/redux/store'

const PromotionMobileModal = () => {
  const { isShowPromotionModal, currentPromo, currentBonus, currentTurnover, currentMaxBonus, currentMinDeposit }:any = useSelector((state: RootState) => state.client)
  const dispatch = useDispatch()
  const [isLogin, setIsLogin] = useState(false)
  const [amountInput, setAmountInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const router = useRouter()
  const toast = useToast()
  const t = useTranslations()
  const tenancy = useTenancy()
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [isShowPromotionModal])

  useEffect(() => {
    setIsLogin(ClientService.isAuthenticated());
  });

  const resetModal = () => {
    setAmountInput("")
    setAmountInput("")
    setIsError(false)
  }
  

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value, validity} = e.target
    const num = toNormalNum(value)
    const formatNum: any = numberWithCommas(num)
    if (validity.valid) {
      setAmountInput(formatNum)
    }
  }
  

  const error = useMemo(() => {
    switch (true) {
      case amountInput === "":
        return t("amount_input_is_required")
      case +toNormalNum(amountInput) < currentPromo.amountBuy:
        return `${t("amount_number_must_bigger_than")} ${currentPromo.amountBuy}`
      default:
        return ""
    }
  }, [amountInput, currentPromo])

  const submitAmount = async () => {
    if(error && currentPromo?.fixedAmount === false) {
      setIsError(true)
      return
    }
    setIsLoading(true)
    try {
      const res: Respond = await httpClient.Promotion.addPromotion({
        PromotionId: currentPromo.id,
        BuyAmount: toNormalNum(amountInput) || 0
      })
      if (res.success) {
        dispatch(clientAction.buyPromoFunctionHandler())
        toast({
          status: "success",
          title: res.result
        })
        resetModal()
      } else {
        toast({
          status: "error",
          title: res.error.message
        })
      }
    } catch (err: any) {
      console.log(err);
      // checkIsTimeoutToken(err, router)
      toast({
        status: "error",
        title: err?.response?.data?.error?.message || t('something_went_wrong'),
      })
    } finally {
      setIsLoading(false)
    }
  }

  const terminalPromo = async () => {
    setIsLoading(true)
    try {
      const res: Respond = await httpClient.Promotion.terminatePromotion({
        PromotionId: currentPromo.id
      })
      if (res.success) {
        dispatch(clientAction.buyPromoFunctionHandler())
        resetModal()
        toast({
          status: "success",
          title: res.result
        })
      } else {
        toast({
          status: "error",
          title: res.error.message
        })
      }
    } catch (err: any) {
      console.log(err);
      // checkIsTimeoutToken(err, router)
      toast({
        status: "error",
        title: err?.response?.data?.error?.message || t('something_went_wrong'),
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!isShowPromotionModal) {
    return null
  }

  return (
    <Flex flexDir={'column'} pos={"sticky"} top={0} zIndex={2200} bgColor={colors.default.white}
      minH={"95vh"} w={"100%"} pb={(amountInput || currentPromo?.fixedAmount === true) ? "220px" : "140px"}>
      <Center flexDir={'column'} py={"15px"} bgColor={tenancy?.mainColor || colors.primary} pos={"relative"}>
        <Text fontSize={16} fontWeight={700} textTransform={"uppercase"}>{t('promotion')}</Text>
        <ChevronLeftIcon pos={'absolute'} left={5} fontSize={24} cursor={'pointer'}
          onClick={() => {
            resetModal()
            dispatch(clientAction.setCurrentPromo(null))
            dispatch(clientAction.handleShowPromotionModal(false))
          }}/>
      </Center>
      <Image alt='img' src={currentPromo?.urlImage}/>
      <Box p={"15px 5px"} color={colors.secondary} fontSize={14} fontWeight={700} bgColor={"#d9dee4"}>
        <Text>{currentPromo?.name}</Text>
      </Box>
      <Text color={colors.default.green} fontWeight={700} fontSize={14} px={"5px"} fontFamily={"verdana, geneva, sans-serif"}>
        {currentPromo?.content}
      </Text>
      <Flex px={"5px"} flexDir={'column'}>
        <Text fontSize={14} fontWeight={700} mt={"22px"}>{t('promotion_details')}:</Text>
        <Flex flexDir={'column'}>
          {currentPromo?.detailPromotion && currentPromo.detailPromotion.map((detail:any, i:number) => (
            <Flex key={i} fontSize={15} borderBottom={i !== currentPromo.detailPromotion.length - 1 ? "1px solid #aeaeae" : undefined}
              justifyContent={'space-between'} textTransform={"capitalize"}>
              <Text w={"50%"} p={"10px"}>{detail.text}</Text>
              <Text p={"10px"} alignSelf={"flex-end"}>{detail.value}</Text>
            </Flex>
          ))}
        </Flex>
        <Text mt={"22px"} fontWeight={700} fontSize={14}>{t('terms_&_condition')}:</Text>
        {
          currentPromo?.condition 
          ? 
          <Text fontSize={15} ml={10} dangerouslySetInnerHTML={{__html:currentPromo?.condition}} />
          :
        <OrderedList fontSize={15}>
          <ListItem>{t('the_player_may_only')}</ListItem>
          <ListItem>{t('this_promotion')}</ListItem>
          <ListItem>{t('only_one_account')}</ListItem>
          <ListItem>{t('any_bet_place')}</ListItem>
          <ListItem>{tenancy?.appName} {t('reserves_the_right')}</ListItem>
          <ListItem>{tenancy?.appName}’s <Link color={colors.primary} onClick={() => router.push(`/${PageEnum.Policies}/${PoliciesEnum.Terms}`)}>{t('terms_&_condition')}</Link> {t('applies')}.</ListItem>
        </OrderedList>
        }
      </Flex>
      {isLogin && currentPromo?.promotionType !== PromoEnum.REBATE && <Flex flexDir={'column'} pb={3} px={2} position={"fixed"} bottom={"60px"} w={"100%"} bgColor={colors.default.white} borderTop={"1px solid #e8e8e8"}>
          <Flex gap={3} pt={3}>
            {currentPromo?.fixedAmount === false && !currentPromo?.statusPromotion && 
            <DefaultInput minW={"50%"} placeholder={t('amount')} pattern="[0-9,]*" onChange={inputHandler} value={amountInput}/>}
            {!currentPromo?.statusPromotion && <DefaultButton w={"100%"} onClick={submitAmount}>
              {isLoading ? <Spinner size={"sm"}/> : t('apply')}
            </DefaultButton>}
            {currentPromo?.statusPromotion === StatusPromotion.PENDING && 
            <DefaultButton bgColor={colors.default.gray}  color={colors.default.white} disabled={true}>
              Waiting for approve...
            </DefaultButton>}
            {currentPromo?.statusPromotion === StatusPromotion.ACCEPTED && 
            <DefaultButton bgColor={colors.error} color={colors.default.white} onClick={terminalPromo}>
              {isLoading ? <Spinner size={"sm"}/> : "Terminate"}
            </DefaultButton>}
          </Flex>
          {isError && <ErrorText>{error}</ErrorText>}
          {currentPromo?.fixedAmount === false && amountInput.length !== 0 && <Center gap={3} pt={3}>
            <Flex sx={promoCalculateItem}>
              <Text>{t('promotion_bonus')}</Text>
              <Text sx={promoCalculateText}>{(currentMaxBonus > 0 && (+toNormalNum(amountInput) * currentBonus / 100) > currentMaxBonus) ? currentMaxBonus : numberWithCommas(+toNormalNum(amountInput) * currentBonus / 100)}</Text>
            </Flex>
            <Flex sx={promoCalculateItem}>
              <Text>{t('wager_requirement')}</Text>
              <Text sx={promoCalculateText}>{(currentMaxBonus > 0 && (+toNormalNum(amountInput) * currentBonus / 100) > currentMaxBonus) ?
                numberWithCommas((+toNormalNum(amountInput) + currentMaxBonus) * currentTurnover) :
                numberWithCommas((+toNormalNum(amountInput) + (+toNormalNum(amountInput) * currentBonus / 100)) * currentTurnover)}</Text>
            </Flex>
          </Center>}
          {currentPromo?.fixedAmount === true && <Center gap={3} pt={3}>
            <Flex sx={promoCalculateItem}>
              <Text>{t('promotion_bonus')}</Text>
              <Text sx={promoCalculateText}>{currentMaxBonus || currentBonus}</Text>
            </Flex>
            <Flex sx={promoCalculateItem}>
              <Text>{t('wager_requirement')}</Text>
              <Text sx={promoCalculateText}>{numberWithCommas((currentMinDeposit + currentBonus) * currentTurnover)}</Text>
            </Flex>
          </Center>}
      </Flex>}
    </Flex>
  )
}

export default PromotionMobileModal

const promoCalculateItem = {
  p:"5px 10px",
  borderRadius:5,
  fontWeight:700,
  bgColor:"#d9dee4",
  flexDir:'column',
  w:"50%"
}
const promoCalculateText = {
  fontFamily: "Teko,sans-serif",
  color: colors.primary,
  fontSize: "24px",
  fontWeight: 500
}