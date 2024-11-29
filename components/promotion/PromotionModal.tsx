import { Box, Center, Flex, Image, Link, ListItem, OrderedList, Spinner, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import { Respond } from '@/constants/type'
import { PromoEnum, StatusPromotion } from '@/constants/enum'
import { useTenancy } from '@/configs/providers/TenancyProvider'
import { useCheckTokenProvider } from '@/configs/providers/CheckTokenProvider'
import httpClient from '@/configs/axios/api'
import { colors } from '@/configs/chakra-ui/color'
import DefaultInput from '../utils/DefaultInput'
import { ErrorText } from '../utils/NotificationText'
import { useTranslations } from 'next-intl'
import { numberWithCommas, toNormalNum } from '@/helpers/functions'
import { clientAction } from '@/configs/redux/client-slice'
import { RootState } from '@/configs/redux/store'
import DefaultButton from '../utils/DefaultButton'
import { useRouter } from 'next/navigation'

const PromotionModal = () => {
  const { isShowPromotionModal, currentPromo, currentBonus, currentTurnover, currentMaxBonus, currentMinDeposit } = 
    useSelector((state: RootState) => state.client)
  const accountStatus = useCheckTokenProvider()
  const dispatch = useDispatch()
  const [amountInput, setAmountInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const router = useRouter()
  const toast = useToast()
  const t = useTranslations()
  const tenancy = useTenancy()

  const resetModal = () => {
    setAmountInput("")
    setAmountInput("")
    setIsError(false)
  }
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [isShowPromotionModal])

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value, validity} = e.target
    const num = toNormalNum(value)
    const formatNum: any = numberWithCommas(num)
    if (validity.valid) {
      setAmountInput(formatNum)
    }
  }

  const error = useMemo(() => {
    if(currentPromo) {
      switch (true) {
      case amountInput === "":
        return t("amount_input_is_required")
      case +toNormalNum(amountInput) < currentPromo?.amountBuy:
        return `${t("amount_number_must_bigger_than")} ${currentPromo?.amountBuy}`
      default:
        return ""
    }
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
        PromotionId: currentPromo?.id,
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
        PromotionId: currentPromo?.id
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
      toast({
        status: "error",
        title: err?.response?.data?.error?.message || t('something_went_wrong'),
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Flex flexDir={'column'} pos={"absolute"} top={["0px","0px","-75px","0",0]} left={0} zIndex={11} display={isShowPromotionModal ? "flex" : "none"} bgColor={'white'}
      minH={"95vh"} w={"100%"} pb={currentPromo?.fixedAmount === true ? "50px" : amountInput ? "70px" : "0px"}>
      <Center flexDir={'column'} py={"15px"} bgColor={colors.primary} pos={"relative"} color={"#fff"}>
        <Text fontSize={16} fontWeight={700} textTransform={"uppercase"} >{t('promotion')}</Text>
        <ChevronLeftIcon pos={'absolute'} left={2} fontSize={24} cursor={'pointer'}
          onClick={() => {
            resetModal()
            dispatch(clientAction.setCurrentPromo(null))
            dispatch(clientAction.handleShowPromotionModal(false))
          }}/>
      </Center>
      <Image alt='img' src={currentPromo?.urlImage}/>
      <Box p={"15px 5px"} color={"#000"} fontSize={14} fontWeight={700} bgColor={"#d9dee4"}>
        <Text>{currentPromo?.name}</Text>
      </Box>
      <Text color={colors.primary} fontWeight={700} fontSize={14} px={"5px"} fontFamily={"verdana, geneva, sans-serif"}>
        {currentPromo?.content}
      </Text>
      <Flex px={"5px"} flexDir={'column'} pb={"50px"}>
        <Text fontSize={14} fontWeight={700} mt={"22px"}>{t('promotion_details')}:</Text>
        <Flex flexDir={'column'}>
          {currentPromo?.detailPromotion && currentPromo.detailPromotion.map((detail, i) => (
            <Flex key={i} fontSize={15} borderBottom={i !== currentPromo.detailPromotion.length - 1 ? "1px solid #aeaeae" : undefined}
              justifyContent={'space-between'} textTransform={"capitalize"}>
              <Text w={"50%"} p={"10px"}>{detail.text}</Text>
              <Text p={"10px"} alignSelf={"flex-end"}>{detail.value}</Text>
            </Flex>
          ))}
        </Flex>
        <Text mt={"22px"} fontWeight={700} fontSize={14}>{t('terms_&_condition')}:</Text>
        <OrderedList fontSize={15} pb={"140px"}>
          <ListItem>{t('the_player_may_only')}</ListItem>
          <ListItem>{t('this_promotion')}</ListItem>
          <ListItem>{t('only_one_account')}</ListItem>
          <ListItem>{t('any_bet_place')}</ListItem>
          <ListItem>{tenancy?.appName} {t('reserves_the_right')}</ListItem>
          <ListItem>{tenancy?.appName}’s <Link color={colors.primary} onClick={() => router.push(`/policies/terms`)}>{t('terms_&_condition')}</Link> {t('applies')}.</ListItem>
        </OrderedList>
      </Flex>
      {accountStatus?.isLogin && currentPromo?.promotionType !== PromoEnum.REBATE && <Flex flexDir={'column'} pb={3} px={2} position={"fixed"} bottom={0} w={"100%"} bgColor={"#fff"} borderTop={"1px solid #e8e8e8"}>
          <Flex gap={3} pt={3}>
            {currentPromo?.fixedAmount === false && !currentPromo?.statusPromotion && 
            <DefaultInput minW={"50%"} placeholder={t('amount')} pattern="[0-9,]*" onChange={inputHandler} value={amountInput}/>}
            {!currentPromo?.statusPromotion && <DefaultButton w={"100%"} color={"#fff"} onClick={submitAmount}>
              {isLoading ? <Spinner size={"sm"}/> : t('apply')}
            </DefaultButton>}
            {currentPromo?.statusPromotion === StatusPromotion.PENDING && 
            <DefaultButton bgColor={"#aeaeae"}  color={"white"} disabled={true}>
              Waiting for approve...
            </DefaultButton>}
            {currentPromo?.statusPromotion === StatusPromotion.ACCEPTED && 
            <DefaultButton bgColor={colors.error} color={'white'} onClick={terminalPromo}>
              {isLoading ? <Spinner size={"sm"}/> : "Terminate"}
            </DefaultButton>}
          </Flex>
          {isError && <ErrorText>{error}</ErrorText>}
          {amountInput.length !== 0 && <Center gap={3} pt={3}>
            <Flex sx={promoCalculateItem}>
              <Text fontSize={"12.5px"}>{t('promotion_bonus')}</Text>
              <Text sx={promoCalculateText}>{(currentMaxBonus > 0 && (+toNormalNum(amountInput) * currentBonus / 100) > currentMaxBonus) ? currentMaxBonus : numberWithCommas(+toNormalNum(amountInput) * currentBonus / 100)}</Text>
            </Flex>
            <Flex sx={promoCalculateItem}>
              <Text fontSize={"12.5px"}>{t('wager_requirement')}</Text>
              <Text sx={promoCalculateText}>{(currentMaxBonus > 0 && (+toNormalNum(amountInput) * currentBonus / 100) > currentMaxBonus) ?
                numberWithCommas((+toNormalNum(amountInput) + currentMaxBonus) * currentTurnover) :
                numberWithCommas((+toNormalNum(amountInput) + (+toNormalNum(amountInput) * currentBonus / 100)) * currentTurnover)}</Text>
            </Flex>
          </Center>}
          {currentPromo?.fixedAmount === true && <Center gap={3} pt={3}>
            <Flex sx={promoCalculateItem}>
              <Text >{t('promotion_bonus')}</Text>
              <Text sx={promoCalculateText}>{currentMaxBonus || currentBonus}</Text>
            </Flex>
            <Flex sx={promoCalculateItem} >
              <Text >{t('wager_requirement')}</Text>
              <Text sx={promoCalculateText}>{numberWithCommas((currentMinDeposit + currentBonus) * currentTurnover)}</Text>
            </Flex>
          </Center>}
      </Flex>}
    </Flex>
  )
}

export default PromotionModal

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