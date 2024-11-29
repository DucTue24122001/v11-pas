"use client"
import addBankingIcon from "@/public/images/add-net-banking.b8a3637.png"
import netBankingWithdrawIcon from "@/public/images/net-banking-withdraw.png"
import { Image, Text, useToast } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BankAccountType } from "@/constants/enum"
import { useTenancy } from "@/configs/providers/TenancyProvider"
import httpClient from "@/configs/axios/api"
import { colors } from "@/configs/chakra-ui/color"
import { RootState } from "@/configs/redux/store"
import { useTranslations } from "next-intl"
import { accountAction } from "@/configs/redux/account-slice"
import AddBank from "@/components/account/utils/AddBank"
import { PaymentList, PaymentOption } from "@/components/account/utils/PaymentListOption"
import BankAccountDetail from "@/components/account/myBankAccount/BankAccountDetail"

const MyBankAccount = () => {
  const {accountBankInfo, myCurrentAccountBank} = useSelector((state: RootState) => state.account)
  const dispatch = useDispatch()
  const toast = useToast({
    duration: 3000,
    isClosable: true,
  })
  const t = useTranslations();
  const tenancy = useTenancy()

  useEffect(() => {
    (async () => {
      try {
        const res: any = await httpClient.Bank.getInfoWithdrawBank()
        if(res.success) {
          dispatch(accountAction.setAccountBankInfo(res.result.playerBank))
          dispatch(accountAction.setMyCurrentBankAccount(BankAccountType.ADD))
        }
      } catch (err: any) {
        console.log(err);
        toast({
        status: "error",
        title: err?.response?.data?.error?.message || t('something_went_wrong'),
        })
      }
    })()
}, [])
  
  return (
    <>
      <PaymentList>
      {accountBankInfo.map((bank: any, i: number) => (
          <PaymentOption key={bank.id} border={myCurrentAccountBank === bank.id ? `2px solid ${colors.primary}` : `2px solid ${colors.default.white}`}
            onClick={() => dispatch(accountAction.setMyCurrentBankAccount(bank.id))}>
            <Image h={"30px"} objectFit={"cover"} src={netBankingWithdrawIcon.src} alt='add-internet-banking'></Image>
            <Text flexDir={"row"}
              overflow={"hidden"}
              whiteSpace={"nowrap"}
              maxW={"100px"}
              gap={1}>
              {bank.displayName ? bank.displayName : bank.bankName}
            </Text>
          </PaymentOption>
        ))}
      <PaymentOption key={"add"} 
        border={myCurrentAccountBank === BankAccountType.ADD ? `2px solid ${colors.primary}` : `2px solid ${colors.default.white}`}
        onClick={() => dispatch(accountAction.setMyCurrentBankAccount(BankAccountType.ADD))} minW={"110px"}>
          <Image h={"30px"} objectFit={"cover"} src={addBankingIcon.src} alt='add-internet-banking'></Image>
          <Text>{t("add_bank")}</Text>
        </PaymentOption>
      </PaymentList>
      {accountBankInfo.map((bank: any, i: number) => (
        myCurrentAccountBank === bank.id && <BankAccountDetail key={i} bankInfo={bank}/>
      ))}
      {myCurrentAccountBank === BankAccountType.ADD && <AddBank/>}
    </>
  )
}

export default MyBankAccount