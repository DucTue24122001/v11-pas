import { colors } from '@/configs/chakra-ui/color'
import { RootState } from '@/configs/redux/store'
import { RecordFormEnum } from '@/constants/enum'
import { Record } from '@/constants/type'
import { checkStatusColor, convertMoney } from '@/helpers/functions'
import { Box, Flex, Spinner, Text } from '@chakra-ui/react'
import moment from 'moment'
import { useTranslations } from 'next-intl'
import React from 'react'
import { useSelector } from 'react-redux'

const ResponsiveRecordDisplay = ({currentPage}: any) => {
  const {recordList, isFetchingRecord} = useSelector((state: RootState) => state.account)
  const t = useTranslations()

  if(recordList.length === 0) {
    return !isFetchingRecord ? <Text fontStyle={"italic"} fontSize={15}>{t('there_is_no_record')}</Text> : <Spinner/>
  }

  return (
    <Box>
      {!isFetchingRecord ? recordList.map((record: Record, i: number) => (
        <Flex my={"15px"} key={i}>
            <Flex w={"100%"} borderBottom={`1px solid ${colors.default.table}`} px={"5px"} pb={"15px"}>
            <Text w={"20px"}>{((currentPage - 1) * 10) + (i + 1)}.</Text>
            <Flex flexDir={'column'} w={"100%"}>
              <Flex justifyContent={"space-between"} alignItems={'center'}>
                <Text minW={"33%"}>{moment.utc(record.creationTime, "YYYY-MM-DDTHH:mm:ss").local().format('DD/MM/YYYY HH:mm:ss')}</Text>
                <Text minW={"33%"} textAlign={"center"} color={checkStatusColor(record.status)}>{record.status}</Text>
                <Text minW={"33%"} textAlign={"end"} fontWeight={'500'} color={checkStatusColor(record.type)} 
                fontFamily={"Teko,sans-serif"} fontSize={["18px","20px","24px","24px"]}>
                  {record.type.includes(RecordFormEnum.DEPOSIT) || record.type.includes(RecordFormEnum.PROMOTION) || record.type.includes(RecordFormEnum.AFFILIATE) ? "+" : "-"}{" "}{convertMoney(record.amountChange.toString())}  {record.currency}
                </Text>
              </Flex>
              <Text>Code: <span style={{fontWeight: 'bold'}}>{record.transCode}</span></Text>
              <Text>Type: <span style={{fontWeight: 'bold'}}>{record.type}</span></Text>
              <Text>Note: <span style={{fontWeight: 'bold'}}>{record.note || "SUCCESS"}</span></Text>
            </Flex>
          </Flex>
        </Flex>
        )) : <Spinner/>
        }
    </Box>
  )
}

export default ResponsiveRecordDisplay