import CopyButton from '@/components/utils/CopyButton';
import CustomizeNumberValue from '@/components/utils/CustomizeNumberValue';
import { colors } from '@/configs/chakra-ui/color';
import { useTenancy } from '@/configs/providers/TenancyProvider';
import { transactionReportAction } from '@/configs/redux/report-slice';
import { RootState } from '@/configs/redux/store';
import { convertDecimalNum } from '@/helpers/functions';
import { CloseIcon } from '@chakra-ui/icons'
import { Box, Flex, Modal, ModalContent, ModalOverlay, Text } from '@chakra-ui/react'
import { useTranslations } from 'next-intl';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const DetailReportModal = () => {
  const {isShowDetailModal, currentGameReport, currentPlatformName}: any = useSelector((state: RootState) => state.report)
  const dispatch = useDispatch()
  const t = useTranslations()
  const tenancy = useTenancy()
  
  return (
    <Modal isOpen={isShowDetailModal} onClose={() => dispatch(transactionReportAction.handleShowDetailModal(false))}
      size={"full"}>
      <ModalOverlay />
      <ModalContent>
        <Flex flexDir={'column'} color={colors.secondary}>
          <Flex alignItems={'center'} bgColor={colors.primary} color={colors.default.white}
            justifyContent={'space-between'} p={"12.5px"} fontSize={"18px"}>
            <Text>{t('transaction_report')}</Text>
            <CloseIcon onClick={() => dispatch(transactionReportAction.handleShowDetailModal(false))}/>
          </Flex>
          <Flex p={"10px"} fontSize={"14px"} alignItems={'center'} borderBottom={"1px solid #d9dee4"}>
            <Text fontSize={16}>{currentGameReport?.txTime?.split(" ")[0]}</Text>
            <Box ml={"auto"}
            bgColor={colors.primary} p={"6px 12px"} borderRadius={"4px"} color={colors.default.white}>
              <Text>{currentPlatformName}</Text>
            </Box>
          </Flex>
          <Flex bgColor={colors.report.bgModal} color={colors.report.brown} p={"15px 10px"} borderBottom={"1px solid #d9dee4"} justifyContent={'space-between'} alignItems={'center'}>
            <Flex flexDir={'column'} gap={2}>
              <Text border={"1px #d4cfbd solid"} px={2} fontSize={20} borderRadius={3}>
                {currentGameReport.gameName}
              </Text>
              <Text>{t('round_id')}</Text>
              <Flex alignItems={'center'} gap={5}>
                <Text fontSize={14}>{currentGameReport.roundId || currentGameReport.platformTxId}</Text>
                <CopyButton boxSize={7} copyText={currentGameReport.roundId || currentGameReport.platformTxId}/>
              </Flex>
            </Flex>
            {/* <Box fontSize={24} border={`2px solid ${colors.report.brown}`} p={2} borderRadius={50} cursor={'pointer'}>
              <BsFillCameraVideoFill/>
            </Box> */}
          </Flex>
          <Flex p={"10px"} fontSize={"14px"} bgColor={"#f3f2f0"}>
            {currentGameReport.txTime}
          </Flex>
          <Flex sx={infoItem}>
            <Text sx={tableName}>{t('game_name')}</Text>
            <Text fontSize={"16px"}>{currentGameReport.gameName}</Text>
          </Flex>
          <Flex sx={infoItem}>
            <Text sx={tableName}>{t('stake')}</Text>
            <Text fontSize={"16px"}>{convertDecimalNum(currentGameReport.betAmt)}</Text>
          </Flex>
          <Flex sx={infoItem}>
            <Text sx={tableName}>{t('turnovers')}</Text>
            <Text fontSize={"16px"}>{convertDecimalNum(currentGameReport.betAmt)}</Text>
          </Flex>
          <Flex sx={infoItem}>
            <Text sx={tableName}>{t('comm_tax')}</Text>
            <Text fontSize={"16px"}>0</Text>
          </Flex>
          <Flex sx={infoItem}>
            <Text sx={tableName}>{t('profit_loss')}</Text>
            <CustomizeNumberValue fontSize={"16px"} num={currentGameReport.winLoss}/>
          </Flex>
        </Flex>
      </ModalContent>
    </Modal>
  )
}

export default DetailReportModal

const tableName = {
  fontSize:"14px",
  minW:"200px",
}

const infoItem = {
  borderBottom:"1px solid #d9dee4",
  p:"10px",
  alignItems:'center',
}