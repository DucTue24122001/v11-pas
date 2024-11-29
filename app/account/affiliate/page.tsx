"use client"
import { Box, Center, Flex, Image, ListItem, Spinner, Text, useToast } from '@chakra-ui/react'
import affiliateWallet from "@/public/images/Affiliate_Wallet.png"
import React, { useEffect, useMemo, useState } from 'react'
import { CheckCircleIcon } from '@chakra-ui/icons'
import { IoCloseCircle } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import CurrencyInput from 'react-currency-input-field'
import moment from 'moment'
import { RootState } from '@/configs/redux/store'
import { useTranslations } from 'next-intl'
import { useTenancy } from '@/configs/providers/TenancyProvider'
import httpClient from '@/configs/axios/api'
import { Respond } from '@/constants/type'
import { accountAction } from '@/configs/redux/account-slice'
import Card from '@/components/utils/Card'
import { colors } from '@/configs/chakra-ui/color'
import { convertDecimalNum } from '@/helpers/functions'
import ResponsiveNote from '@/components/utils/ResponsiveNote'
import DefaultButton from '@/components/utils/DefaultButton'
import { ErrorText } from '@/components/utils/NotificationText'
import { useRouter } from 'next/navigation'

const Affiliate = () => {
  const t = useTranslations()
  const {accountAffiliateDetail} = useSelector((state: RootState) => state.account)
  const {language} = useSelector((state: RootState) => state.client)
  const [amountInput, setAmountInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [isError, setIsError] = useState(false)
  const router = useRouter()
  const toast = useToast()
  const tenancy = useTenancy()
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      setIsFetching(true)
      try {
        const data : Respond = await httpClient.Vip.getAffiliateDetail()
        if (data.success) {
          const affiliateDetail = data.result
          dispatch(accountAction.setAccountAffiliateDetail(affiliateDetail))
        }
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
  }, [language])

  const isInputValid = useMemo(() => {
    if (!amountInput) {
      return false
    }
    return true
  }, [amountInput])
  
  const submitAmount = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (!isInputValid) {
      setIsError(true)
      return
    }
    setIsLoading(true)
    try {
      const res : Respond = await httpClient.Vip.withdrawAffiliate(amountInput)
      if (res.success) {
        setAmountInput("")
        router.push("/account/affiliate")
        toast({
          status: "success",
          title: t('your_withdraw_request_has_been_submitted_successfully'),
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
      setIsError(false)
      setIsLoading(false)
    }
  }

  if (isFetching) {
    return <>
      <Card minH={"80vh"}>
        <Center py={"10px"}>
          <Spinner color={tenancy?.mainColor || colors.primary}/>
        </Center>
      </Card>
    </>
  }
  
  return (
    <>
      <Card>
        <Center pt={"5px"} flexDir={'column'}>
          <Text color={colors.default.gray}>{t("last_update")} {moment(accountAffiliateDetail?.lastModificationTime).format("hh:mm, DD MMM YYYY")}</Text>
          <Box pos={"relative"}>
            <Image alt='affiliate' maxH={"190px"} src={affiliateWallet.src}/>
            <Text textTransform={'uppercase'} pos={"absolute"} top={"62px"} left={"60px"}
              fontSize={15} fontWeight={700}>
              {t("affiliate-wallet")}
            </Text>
            <Box pos={"absolute"} bottom={4} left={8}>
              <Text fontSize={15} fontWeight={500}>{tenancy?.currency}</Text>
              <Text fontSize={23} fontWeight={700}>{convertDecimalNum(accountAffiliateDetail?.affiliateWallet.walletAmount) ?? "0.00"}</Text>
            </Box>
          </Box>
        </Center>
        <Box sx={affiliateContainer} mt={"10px"}>
          <Text fontWeight={700}>{t("affiliate_detail")}</Text>
          <Flex sx={affiliateTable} borderBottom={`1px solid ${colors.default.table}`}>
            <Text>{t("total_invite")}</Text>
            <Text>{accountAffiliateDetail?.affiliateDetail.totalInvite}</Text>
          </Flex>
          <Flex sx={affiliateTable} borderBottom={`1px solid ${colors.default.table}`}>
            <Text>{t("tier")}</Text>
            <Text>{accountAffiliateDetail?.affiliateDetail.tierLevel}</Text>
          </Flex>
          <Flex sx={affiliateTable}>
            <Text>{t("tier_reward")}</Text>
            <Text>{accountAffiliateDetail?.affiliateDetail.tierReward ?? "0%"}</Text>
          </Flex>
        </Box>
        <Box sx={affiliateContainer} mt={"20px"}>
          <Text fontWeight={700}>{t("terms_&_condition")}</Text>
          <Box mt={"7px"} ml={"10px"} fontSize={15}>
            {accountAffiliateDetail?.conditions.map((item, i) => (
              <Flex key={i} alignItems={'center'} gap={2}>
                {item.value ? <CheckCircleIcon color={colors.default.success}/> : <IoCloseCircle style={{color: colors.default.lightRed, alignSelf: "flex-start", marginTop: "3px"}}/>}
                <Text color={item.value ? colors.default.success : colors.error}>{item.text}</Text>
              </Flex>
            ))}
          </Box>
        </Box>
        <Box sx={affiliateContainer} pt={"20px"}>
          <ResponsiveNote fontSize={13}>
            <ListItem>{t("affiliate-note-1")}</ListItem>
            <ListItem>{t("affiliate-note-2")}</ListItem>
          </ResponsiveNote>
        </Box>
        <Center flexDir={'column'} px={2} pb={"20px"} w={"100%"} bgColor={colors.default.white}>
          <Center gap={3} pt={3} w={["100%","100%","500px","500px"]}>
            <CurrencyInput className='currency-input' decimalsLimit={2} decimalScale={2} allowDecimals={true} value={amountInput}
              disableAbbreviations={true} onValueChange={(text: any) => setAmountInput(text)}
              intlConfig={{ locale: 'en-US'}}/>
            <DefaultButton w={"100%"} onClick={submitAmount}>
              {isLoading ? <Spinner size={"sm"}/> : t('withdraw')}
            </DefaultButton>
          </Center>
          {isError && 
            <ErrorText alignSelf={["flex-start","flex-start","center","center"]} justifySelf={"center"}>{t("required")}</ErrorText>
          }
        </Center>
      </Card>
    </>
  )
}

export default Affiliate

const affiliateTable = {
  p:"10px",
  justifyContent:'space-between',
}

const affiliateContainer = {
  px:"10px",
  fontSize:14,
}