"use client"
import { PaymentList, PaymentOption } from '@/components/account/utils/PaymentListOption'
import httpClient from '@/configs/axios/api';
import addBankingIcon from "@/public/images/add-net-banking.b8a3637.png";
import netBankingWithdrawIcon from "@/public/images/net-banking-withdraw.png";
import { colors } from '@/configs/chakra-ui/color';
import { useTenancy } from '@/configs/providers/TenancyProvider';
import { accountAction } from '@/configs/redux/account-slice';
import { RootState } from '@/configs/redux/store';
import { WithdrawType } from '@/constants/enum';
import { Flex, Image, ListItem, Spinner, Text, useToast } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Notes from '@/components/account/utils/Notes';
import AddBank from '@/components/account/utils/AddBank';
import NetBankingWithdraw from '@/components/account/withdraw/NetBankingWithdraw';
import AccountLayout from '@/components/account/layouts/AccountLayout';
import Card from '@/components/utils/Card';

const Withdraw = () => {
  const { accountBankInfo, currentWithdraw, reqTurnover } = useSelector(
    (state: RootState) => state.account
  );
  const { language } = useSelector(
    (state: RootState) => state.client
  );
  const dispatch = useDispatch();
  const toast = useToast({
    duration: 3000,
    isClosable: true,
  });
  const t = useTranslations();
  const tenancy = useTenancy()
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        setIsFetching(true)
        const res: any = await httpClient.Bank.getInfoWithdrawBank()
        if (res.success) {
          dispatch(accountAction.setAccountBankInfo(res.result.playerBank));
          dispatch(accountAction.setReqTurnover(res.result.reqTurnover));
          if (res.result?.playerBank?.length !== 0) {
            dispatch(
              accountAction.setCurrentWithdraw(res.result.playerBank[0].id)
            );
          }
        }
      } catch (err: any) {
        console.log(err);
        toast({
          status: "error",
          title:
            err?.response?.data?.error?.message ||
            t('something_went_wrong'),
        });
      } finally {
        setIsFetching(false)
      }
    })();
  }, []);


  return (
    <>
    <PaymentList>
        {accountBankInfo.map((bank: any, i: number) => (
          <PaymentOption
            key={bank.id}
            border={
              currentWithdraw === bank.id
                ? `2px solid ${tenancy?.mainColor || colors.primary}`
                : `2px solid ${colors.default.white}`
            }
            onClick={() => dispatch(accountAction.setCurrentWithdraw(bank.id))}
          >
            <Image
              h={"30px"}
              objectFit={"cover"}
              src={netBankingWithdrawIcon.src}
              alt="add-internet-banking"
            ></Image>
            <Flex
              flexDir={["row", "row", "row", "column", "column"]}
              overflow={"hidden"}
              whiteSpace={"nowrap"}
              maxW={"100px"}
              gap={[1, 1, 1, 0, 0]}
            >
              <Text>{bank.displayName ? bank.displayName : bank.bankName}</Text>
            </Flex>
          </PaymentOption>
        ))}
        <PaymentOption
          key={"add"}
          border={
            currentWithdraw === WithdrawType.ADD
              ? `2px solid ${tenancy?.mainColor || colors.primary}`
              : `2px solid ${colors.default.white}`
          }
          onClick={() =>
            dispatch(accountAction.setCurrentWithdraw(WithdrawType.ADD))
          }
          minW={["110px", "110px", "160px", "160px"]}
        >
          <Image
            h={"30px"}
            objectFit={"cover"}
            src={addBankingIcon.src}
            alt="add-internet-banking"
          ></Image>
          <Text>{t("add_bank")}</Text>
        </PaymentOption>
      </PaymentList>
      {accountBankInfo.map((bank: any, i: number) => {
        return (
          currentWithdraw === bank.id && (
            <Flex flexDir={"column"} gap={5} key={bank.id}>
              <NetBankingWithdraw bankInfo={bank} />
              <Notes>
                {language == "EN" && <ListItem>Withdrawal are subjected to a {reqTurnover}x wagering requirement.</ListItem>}
                {language == "MY" && <ListItem>သွင်းငွေ {reqTurnover}x ဆမှသာငွေထုတ်ခွင့်ရှိသည်.</ListItem>}
                {language == "KM" && <ListItem>ការដកប្រាក់ជាកម្មវត្ថុនៃលក្ខខណ្ឌដែលតម្រូវឱ្យដាក់ភ្នាល់ទឹកប្រាក់ផ្តល់ជូនបន្ថែមគុណនឹង {reqTurnover}x.</ListItem>}

                <ListItem>{t("withdrawing")}</ListItem>
              </Notes>
            </Flex>
          )
        );
      })}
      {currentWithdraw == WithdrawType.ADD && <AddBank />}
      </>
  )
}

export default Withdraw