import { CloseIcon } from '@chakra-ui/icons'
import { Box, Center, Flex, Image, Link, ListItem, Modal, ModalContent, ModalOverlay, Spinner, Text, UnorderedList, useToast } from '@chakra-ui/react'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { RootState } from '@/configs/redux/store'
import { useTenancy } from '@/configs/providers/TenancyProvider'
import ClientService from '@/helpers/ClientService'
import { clientAction } from '@/configs/redux/client-slice'
import { numberWithCommas, toNormalNum } from '@/helpers/functions'
import httpClient from '@/configs/axios/api'
import { Respond } from '@/constants/type'
import { PageEnum, PoliciesEnum, PromoEnum, StatusPromotion } from '@/constants/enum'
import DefaultButton from '../utils/DefaultButton'
import DefaultInput from '../utils/DefaultInput'
import { colors } from '@/configs/chakra-ui/color'
import { ErrorText } from '../utils/NotificationText'


const PromotionDesktopModal = () => {
  const { isShowPromotionModal, currentPromo, currentBonus, currentTurnover, currentMinDeposit, currentMaxBonus }:any = useSelector((state: RootState) => state.client)
  const dispatch = useDispatch()
  const [amountInput, setAmountInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const router = useRouter()
  const toast = useToast()
  const t = useTranslations()
  const tenancy = useTenancy()

  useEffect(() => {
    setIsLogin(ClientService.isAuthenticated());
  });
  
  const resetModal = () => {
    setAmountInput("")
    setIsError(false)
  }

  const disableModal = () => {
    resetModal()
    dispatch(clientAction.setCurrentPromo({}))
    dispatch(clientAction.handleShowPromotionModal(false))
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

  return (
    <Modal isOpen={isShowPromotionModal} autoFocus={false} onClose={() => disableModal()}
      isCentered size={"3xl"}>
        <ModalOverlay />
        <ModalContent>
          <Flex flexDir={'column'}>
          <Box p={"15px 15px 20px"} w={"100%"} textAlign={"end"} position={'sticky'} top={0}>
            <CloseIcon fontSize={10} cursor={'pointer'} onClick={() => disableModal()}/>
          </Box>
          <Flex pb={30} px={"20px"} flexDir={'column'} overflowY={'auto'} maxH={500} className={'promotion-scroll'} >
            <Image alt={"img"} src={currentPromo?.urlImage}/>
            <Text textTransform={"uppercase"} fontSize={18} fontWeight={700} color={tenancy?.mainColor || colors.primary} my={"20px"}>
              {currentPromo?.name}
            </Text>
            <Text fontFamily={"'Verdana',sans-serif"} fontSize={"16px"}>
              {currentPromo?.content}
            </Text>
            <Text fontFamily={"'Verdana',sans-serif"} fontWeight={700} mt={"22px"}>{t('promotion_details')}:</Text>
            <Flex w={"100%"} flexDir={'column'} mt={"10px"}>
              {currentPromo?.detailPromotion && currentPromo.detailPromotion.map((detail:any, i:number) => (
                <Flex key={i} borderBottom={i !== currentPromo.detailPromotion.length - 1 ? "2px solid #aeaeae" : undefined}
                  justifyContent={'space-between'} textTransform={"capitalize"}>
                  <Text w={"50%"} p={"10px"}>{detail.text}</Text>
                  <Text p={"10px"}>{detail.value}</Text>
                </Flex>
              ))}
            </Flex>
            <Text mt={"22px"} fontWeight={700}>{t('terms_&_condition')}:</Text>
            {currentPromo?.condition ? 
              <Text ml={10} dangerouslySetInnerHTML={{__html:currentPromo?.condition}}></Text>
              :
            <UnorderedList ml={10}>
              <ListItem>{t('the_player_may_only')}</ListItem>
              <ListItem>{t('this_promotion')}</ListItem>
              <ListItem>{t('only_one_account')}</ListItem>
              <ListItem>{t('any_bet_place')}</ListItem>
              <ListItem>{tenancy?.appName} {t('reserves_the_right')}</ListItem>
              <ListItem>{tenancy?.appName}’s <Link color={colors.primary} onClick={() => router.push(`/${PageEnum.Policies}/${PoliciesEnum.Terms}`)}>{t('terms_&_condition')}</Link> {t('applies')}.</ListItem>
            </UnorderedList>
            }
          </Flex>
          {isLogin && currentPromo?.promotionType !== PromoEnum.REBATE && <Center flexDir={'column'} pb={3} position={"sticky"} bottom={0} borderTop={"1px solid #e8e8e8"}>
          <Center gap={3} pt={3}>
            {(currentPromo?.fixedAmount === false && !currentPromo?.statusPromotion) && 
              <DefaultInput w={"200px"} placeholder={t('amount')} pattern="[0-9,]*" onChange={inputHandler} value={amountInput}/>}
            {(!currentPromo?.statusPromotion || currentPromo?.statusPromotion === StatusPromotion.COMPLETED) && <DefaultButton w={"200px"} onClick={submitAmount}>
              {isLoading ? <Spinner size={"sm"}/> : t('apply')}
            </DefaultButton>}
            {currentPromo?.statusPromotion === StatusPromotion.PENDING && 
            <DefaultButton bgColor={colors.default.lightGray} color={colors.default.white} disabled={true}
              cursor={"not-allowed"}>
              Waiting for approve...
            </DefaultButton>}
            {currentPromo?.statusPromotion === StatusPromotion.ACCEPTED && 
            <DefaultButton w={"100px"} bgColor={colors.error} color={colors.default.white} onClick={terminalPromo}>
              {isLoading ? <Spinner size={"sm"}/> : "Terminate"}
            </DefaultButton>}
          </Center>
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
                numberWithCommas((+toNormalNum(amountInput) + (+toNormalNum(amountInput) * currentBonus / 100)) * currentTurnover)}
                </Text>
            </Flex>
          </Center>}
          {currentPromo?.fixedAmount === true && <Center gap={3} pt={3}>
            <Flex sx={promoCalculateItem}>
              <Text>{t('promotion_bonus')}</Text>
              <Text sx={promoCalculateText}>
                {currentMaxBonus || currentBonus}
              </Text>
            </Flex>
            <Flex sx={promoCalculateItem}>
              <Text>{t('wager_requirement')}</Text>
              <Text sx={promoCalculateText}>{numberWithCommas((currentMinDeposit + currentBonus) * currentTurnover)}</Text>
            </Flex>
          </Center>}
          </Center>}
          <Center py={"18px"} w={"100%"} gap={1} bgColor={colors.secondary}
            position={"sticky"} bottom={0}
            borderRadius={"0 0 5px 5px"}>
            <Text color={colors.default.white}>{t('need_assistance')}</Text>
            <Text fontWeight={700} fontSize={16} color={tenancy?.mainColor || colors.primary} cursor={'pointer'}>
              {t('customer_care')}
            </Text>
          </Center> 
          </Flex>
        </ModalContent>
    </Modal>
  )
}

export default PromotionDesktopModal

const promoCalculateItem = {
  p:"5px 10px",
  borderRadius:5,
  fontWeight:700,
  bgColor:"#d9dee4",
  flexDir:'column',
  w:"200px"
}
const promoCalculateText = {
  fontFamily: "Teko,sans-serif",
  color: colors.primary,
  fontSize: "28px",
  fontWeight: 500
}