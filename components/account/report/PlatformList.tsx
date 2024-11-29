import CustomizeNumberValue from '@/components/utils/CustomizeNumberValue';
import httpClient from '@/configs/axios/api';
import { colors } from '@/configs/chakra-ui/color';
import { currentShowEnum, transactionReportAction } from '@/configs/redux/report-slice';
import { RootState } from '@/configs/redux/store';
import { convertDecimalNum } from '@/helpers/functions';
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Flex, Text, useToast } from '@chakra-ui/react'
import { useTranslations } from 'next-intl';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const PlatformList = () => {
  const {grandTotalInfo, totalTransitionInfo, confirmStartDate,confirmEndDate, currentPage, pageSize} = useSelector((state: RootState) => state.report)
  const toast = useToast({
    duration: 3000,
    isClosable: true,
  })
  const dispatch = useDispatch()
  const t = useTranslations()

  const getInfoPlatformReport = async (report: any) => {
    dispatch(transactionReportAction.handleFetchingData(true))
    dispatch(transactionReportAction.handleToggleShowPlatformAndGame(currentShowEnum.GAME))
    dispatch(transactionReportAction.setCurrentPlatformName(report.platform))
    try {
      const res: any = await httpClient.TransactionReport.getHistory({
        platform: report.platform,
        StartDate: confirmStartDate,
        EndDate: confirmEndDate,
        skipCount: (currentPage - 1) * pageSize,
        maxResultCount: pageSize
      })
      if (res.success) {
        dispatch(transactionReportAction.setTotalGameReportInfo(res.result.data))
        dispatch(transactionReportAction.setTotalCount(res.result.totalCount))
        dispatch(transactionReportAction.setTotalGameProfitLoss(res.result.totalProfitLoss))
      } else {
        dispatch(transactionReportAction.handleToggleShowPlatformAndGame(currentShowEnum.GAME))
        toast({
          status: "error",
          title: res.error.message,
        })
      }
    } catch (err: any) {
      console.log(err);
      dispatch(transactionReportAction.handleToggleShowPlatformAndGame(currentShowEnum.GAME))
      toast({
        status: "error",
        title: err?.response?.data?.error?.message || t('something_went_wrong'),
      })
    } finally {
      dispatch(transactionReportAction.handleFetchingData(false))
    }
  }

  return (
    <Flex flexDir={'column'} w={"100%"}>
      <Flex sx={headMobileReport}>
        <Text>{t('profit_loss')}</Text>
        <CustomizeNumberValue num={grandTotalInfo.totalProfitLoss} fontSize={16}/>
      </Flex>
      <Flex sx={tableMobileReport}>
        <Text sx={tableItem}>{t('gametype')}</Text>
        <Text sx={tableItem} textAlign={"end"}>{t('turnovers')}</Text>
        <Text sx={tableItem} textAlign={"end"}>{t('profit_loss')}</Text>
      </Flex>
      {totalTransitionInfo.length !== 0 ? totalTransitionInfo.map((report: any, i: number) => (
        <Flex sx={tableMobileReport} cursor={'pointer'} key={i} onClick={() => getInfoPlatformReport(report)}>
        <Text sx={tableItem} textTransform={"uppercase"}>{report.platform}</Text>
        <Text sx={tableItem} textAlign={"end"}>{convertDecimalNum(report.turnover)}</Text>
        <Flex sx={tableItem} justifyContent={"flex-end"} alignItems={'center'}>
          <CustomizeNumberValue maxW={"100px"} fontSize={14} num={report.winloss}/>
          <ChevronRightIcon/>
        </Flex>
      </Flex>
      )) : <Text p={4} fontSize={14} fontStyle={"italic"}>{t('there_is_no_report')}</Text>}
      </Flex>
  )
}

export default PlatformList


const headMobileReport = {
  p: "14px",
  color: colors.report.headFontColor,
  fontSize: 16,
  alignItems: 'center',
  justifyContent: 'space-between',
  bgColor: colors.report.mobileBg,
}

const tableMobileReport = {
  p: "13px",
  justifyContent: 'space-between',
  fontSize: "14px",
  borderBottom: `1px solid ${colors.default.table}`,
}

const tableItem = {
  flex: "1 1 0px",
}