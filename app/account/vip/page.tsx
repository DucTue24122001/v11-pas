"use client"
/* eslint-disable react/jsx-no-comment-textnodes */
import { Respond } from '@/constants/type'
import { Box, Card, Center, Flex, Image, ListItem, Spinner, Text, useToast } from '@chakra-ui/react'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {saveAs} from "file-saver";
import { RootState } from '@/configs/redux/store'
import { useTenancy } from '@/configs/providers/TenancyProvider'
import { useTranslations } from 'next-intl'
import { accountAction } from '@/configs/redux/account-slice'
import httpClient from '@/configs/axios/api'
import { colors } from '@/configs/chakra-ui/color'
import DefaultButton from '@/components/utils/DefaultButton'
import CopyButton from '@/components/utils/CopyButton'
import ResponsiveNote from '@/components/utils/ResponsiveNote'
import { convertDecimalNum, numberWithCommas } from '@/helpers/functions'
import VipInfo from '@/components/account/VIP/vip/VipInfo'

const Vip = () => {
  const {accountVipDetail, affiliateTier} = useSelector((state: RootState) => state.account)
  const [isLoading, setIsLoading] = useState(false)
  const [protocol, setProtocol] = useState("")
  const [host, setHost] = useState("")
  const tenancy = useTenancy()
  const dispatch = useDispatch()
  const toast = useToast()
  const t = useTranslations()

  const downloadFile = async () => {
    saveAs(accountVipDetail?.qrReferer + '?not-from-cache-please', `qr-referral`)
  }

  useEffect(() => {
    setProtocol(window.location.protocol)
    setHost(window.location.host)
  }, [])

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      try {
        const data : Respond = await httpClient.Vip.getVipDetail()
        if (data.success) {
          const vipDetail = data.result
          dispatch(accountAction.setAccountVipDetail(vipDetail.info))
          dispatch(accountAction.setAffiliateTier(vipDetail.affiliateTier))
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
    })()
  }, [])

  const VipNote = () => {
    return <>
      <ListItem>{t("vip-note-1")}</ListItem>
      <ListItem>{t("vip-note-2")}</ListItem>
      <ListItem>{t("vip-note-3")}</ListItem>
    </>
  }

  if (isLoading) {
    return (
      <Card minH={"80vh"}>
        <Center py={"10px"}>
          <Spinner color={colors.primary}/>
        </Center>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <Box px={"15px"}>
          <Center pt={"5px"} flexDir={"column"} gap={1}>
            <Text color={colors.default.gray}>{t("last_update")} {moment(accountVipDetail?.lastModificationTime).format("hh:mm, DD MMM YYYY")}</Text>
            <VipInfo/>
            {accountVipDetail?.qrReferer && <>
              <Image src={accountVipDetail?.qrReferer} alt='qr' w={"150px"}/>
              <Text textTransform={'uppercase'} fontWeight={700} fontSize={"18px"}>{t("invite_friend")}</Text>
              <DefaultButton w={"50%"} onClick={downloadFile}>{t("share")}</DefaultButton>
            </>}
          </Center>
          <Box pt={"10px"}>
            <Text color={colors.primary} fontSize={"16px"}>{t('referral_code')}</Text>
            <Flex gap={2} alignItems={'center'}>
              <Flex sx={referralContainer} h={"50px"}>
                <Text color={colors.default.gray}>{accountVipDetail?.refferalCode}</Text>
              </Flex>
              <CopyButton copyText={accountVipDetail?.refferalCode}/>
            </Flex>
          </Box>
          <Box pt={"10px"}>
            <Text color={colors.primary} fontSize={"16px"}>{t("referral_link")}</Text>
            <Flex gap={2} alignItems={'center'}>
              <Flex sx={referralContainer} h={"50px"}>
                <Text color={colors.default.gray}>{protocol}//{host}/register?invitation={accountVipDetail?.refferalCode}</Text>
              </Flex>
              <CopyButton copyText={`${protocol}//${host}/register?invitation=${accountVipDetail?.refferalCode}`}/>
            </Flex>
          </Box>
          <Box pt={"20px"} pb={"10px"} borderBottom={"1px solid #d9dee4"}>
            <ResponsiveNote fontSize={13}>
              <VipNote/>
            </ResponsiveNote>
          </Box>
        </Box>
        <Box pb={"20px"}>
          <Flex sx={headVip} mt={3}>
            <Text>{t("affiliate_tier")}</Text>
          </Flex>
          <Flex sx={tableVip}>
            <Text sx={tableItem}>{t("tier")}</Text>
            <Text sx={tableItem} textAlign={"end"}>{t("requirement")}</Text>
            <Text sx={tableItem} textAlign={"end"}>{t("turnover")} (%)</Text>
            <Text sx={tableItem} textAlign={"end"}>{t("rewards")} (%)</Text>
          </Flex>
          {affiliateTier.map((tier, i) => (
            <Flex sx={tableVip} key={i}>
              <Text sx={tableItem} textTransform={'uppercase'}>{tier?.tier}</Text>
              <Text sx={tableItem} textAlign={"end"}>{numberWithCommas(tier?.requirement)}</Text>
              <Text sx={tableItem} textAlign={"end"} color={colors.primary}>{convertDecimalNum(tier?.rewardTurnover)}</Text>
              <Text sx={tableItem} textAlign={"end"} color={colors.primary}>{tier?.rewards}</Text>
            </Flex>
          ))}
        </Box>
      </Card>
    </>
  )
}

export default Vip

const referralContainer = {
  p:"5px 10px",
  borderRadius:5,
  bgColor:"#f2f5f9",
  flexDir:'column',
  w:"100%",
  alignItem: "center",
  justifyContent: 'center',
}

const headVip = {
  p: "14px",
  color: colors.report.headFontColor,
  fontSize: 16,
  alignItems: 'center',
  justifyContent: 'space-between',
  bgColor: colors.report.mobileBg,
}

const tableVip = {
  p: "13px",
  justifyContent: 'space-between',
  fontSize: "14px",
  borderBottom: `1px solid ${colors.default.table}`,
}

const tableItem = {
  flex: "1 1 0px",
}