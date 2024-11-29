import { Box, Flex, Image, Text, useToast } from '@chakra-ui/react'
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DepositType } from '@/constants/enum'
import httpClient from '@/configs/axios/api'
import { ErrorText } from '@/components/utils/NotificationText'
import CurrencyInput from 'react-currency-input-field'
import DefaultInput from '@/components/utils/DefaultInput'
import DefaultFileInput from '@/components/utils/DefaultFileInput'
import { colors } from '@/configs/chakra-ui/color'
import { RootState } from '@/configs/redux/store'
import { useTranslations } from 'next-intl'
import { getBase64, numberWithCommas } from '@/helpers/functions'
import { accountAction } from '@/configs/redux/account-slice'
import { DropdownItem, SelectDropdown } from '@/components/utils/SelectDropdown'
import DefaultButton from '@/components/utils/DefaultButton'
import ResponsiveNote from '@/components/utils/ResponsiveNote'
import AgentBankItem from './AgentBankItem'
import { useRouter } from 'next/navigation'

const NetBankingDeposit = () => {
    const {userNetBankingList, currentAgentBankSelect, bankTypeList, currentBankTypeSelect, depositAgentNetBankingFilter} 
      = useSelector((state: RootState) => state.account)
    const [isDropdown, setIsDropdown] = useState(false)
    const [currentBankSelectId, setCurrentBankSelectId] = useState<any>("")
    const [depositAmount, setDepositAmount] = useState("")
    const [memoInput, setMemoInput] = useState("")
    const [base64Img, setBase64Img] = useState<any>("")
    const [currentImg, setCurrentImg] = useState<any>(null)
    const [currentBankSelect, setCurrentBankSelect] = useState<any>({})
    const [isLoading, setIsLoading] = useState(false)
    const [isErr, setIsErr] = useState(false)
    const [errorForm, setErrorForm] = useState({
      amount: "",
      bank: "",
      image: ""
    })
    const [responseError, setResponseError] = useState("")
    const toast = useToast()
    const router = useRouter()
    const t = useTranslations()
    const dispatch = useDispatch()
  
    useEffect(() => {
      setErrorForm({
        ...errorForm,
        amount: depositAmount ? "" : t('deposit_amount_is_required'),
        bank: currentBankSelectId ? "" : t("bank_is_required"),
        image: currentImg ? "" : t("receipt_is_required"),
      })
    },[depositAmount, currentBankSelectId, currentImg])
  
    const isFormValid = useMemo(() => {
      return Object.values(errorForm).every(item => item === "")
    },[errorForm])
  
    const resetForm = () => {
      setDepositAmount("")
      setMemoInput("")
      setIsErr(false)
      setCurrentBankSelectId("")
      setCurrentBankSelect({})
      setCurrentImg(null)
      setBase64Img("")
      setResponseError("")
    }
  
    const selectBankHandler = (bank: any, index: number) => {
      setIsDropdown(false)
      setCurrentBankSelectId(index + 1)
      setCurrentBankSelect(bank)
    }
  
    const imageInputHandler = (file: any) => {
      setCurrentImg(file)
      getBase64(file).then((res: any) => {
        setBase64Img(res)
      }).catch(err => {
        setBase64Img("")
      });
    }
  
    const submitHandler = async (e: React.SyntheticEvent) => {
      e.preventDefault()
      if(!isFormValid) {
        setIsErr(true)
        return
      }
      setIsLoading(true)
      try {
        const res: any = await httpClient.Bank.bankTransaction({
          type: "DEPOSIT",
          paymentCategory: DepositType.NetBanking,
          principalAmount: depositAmount,
          amount: depositAmount,
          agentBankName: currentAgentBankSelect?.bankName,
          agentBankShortName: currentAgentBankSelect?.bankShortName,
          agentAccountName: currentAgentBankSelect?.accountName,
          agentAccountNumber: currentAgentBankSelect?.accountNumber,
          playerBankName: currentBankSelect.bankName,
          playerBankShortName: currentBankSelect.bankShortName,
          playerAccountName: currentBankSelect.accountName,
          playerAccountNumber: currentBankSelect.accountNumber,
          bankReceipt: base64Img,
          memo: memoInput,
        })
        if (res.success) {
          resetForm()
          toast({
            status: "success",
            title: t('your_deposit_request_has_been_submit'),
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
    <>
      <Flex w={"100%"} flexDir={'column'} bgColor={"#fff"} borderRadius={10} 
      p={"10px"} >
        <Flex flexDir={'column'} maxW={"500px"}>
          <Text sx={depositHeading}>{t('bank_list')}</Text>
          <Flex sx={depositInfoSection} overflow={"auto"} gap={2} className='styled-scroll'>
            {bankTypeList.map((bank, i) => (
              <Flex key={i} minW={"80px"} minH={"80px"} borderRadius={'10px'} alignItems={'center'} flexDir={'column'} justifyContent={'center'}
                gap={2} cursor={'pointer'} transition={".3s"}
                border={currentBankTypeSelect?.id === bank?.id ? `2px solid ${colors.primary}` : `2px solid #fff`}
                bgColor={currentBankTypeSelect?.id === bank?.id ? "#fff" : "#f2f5f9"} 
                onClick={() => dispatch(accountAction.setCurrentBankTypeSelect(bank))}>
                <Image alt='netbanking' src={bank?.logo} h={"30px"}/>
                <Text fontSize={["12px","12px","12px","16px"]} fontWeight={600} textOverflow={"ellipsis"} overflow={'hidden'} whiteSpace={"nowrap"} w={"80px"}
                  textAlign={'center'} px={"7px"}>
                  {bank?.bankShortName}
                </Text>
              </Flex>
            ))}
          </Flex>
        </Flex>
        <form onSubmit={submitHandler}>
        <Flex flexDir={'column'} fontSize={"1rem"} maxW={"500px"}>
          <Text sx={depositHeading}>
            {t('bank')}
          </Text>
          {depositAgentNetBankingFilter.map((bank, i) => (
            <AgentBankItem key={i} bank={bank}/>
          ))}
        </Flex>
        <Flex flexDir={'column'} maxW={"500px"}>
          <Text sx={depositHeading}>{t('select_bank')}</Text>
          <Box sx={depositInfoSection}>
            <SelectDropdown isDropdown={isDropdown} closeDropdown={() => setIsDropdown(false)} openDropdown={() => setIsDropdown(true)}
              currentSelect={!currentBankSelectId ? <Text fontWeight={"thin"}>{t('select_bank')}</Text> 
              : <Text>{currentBankSelect.accountName} {currentBankSelect.accountNumber} ({currentBankSelect.bankShortName})</Text>}
              dropdownList={userNetBankingList.length > 0 ? userNetBankingList.map((bank: any, i: number) => (
                <DropdownItem key={i}
                  id={i + 1}
                  currentId={currentBankSelectId}
                  onClick={() => selectBankHandler(bank, i)}>
                  <Text>{bank.accountName} {bank.accountNumber} ({bank.bankShortName})</Text>
                </DropdownItem>
              )) : 
              <DropdownItem currentId={currentBankSelectId} onClick={() => router.push(`/account/myBankAccount`)}>
                <Text>{t('You_dont_have_any_bank')}</Text>
              </DropdownItem>}
            /> 
            {isErr && <ErrorText>{t(`${errorForm.bank}`)}</ErrorText>}
          </Box>
        </Flex>
        <Flex flexDir={'column'} maxW={"500px"}>
          <Text sx={depositHeading}>{t('amount')}</Text>
          <Box sx={depositInfoSection}>
            {/* <DefaultInput pattern="[0-9,.]*" value={depositAmount} onChange={handleDepositAmount}/> */}
            <CurrencyInput className='currency-input' decimalsLimit={2} decimalScale={2} allowDecimals={true} value={depositAmount}
              disableAbbreviations={true} onValueChange={(text: any) => setDepositAmount(text)}
              intlConfig={{ locale: 'en-US'}}/>
            {isErr && <ErrorText>{errorForm.amount}</ErrorText>}
            {currentAgentBankSelect && <Text mt={"10px"} fontWeight={0} color={"#ce4242"}>
              {t('min_max')}: {numberWithCommas(currentAgentBankSelect.minimumDeposit)}/{numberWithCommas(currentAgentBankSelect.maximumDeposit)}
            </Text>}
          </Box>
        </Flex>
        <Flex flexDir={'column'} maxW={"500px"}>
          <Text sx={depositHeading}>{t('deposit_memo')}</Text>
          <Box sx={depositInfoSection}>
            <DefaultInput placeholder={t('enter_memo')} value={memoInput} 
            onChange={(e: ChangeEvent<HTMLInputElement>) => setMemoInput(e.target.value)}/>
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
          <DefaultButton type={"submit"} color={"#fff"} _focusVisible={{outline: "none"}} w={"100%"} fontSize={"15px"} isDisabled={isLoading}>
            <Text textTransform={'uppercase'}>{t('deposit')}</Text>
          </DefaultButton>
          <ErrorText>{responseError}</ErrorText>
        </Box>
        </form>
      <ResponsiveNote>
        <Text>{t('notification')}</Text>
      </ResponsiveNote>
    </Flex>
    </>
  )
}

export default NetBankingDeposit

const depositInfoSection = {
  borderLeft: ["none","none","1px solid #d6d6d6","1px solid #d6d6d6"],
  p: ["5px 0 8px","8px 0 5px","5px 0 20px 20px","5px 0 20px 20px"],
  maxW:["100%","100%","500px","500px"],
  flexWrap:["nowrap","nowrap","wrap","wrap"],
  mb: ["10px","10px","0","0"]
}

const depositHeading = {
  ml: ["0px","0px","15px","15px"],
  mb: "2px",
  fontSize: ["1rem", "1rem","16px","16px"],
  fontWeight: [0,0,700,700]
}