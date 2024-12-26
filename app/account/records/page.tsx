"use client"
/* eslint-disable react/no-children-prop */
import { Box, Flex, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { useBreakpoint } from '@/configs/providers/ViewportProvider'
import httpClient from '@/configs/axios/api'
import { DropdownItem, SelectDropdown } from '@/components/utils/SelectDropdown'
import { RootState } from '@/configs/redux/store'
import { useTranslations } from 'next-intl'
import { accountAction } from '@/configs/redux/account-slice'
import { format } from 'date-fns'
import Card from '@/components/utils/Card'
import DefaultButton from '@/components/utils/DefaultButton'
import DefaultSelectDateInput from '@/components/utils/calendar/DefaultSelectDateInput'
import RecordsDisplay from '@/components/account/records/RecordsDisplay'
import Pagination from '@/components/utils/pagination/Pagination'
import ResponsiveRecordDisplay from '@/components/account/records/ResponsiveRecordDisplay'
import RecordsTableDisplay from '@/components/account/records/RecordsTableDisplay'

const Records = () => {
  const pageSize = 10
  const [isShowCalendar, setIsShowCalendar] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const {startDateRecord, endDateRecord} = useSelector((state: RootState)=> state.account)
  const [paymentTypeValue, setPaymentTypeValue] = useState("")
  const [transactionTypeValue, setTransactionTypeValue] = useState("")
  const [isTransactionTypeDropdown, setIsTransactionTypeDropdown] = useState(false)
  const [isPaymentTypeDropdown, setIsPaymentTypeDropdown] = useState(false)
  const dispatch = useDispatch()
  const accountBreakpoint = useBreakpoint()
  const t = useTranslations()

  const fetchRecords = async (page: number) => {
    dispatch(accountAction.fetchingRecordStatus(true))
    try {
      const res: any = await httpClient.Bank.getRecords({
        transactionType: transactionTypeValue,
        paymentType: paymentTypeValue,
        transactionFrom: startDateRecord,
        transactionTo: endDateRecord,
        skipCount: (page - 1) * pageSize,
        maxResultCount: pageSize,
      })
      if (res.success) {
        setTotalCount(res.result.totalCount)
        dispatch(accountAction.setRecordList(res.result.items))
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(accountAction.fetchingRecordStatus(false))
    }
  }

  useEffect(() => {
    fetchRecords(currentPage)
  }, [])

  const handlePageChange = async (page: number) => {
    setCurrentPage(page)
    fetchRecords(page)
  }

  const searchingRecordHandle = async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    setCurrentPage(1)
    fetchRecords(1)
  }

  const selectDateHandler = (dateValue: any) => {
    const startDate = new Date(dateValue[0])
    const endDate = new Date(dateValue[1])
    
    dispatch(accountAction.setSearchingDate({startDate: format(startDate, 'yyyy-MM-dd'), endDate: format(endDate, 'yyyy-MM-dd')}))
  }

  const selectPaymentType = (type: any) => {
    setIsPaymentTypeDropdown(false)
    setPaymentTypeValue(type.value)
  }
  const selectTransactionType = (type: any) => {
    setIsTransactionTypeDropdown(false)
    setTransactionTypeValue(type.value)
  }

  // if (!isLogin) return null

  return (
    <>
      <Card p={["5px","5px","50px","50px"]} gap={5} mb={isShowCalendar ? 60 : 0}>
        <Flex maxW={"100%"} gap={"10px"} flexDir={["column","column","column","row"]}>
          <Box w={["100%","100%","100%","25%"]}>
            <Text sx={recordTitle}>{t('transaction_type')}</Text>
            <SelectDropdown isDropdown={isTransactionTypeDropdown} closeDropdown={() => setIsTransactionTypeDropdown(false)} openDropdown={() => setIsTransactionTypeDropdown(true)}
              currentSelect={<Text>{!transactionTypeValue ? t('all') : t(`${transactionTypeValue}`)}</Text>}
              dropdownList={transactionTypeDummy.map((type, i) => (
                <DropdownItem key={i} id={type.value} currentId={transactionTypeValue} 
                onClick={() => selectTransactionType(type)}>{t(`${type.name}`)}</DropdownItem>
              ))}/>
          </Box>
          <Box w={["100%","100%","100%","25%"]}>
            <Text sx={recordTitle}>{t('transaction_period')}</Text>
            <DefaultSelectDateInput selectDate={selectDateHandler} isSearchMonth={true} setShowCalendar={(value: any) => setIsShowCalendar(value)}/>
          </Box>
          <Box w={["100%","100%","100%","25%"]}>
            <Text sx={recordTitle}>{t('payment_type')}</Text>
            <SelectDropdown isDropdown={isPaymentTypeDropdown} openDropdown={() => setIsPaymentTypeDropdown(true)} closeDropdown={() => setIsPaymentTypeDropdown(false)}
              currentSelect={<Text>{!paymentTypeValue ? t('all') : t(paymentTypeValue.toLowerCase())}</Text>}
              dropdownList={
                paymentTypeDummy.map((type, i) => (
                <DropdownItem key={i} id={type.value} currentId={paymentTypeValue} onClick={() => selectPaymentType(type)}>
                  {t(type.name)}
                </DropdownItem>
              ))}/>
          </Box>
          <DefaultButton h={"35px"} alignSelf={["flex-start","flex-start","flex-start","flex-end"]} w={["100%","100%","100%","12%"]}
            onClick={searchingRecordHandle}>
            <AiOutlineSearch/>
            <Text ml={2}>{t('search')}</Text>
          </DefaultButton>
        </Flex>
        {accountBreakpoint ? <ResponsiveRecordDisplay currentPage={currentPage}/> : <RecordsTableDisplay currentPage={currentPage}/>}
        <Flex justifyContent={'center'} mb={20}>
          <Pagination
          pageSize={pageSize}
          totalCount={totalCount}
          currentPage={currentPage}
          onPageChange={(page: any) => handlePageChange(page)}/>
        </Flex>
      </Card>
    </>
  )
}

export default Records

const paymentTypeDummy = [
  {value: "", name: "all"},
  {value: "Deposit", name: "deposit"},
  {value: "Withdraw", name: "withdraw"},
  {value: "Promotion", name: "promotion"},
]

const transactionTypeDummy = [
  {value: "", name: "all"},
  {value: "accepted", name: "accepted"},
  {value: "rejected", name: "rejected"},
  {value: "pending", name: "pending"},
]

const recordTitle = {
  fontWeight: ["0","0","bold","bold"],
  mb: [1,1,3,3],
  fontSize: 15,
}