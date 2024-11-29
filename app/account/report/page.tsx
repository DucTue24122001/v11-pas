"use client"
import ReportDisplay from '@/components/account/report/ReportDisplay'
import DefaultSelectDateInput from '@/components/utils/calendar/DefaultSelectDateInput'
import DefaultButton from '@/components/utils/DefaultButton'
import httpClient from '@/configs/axios/api'
import { colors } from '@/configs/chakra-ui/color'
import { useBreakpoint } from '@/configs/providers/ViewportProvider'
import { currentShowEnum, transactionReportAction } from '@/configs/redux/report-slice'
import { RootState } from '@/configs/redux/store'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, Flex, Spinner, Text, useToast } from '@chakra-ui/react'
import moment from 'moment'
import { useTranslations } from 'next-intl'
import React, { useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'

const isHaftTime = moment().utc().add("h", 1).format("DD/MM/YYYY HH:mm:ss") >= moment().startOf('day').utc().add("h", 12).format("DD/MM/YYYY HH:mm:ss")

const Report = () => {
  const {startDateReport ,endDateReport, isFetching, toggleShowPlatformAndGame, currentPlatformName} 
    = useSelector((state: RootState) => state.report)
  const dispatch = useDispatch()
  const mobileBreakpoint = useBreakpoint()
  const toast = useToast()

  const t = useTranslations()
  const [searchDatePeriod, setSearchDatePeriod] = useState({
    start: `${isHaftTime ? moment().utc().startOf("week").format("YYYY-MM-DD") : moment().utc().startOf("week").subtract(1, "d").format("YYYY-MM-DD")}`,
    end: `${isHaftTime ? moment().utc().format("YYYY-MM-DD") : moment().utc().subtract(1, 'd').format("YYYY-MM-DD")}`
  })
  const [confirmSearchDatePeriod, setConfirmSearchDatePeriod] = useState({
    start: `${isHaftTime ? moment().utc().startOf("week").format("YYYY-MM-DD") : moment().utc().startOf("week").subtract(1, "d").format("YYYY-MM-DD")}`,
    end: `${isHaftTime ? moment().utc().format("YYYY-MM-DD") : moment().utc().subtract(1, 'd').format("YYYY-MM-DD")}`
  })

  const resetState = () => {
    dispatch(transactionReportAction.handleToggleShowPlatformAndGame(currentShowEnum.PLATFORM))
    dispatch(transactionReportAction.setCurrentPage(1))
    dispatch(transactionReportAction.setTotalCount(0))
  }

  useEffect(() => {
    resetState()
    if (mobileBreakpoint) {
      dispatch(transactionReportAction.setPagesize(20))
    } else {
      dispatch(transactionReportAction.setPagesize(100))
    }
  },[mobileBreakpoint])

  const fetchingTransactionReport = async () => {
    dispatch(transactionReportAction.handleFetchingData(true))
    try {
      const res: any = await httpClient.TransactionReport.getReportWinLoss(startDateReport, endDateReport)
      if (res.success) {
        const transactionInfo = res.result
        dispatch(transactionReportAction.setTotalTransitionInfo(transactionInfo.data))
        dispatch(transactionReportAction.setGrandTotalInfo({
          totalProfitLoss: transactionInfo.totalProfitLoss,
          totalTurnover: transactionInfo.totalTurnover,
          totalWinloss: transactionInfo.totalWinloss,
        }))
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
      dispatch(transactionReportAction.handleFetchingData(false))
    }
  }
  
  useEffect(() => {
    fetchingTransactionReport()
  }, [])

  const selectDateHandler = (date: any) => {
    const startDate = moment(new Date(date[0])).format('yyyy-MM-DD')
    const endDate = moment(new Date(date[1])).format('yyyy-MM-DD')
    if (isHaftTime) {
      setSearchDatePeriod({
        start: startDate,
        end: endDate
      })
    } else {
      setSearchDatePeriod({
        start: moment(new Date(date[0])).subtract(1, 'd').format('yyyy-MM-DD'),
        end: moment(new Date(date[1])).subtract(1, 'd').format('yyyy-MM-DD')
      })
    }
    dispatch(transactionReportAction.setSearchingDateReport({startDate, endDate}))
  }

  const submitSearchingReport = async () => {
    fetchingTransactionReport()
    setConfirmSearchDatePeriod({...searchDatePeriod})
    dispatch(transactionReportAction.setConfirmDateReport({startDate: startDateReport, endDate: endDateReport}))
  }

  return (
    <Flex className={"layout"} minH={"90dvh"}>
      <Flex flexDir={'column'} bgColor={"#fff"} minW={"100%"}>
      <Flex flexDir={'column'} p={"10px"} >
        <Flex fontSize={"14px"} fontWeight={700} 
          gap={2} alignItems={'center'}>
            {toggleShowPlatformAndGame === currentShowEnum.GAME && 
            <ArrowBackIcon fontSize={20} cursor={'pointer'}
              onClick={resetState}/>}
          <Text fontSize={18}>{t('transaction_report')}</Text>
          {toggleShowPlatformAndGame === currentShowEnum.GAME && <Text display={"none"}>/ {confirmSearchDatePeriod.start} - {confirmSearchDatePeriod.end} (GTM+8)</Text>}
          {toggleShowPlatformAndGame === currentShowEnum.GAME && 
          <Box display={'block'} ml={"auto"}
            bgColor={colors.primary} p={"6px 12px"} borderRadius={"4px"} color={"#fff"}
            boxShadow={"0 0 5px #fac33a"}>
            <Text>{currentPlatformName}</Text>
          </Box>} 
        </Flex>
        <Flex flexDir={'column'} w={"inherit"}>
          {toggleShowPlatformAndGame === currentShowEnum.PLATFORM && 
          <Flex w={'inherit'} py={2} flexDir={"column"} gap={3} alignItems={'center'} borderBottom={"1px dotted #979797"}>
              <DefaultSelectDateInput minW={"250px"} w={"100%"} selectDate={selectDateHandler}
                customizeDate={{startDate: searchDatePeriod.start, endDate: searchDatePeriod.end}}/>
              <DefaultButton color={"#fff"} w={"100%"} onClick={submitSearchingReport}>
                <AiOutlineSearch/>
                <Text ml={2}>{t('search')}</Text>
              </DefaultButton>
          </Flex>}
        </Flex>
      </Flex>
      {isFetching ? <Spinner display={"block"} ml={4}/> : <ReportDisplay/>}
      </Flex>
    </Flex>
  )
}

export default Report