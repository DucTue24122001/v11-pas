import { Flex, Text, Image, Box, Button, useToast } from '@chakra-ui/react'
import React, { useEffect, useMemo, useState } from 'react'
import CurrencyInput from 'react-currency-input-field'
import {saveAs} from "file-saver";
import { useDispatch, useSelector } from 'react-redux'
import { DepositType } from '@/constants/enum'
import { useTenancy } from '@/configs/providers/TenancyProvider';
import httpClient from '@/configs/axios/api';
import CopyButton from '@/components/utils/CopyButton';
import { ErrorText } from '@/components/utils/NotificationText';
import DefaultFileInput from '@/components/utils/DefaultFileInput';
import ResponsiveNote from '@/components/utils/ResponsiveNote';
import { colors } from '@/configs/chakra-ui/color';
import { RootState } from '@/configs/redux/store';
import { useTranslations } from 'next-intl';
import { convertDecimalNum, getBase64, numberWithCommas } from '@/helpers/functions';
import { accountAction } from '@/configs/redux/account-slice';
import DefaultButton from '@/components/utils/DefaultButton';

const CryptoDeposit = () => {
  const {currentAgentCryptoSelect, agentCryptoBankList} = useSelector((state: RootState) => state.account)
  const [amountInput, setAmountInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [responseError, setResponseError] = useState("")
  const [currentImg, setCurrentImg] = useState<any>(null)
  const [base64Img, setBase64Img] = useState<any>("")
  const [isErr, setIsErr] = useState(false)
  const tenancy =  useTenancy()
  const [errorForm, setErrorForm] = useState({
    amount: "",
    image: ""
  })
  const t = useTranslations()
  const dispatch = useDispatch()
  const toast = useToast()

  useEffect(() => {
    setErrorForm({
      ...errorForm,
      amount: amountInput ? "" : 'deposit_amount_is_required',
      image: currentImg ? "" : "receipt_is_required",
    })
  }, [amountInput, currentImg])

  const isFormValid = useMemo(() => {
    return Object.values(errorForm).every(item => item === "")
  },[errorForm])

  const resetForm = () => {
    setAmountInput("")
    setIsErr(false)
    setCurrentImg(null)
    setBase64Img("")
    setResponseError("")
  }

  const downloadFile = async (url: string) => {
    saveAs(url + '?not-from-cache-please', `qr-${currentAgentCryptoSelect?.cryptoName}`)
  }

  const imageInputHandler = (file: any) => {
    setCurrentImg(file)
    getBase64(file).then((res: any) => {
      setBase64Img(res)
    }).catch(err => {
      setBase64Img("")
    });
  }

  const onSubmitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    if(!isFormValid) {
      setIsErr(true)
      return
    }
    setIsLoading(true)
    try {
      const res: any = await httpClient.Bank.bankTransaction({
        type: "DEPOSIT",
        paymentCategory: DepositType.Crypto,
        principalAmount: amountInput,
        amount: amountInput,
        agentBankName: currentAgentCryptoSelect?.cryptoName,
        agentBankShortName: currentAgentCryptoSelect?.cryptoShortName,
        agentAccountName: currentAgentCryptoSelect?.displayName,
        agentAccountNumber: currentAgentCryptoSelect?.cryptoNumber,
        playerBankName: "",
        playerBankShortName: "",
        playerAccountName: "",
        playerAccountNumber: "",
        bankReceipt: base64Img,
        memo: "",
      })
      if (res.success) {
        resetForm()
        toast({
          status: "success",
          title: t('your_deposit_request_has_been_submit'),
          duration: 3000,
          isClosable: true,
        })
      } else {
        setResponseError(res.error.message)
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
    <Flex h={"fit-content"} >
      <Flex w={"100%"} flexDir={'column'} bgColor={"#fff"} borderRadius={10} 
      p={["10px","10px","10px","30px 25px","30px 25px"]} >
        <Flex flexDir={'column'} maxW={"500px"}>
          <Text sx={depositHeading}>Network</Text>
          <Flex sx={depositInfoSection} gap={2} flexWrap={"wrap"}>
            {agentCryptoBankList.map((crypto, i) => (
              <Flex key={i} 
                minW={"80px"} minH={"80px"} borderRadius={'10px'} alignItems={'center'} flexDir={'column'} justifyContent={'center'}
                gap={2} cursor={'pointer'} transition={".3s"}
                border={currentAgentCryptoSelect?.id === crypto.id ? `2px solid ${colors.primary}` : `2px solid #fff`}
                bgColor={currentAgentCryptoSelect?.id === crypto.id ? "#fff" : "#f2f5f9"}
                onClick={() => dispatch(accountAction.setCurrentAgentCryptoSelect(crypto))}>
                <Image alt='netbanking' src={crypto.logo} h={"30px"}/>
                <Text fontWeight={600} textOverflow={"ellipsis"} overflow={'hidden'} whiteSpace={"nowrap"} w={"80px"}
                  fontSize={["12px","12px","12px","16px"]}
                  textAlign={'center'}>
                  {crypto.cryptoShortName}
                </Text>
              </Flex>
            ))}
          </Flex>
        </Flex>
        <form onSubmit={onSubmitHandler}>
          <Flex maxW={"500px"} flexDir={'column'}>
            <Text sx={depositHeading}>Wallet Address</Text>
            <Flex sx={depositInfoSection} flexDir={'column'} alignItems={['center','center','flex-start','flex-start']} gap={4}>
              <Flex fontWeight={[0,0,700,700]} gap={3} flexWrap={"wrap"} alignItems={'center'}>
                <Text>Code : </Text>
                <Text color={colors.primary}>{currentAgentCryptoSelect?.cryptoNumber}</Text>
                <CopyButton copyText={currentAgentCryptoSelect?.cryptoNumber} h={"30px"}/>
              </Flex>
              {currentAgentCryptoSelect?.imageUrl && <Flex flexDir={'column'}>
                <Image alt='qr-code' boxSize={"120px"} mr={["30px","30px","0px","0px"]}
                  src={currentAgentCryptoSelect?.imageUrl} />
                <Button colorScheme='whatsapp' w={"110px"} h={"30px"} padding={"5px"} alignSelf={'center'}
                  display={["block","block","none","none"]} mr={["30px","30px","0px","0px"]} fontWeight={400}
                  onClick={() => downloadFile(currentAgentCryptoSelect?.imageUrl)}>
                  {t("save_qr")}
                </Button>
              </Flex>}
            </Flex>
          </Flex>
          <Flex flexDir={['row','row','column','column']} maxW={"500px"} gap={2}>
            <Box w={["50%","50%","100%","100%"]}>
              <Text sx={depositHeading}>{t("amount")}</Text>
              <Flex sx={depositInfoSection} flexDir={"column"}>
                <CurrencyInput className='currency-input' decimalsLimit={2} decimalScale={2} allowDecimals={true} value={amountInput}
                disableAbbreviations={true} onValueChange={(text: any) => setAmountInput(text)}
                intlConfig={{ locale: 'en-US'}} />
                {isErr && <ErrorText>{t(`${errorForm.amount}`)}</ErrorText>}
                <Text mt={"10px"} fontWeight={0} color={"#ce4242"}>
                  {t('min_max')}: {numberWithCommas(currentAgentCryptoSelect?.minimumDeposit)}/{numberWithCommas(currentAgentCryptoSelect?.maximumDeposit)}
                </Text>
              </Flex>
            </Box>
            <Box w={["50%","50%","100%","100%"]}>
              <Text sx={depositHeading}>{tenancy?.currency} {t("received")}</Text>
              <Flex sx={depositInfoSection}>
                <Flex sx={calculateItem} h={"50px"}>
                  <Text sx={calculateText}>{convertDecimalNum(+(Math.floor(+amountInput * 100)/100).toFixed(2) * currentAgentCryptoSelect?.rate) || 0.00}</Text>
                </Flex>
              </Flex>
            </Box>
          </Flex>
          <Flex flexDir={'column'} maxW={"500px"}>
            <Text sx={depositHeading}>{t('upload_receipt')}</Text>
            <Flex sx={depositInfoSection} width={"600px"} w={"100%"} flexDir={'column'}>
              <DefaultFileInput imageInputChange={imageInputHandler} currentImg={currentImg}/>
              {isErr && <ErrorText>{t(`${errorForm.image}`)}</ErrorText>}
            </Flex>
          </Flex>
          <Box p={["5px 0 20px","5px 0 20px","5px 0 20px 20px","5px 0 20px 20px"]} maxW={"500px"}>
            <DefaultButton type={"submit"} _focusVisible={{outline: "none"}} w={"100%"} fontSize={"15px"} isDisabled={isLoading}>
              <Text textTransform={'uppercase'}>{t('deposit')}</Text>
            </DefaultButton>
            <ErrorText>{responseError}</ErrorText>
          </Box>
          <ResponsiveNote>
            <Text>1. USDT {t("to")} {tenancy?.currency} {t("rate_is")} 1 : {currentAgentCryptoSelect?.rate}</Text>
            <Text>2. {t('notification')}</Text>
          </ResponsiveNote>
        </form>
      </Flex>
    </Flex>
  )
}

export default CryptoDeposit

const depositHeading = {
  ml: ["0px","0px","15px","15px"],
  mb: "2px",
  fontSize: ["1rem", "1rem","16px","16px"],
  fontWeight: [0,0,700,700]
}

const depositInfoSection = {
  borderLeft: ["none","none","1px solid #d6d6d6","1px solid #d6d6d6"],
  p: ["5px 0 20px","5px 0 20px","5px 0 20px 20px","5px 0 20px 20px"],
  maxW:["100%","100%","500px","500px"]
}

const calculateItem = {
  p:"5px 10px",
  borderRadius:5,
  fontWeight:700,
  bgColor:"#d9dee4",
  flexDir:'column',
  w:"100%",
  alignItem: "center",
  justifyContent: 'center',
}

const calculateText = {
  fontFamily: "Teko,sans-serif",
  color: colors.primary,
  fontSize: "24px",
  fontWeight: 500
}