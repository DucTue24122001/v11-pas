import Card from "@/components/utils/Card"
import DefaultButton from "@/components/utils/DefaultButton"
import { ErrorText, SuccessfulText } from "@/components/utils/NotificationText"
import ResponsiveNote from "@/components/utils/ResponsiveNote"
import httpClient from "@/configs/axios/api"
import { colors } from "@/configs/chakra-ui/color"
import { accountAction } from "@/configs/redux/account-slice"
import { RootState } from "@/configs/redux/store"
import { DepositType } from "@/constants/enum"
import { numberWithCommas } from "@/helpers/functions"
import { Box, Flex, ListItem, Text, useToast } from "@chakra-ui/react"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { SyntheticEvent, useState } from "react"
import CurrencyInput from "react-currency-input-field"
import { useDispatch, useSelector } from "react-redux"


const NetBankingWithdraw = ({bankInfo}: any) => {
  const {accountBalance, reqTurnover}: any = useSelector((state: RootState) => state.account)
  const {language}: any = useSelector((state: RootState) => state.client)
  const toast = useToast({
    duration: 3000,
    isClosable: true,
  })
  const router = useRouter()
  const [amountInput, setAmountInput] = useState<any>("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState("")
  const dispatch = useDispatch()
  const t = useTranslations()

  const resetForm = () => {
    setError("")
    setAmountInput("")
  }

  const handleWithdrawSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    setSuccessMsg("")
    if (!amountInput) {
      setError("required")
      return
    }
    try {
      setError("")
      setIsLoading(true)
      const res: any = await httpClient.Bank.bankTransaction({
        type: "WITHDRAW",
        amount: amountInput,
        principalAmount: amountInput,
        paymentCategory: DepositType.NetBanking,
        playerBankName: bankInfo.bankName,
        playerBankShortName: bankInfo.bankShortName,
        playerAccountName: bankInfo.accountName,
        playerAccountNumber: bankInfo.accountNumber,
      })
      if (res.success) {
        resetForm()
        setSuccessMsg("your_withdraw_request_has_been_submitted_successfully")
        dispatch(accountAction.setAccountBalance(Number(accountBalance)-Number(amountInput)))
        toast({
          status: 'success',
          title: t('your_withdraw_request_has_been_submitted_successfully'),
          duration: 3000,
          isClosable: true,
        })
      } else {
        setError(res.error.message)
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
      <Card p={["40px 10px","40px 10px","40px 10px","40px 60px","40px 60px"]} gap={5}>
        <form onSubmit={handleWithdrawSubmit}>
        <Text fontSize={["14px","14px","14px","16px","16px"]} mb={"10px"} fontWeight={"bold"}>{t('bank_info')}</Text>
        <Flex gap={"10px"} p={["10px","15px","25px","25px"]} display={["none","none","none","flex","flex"]} flexDir={"column"} maxW={"400px"} bgColor={colors.default.bg}
          fontSize={"15px"} borderRadius={10} mb={"40px"}>
          <Flex>
            <Text minW={"140px"}>{t('bank_name')}</Text>
            <Text fontWeight={'bold'}>{bankInfo.bankName} ({bankInfo.bankShortName})</Text>
          </Flex>
          <Flex>
            <Text minW={"140px"}>{t('account_name')}</Text>
            <Text fontWeight={'bold'}>{bankInfo.accountName}</Text>
          </Flex>
          <Flex>
            <Text minW={"140px"}>{t('account_number')}</Text>
            <Text fontWeight={'bold'}>{bankInfo.accountNumber}</Text>
          </Flex>
        </Flex>
        <Flex flexDir={'column'} display={["flex","flex","flex","none","none"]} fontSize={"14px"} mb={10}>
          <Flex sx={resBankInfo}>
            <Text>{t('bank_name')}</Text>
            <Text>{bankInfo.bankName} ({bankInfo.bankShortName})</Text>
          </Flex>
          <Flex sx={resBankInfo}>
            <Text>{t('account_name')}</Text>
            <Text>{bankInfo.accountName}</Text>
          </Flex>
          <Flex sx={resBankInfo}>
            <Text>{t('account_number')}</Text>
            <Text>{bankInfo.accountNumber}</Text>
          </Flex>
        </Flex>
        <Box maxW={["100%","100%","100%","400px","400px"]}>
          <Text fontSize={["14px","14px","14px","16px","16px"]} mb={"10px"} fontWeight={["0","0","0","bold","bold"]}>{t('withdraw_amount')}</Text>
          <Box mb={"20px"}>
            <CurrencyInput className='currency-input' decimalsLimit={2} decimalScale={2} allowDecimals={true} value={amountInput}
              disableAbbreviations={true} onValueChange={(text: any) => setAmountInput(text)}
              intlConfig={{ locale: 'en-US'}}/>
            <ErrorText>{t(`${error}`)}</ErrorText>
            <SuccessfulText display={["block", "block", "block","none"]}>{t(`${successMsg}`)}</SuccessfulText>
            <ErrorText>{t('min_max')}: {numberWithCommas(bankInfo.minimumWithdraw)}/{numberWithCommas(bankInfo.maximumWithdraw)}</ErrorText>
          </Box>
          {/* <Text fontSize={"16px"} my={"10px"} fontWeight={"bold"}>Password</Text>
          <DefaultInputPassword mb={"20px"}/> */}
          <DefaultButton type={"submit"} h={["50px","50px","50px","40px","40px"]} isLoading={isLoading} isDisabled={isLoading}>
            <Text textTransform={"uppercase"}>{t('withdraw')}</Text>
          </DefaultButton>
        </Box>
        </form>
        <ResponsiveNote pb={["50px","50px","0px","0px"]}>
          {language == "EN" && <ListItem>Withdrawal are subjected to a {reqTurnover}x wagering requirement.</ListItem>}
          {language == "MY" && <ListItem>သွင်းငွေ {reqTurnover}x ဆမှသာငွေထုတ်ခွင့်ရှိသည်.</ListItem>}
          {language == "KM" && <ListItem>ការដកប្រាក់ជាកម្មវត្ថុនៃលក្ខខណ្ឌដែលតម្រូវឱ្យដាក់ភ្នាល់ទឹកប្រាក់ផ្តល់ជូនបន្ថែមគុណនឹង {reqTurnover}x.</ListItem>}
          <ListItem>{t('withdrawing')}</ListItem>
        </ResponsiveNote>
      </Card>
    )
}

export default NetBankingWithdraw

const resBankInfo = {
  justifyContent: 'space-between',
  py: 4,
  borderBottom: `1px solid ${colors.default.bg}`
}