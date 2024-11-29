"use client"
import { Card, Image, Spinner, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useMemo, useState } from 'react'
import netBankingIco from "@/public/images/netbanking.png"
import cryptoIco from "@/public/images/CryptoPayment.png"
import { useDispatch, useSelector } from 'react-redux'
import { TypeDeposit } from '@/constants/enum'
import { useTenancy } from '@/configs/providers/TenancyProvider'
import httpClient from '@/configs/axios/api'
import { colors } from '@/configs/chakra-ui/color'
import { RootState } from '@/configs/redux/store'
import { useTranslations } from 'next-intl'
import { accountAction } from '@/configs/redux/account-slice'
import Notes from '@/components/account/utils/Notes'
import { PaymentList, PaymentOption } from '@/components/account/utils/PaymentListOption'
import NetBankingDeposit from '@/components/account/deposit/NetBankingDeposit'
import CryptoDeposit from '@/components/account/deposit/CryptoDeposit'

const Deposit = () => {
  const {currentDepositType, currentAgentCryptoSelect, agentCryptoBankList} = useSelector((state: RootState) => state.account)
  const toast = useToast({
    duration: 3000,
    isClosable: true,
  })
  const [isFetching, setIsFetching] = useState(false)
  const dispatch = useDispatch()
  const tenancy = useTenancy()
  const t = useTranslations()

  // if (!isLogin) return null
  useEffect(() => {
    (async () => {
      setIsFetching(true)
      try {
        const res: any = await httpClient.Bank.getInfoDepositBank()
        const depositInfo = res.result
        dispatch(accountAction.setAllBankTypeList(depositInfo.agentBank))
        dispatch(accountAction.setUserNetBankingList(depositInfo.playerBank))

        dispatch(accountAction.setAgentCryptoBankList(depositInfo.agentCrypto))
        dispatch(accountAction.setCurrentAgentCryptoSelect(depositInfo.agentCrypto[0]))
        
      } catch (err: any) {
        console.log(err);
        toast({
        status: "error",
        title: err?.response?.data?.error?.message || t('something_went_wrong'),
      })
      } finally {
        setIsFetching(false)
      }
    })()
  }, [])

  const paymentOptionsList = useMemo(() => {
    if (agentCryptoBankList.length > 0) {
      return paymentOptions
    } else {
      return [{
        title: "Net Banking",
        image: netBankingIco.src,
        value: TypeDeposit.BANK
      }]
    }
  }, [agentCryptoBankList])

    return (
      <>
        <PaymentList>
          {paymentOptionsList.map((payment, i) => (
            <PaymentOption key={i}
              border={currentDepositType === payment.value ? `2px solid ${colors.primary}` : `2px solid ${colors.default.white}`}
              onClick={() => dispatch(accountAction.setCurrentDepositType(payment.value))}>
              <Image alt={payment.title} src={payment.image} h={"40px"}/>
              <Text fontWeight={600}>{payment.title}</Text>
            </PaymentOption>
          ))}
        </PaymentList>
        {!isFetching ? 
          <>
            {currentDepositType === TypeDeposit.BANK && <NetBankingDeposit/>}
            {currentDepositType === TypeDeposit.CRYPTO && <CryptoDeposit/>}
          </> :
          <Card p={"10px 10px"} h={"50vh"}>
            <Spinner/>
          </Card>}
        <Notes>
          {currentDepositType === TypeDeposit.CRYPTO && agentCryptoBankList.length !== 0 && 
          <Text>USDT {t("to")} {tenancy?.currency} {t("rate_is")} 1 : {currentAgentCryptoSelect?.rate}.</Text>}
          <Text>{t('note_description')}</Text>
        </Notes>
      </>
    )
  }

export default Deposit

const paymentOptions = [
  {
    title: "Net Banking",
    image: netBankingIco.src,
    value: TypeDeposit.BANK
  },
  {
    title: "USDT",
    image: cryptoIco.src,
    value: TypeDeposit.CRYPTO
  },
]