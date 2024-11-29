import CustomizeNumberValue from '@/components/utils/CustomizeNumberValue';
import Pagination from '@/components/utils/pagination/Pagination';
import httpClient from '@/configs/axios/api';
import { colors } from '@/configs/chakra-ui/color';
import { transactionReportAction } from '@/configs/redux/report-slice';
import { RootState } from '@/configs/redux/store';
import { convertDecimalNum } from '@/helpers/functions';
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Center, Flex, Text, useToast } from '@chakra-ui/react'
import { useTranslations } from 'next-intl';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const DetailGameReport = () => {
  const {totalGameProfitLoss} = useSelector((state: RootState) => state.report)
  const {currentPlatformName, totalCount, totalGameReportInfo, currentPage, pageSize, confirmEndDate, confirmStartDate} = useSelector((state: RootState) => state.report)
  const dispatch = useDispatch()
  const toast = useToast()
  const t = useTranslations()

  const getInfoGameReport = (report: any) => {
    dispatch(transactionReportAction.handleShowDetailModal(true))
    dispatch(transactionReportAction.setCurrentGameReport(report))
  }

  const onPageChange = async (page: number) => {
    dispatch(transactionReportAction.handleFetchingData(true))
    dispatch(transactionReportAction.setCurrentPage(page))
    try {
      const res: any = await httpClient.TransactionReport.getHistory({
        platform: currentPlatformName,
        StartDate: confirmStartDate,
        EndDate: confirmEndDate,
        skipCount: (page - 1) * pageSize,
        maxResultCount: pageSize
      })
      if (res.success) {
        dispatch(transactionReportAction.setTotalGameReportInfo(res.result.data))
        dispatch(transactionReportAction.setTotalCount(res.result.totalCount))
        dispatch(transactionReportAction.setTotalGameProfitLoss(res.result.totalProfitLoss))
      } else {
        toast({
          status: "error",
          title: res.error.message,
        })
      }
    } catch (err: any) {
      console.log(err);
      toast({
        status: "error",
        title: err?.response?.data?.error?.message || t('something_went_wrong'),
      })
    } finally {
      window.scrollTo(0, 0)
      dispatch(transactionReportAction.handleFetchingData(false))
    }
  }

  return (
    <Flex flexDir={'column'} w={"100%"}>
      <Flex sx={headMobileReport}>
        <Text>{t('profit_loss')}</Text>
        <CustomizeNumberValue num={totalGameProfitLoss} fontSize={16}/>
      </Flex>
      <Flex sx={tableMobileReport}>
        <Text sx={tableItem} >{t('game_name')}</Text>
        <Text sx={tableItem} textAlign={"center"}>{t('gametype')}</Text>
        <Text sx={tableItem} textAlign={"end"}>{t('turnovers')}</Text>
        <Text sx={tableItem} textAlign={"end"}>P/L</Text>
      </Flex>
      {totalGameReportInfo.map((gameReport, i) => (
      <Flex sx={tableMobileReport} cursor={'pointer'} key={i} onClick={() => getInfoGameReport(gameReport)}>
          <Text sx={tableItem} textTransform={"uppercase"} textAlign={'center'}>{gameReport?.gameName}</Text>
          <Center sx={tableItem}>
            <Text>{gameReport?.gameType}</Text>
          </Center>
          <Center sx={tableItem}>
            <Text w={"100%"} maxW={"75px"} textAlign={"right"}>{convertDecimalNum(gameReport?.betAmt)}</Text>
          </Center>
          <Flex sx={tableItem} justifyContent={"flex-end"} alignItems={'center'}>
            <CustomizeNumberValue maxW={"75px"} fontSize={14} num={gameReport?.winLoss}/>
            <ChevronRightIcon/>
          </Flex>
      </Flex>
      ))}
      <Flex mt={5} alignSelf={"center"}>
        <Pagination
        pageSize={pageSize}
        totalCount={totalCount}
        currentPage={currentPage}
        onPageChange={(page: number) => onPageChange(page)}/>
      </Flex>
    </Flex>
  )
}

export default DetailGameReport

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
  flex: "1 1 25%",
  maxW: "25%",
}