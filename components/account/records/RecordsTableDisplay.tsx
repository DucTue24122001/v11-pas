import DefaultTable from '@/components/utils/DefaultTable'
import { RootState } from '@/configs/redux/store'
import { RecordFormEnum } from '@/constants/enum'
import { checkStatusColor, convertMoney } from '@/helpers/functions'
import { Spinner, Td, Text, Th, Tr } from '@chakra-ui/react'
import moment from 'moment'
import { useTranslations } from 'next-intl'
import React from 'react'
import { useSelector } from 'react-redux'

const RecordsTableDisplay = ({currentPage}: any) => {
  const {recordList, isFetchingRecord} = useSelector((state: RootState) => state.account)
  const t = useTranslations()

  if (recordList.length === 0) {
    return (
      <DefaultTable thead={
            <Tr>
              <Th>{t('no')}</Th>
              <Th>{t('date_time')}</Th>
              <Th>{t('code')}</Th>
              <Th>{t('type')}</Th>
              <Th>{t('status')}</Th>
              <Th textAlign={"center"}>{t('amount')}</Th>
            </Tr>}
            tbody={
              !isFetchingRecord ? 
              <Tr>
                <Td>
                  <Text fontStyle={"italic"}>{t('there_is_no_record')}</Text>
                </Td>
              </Tr>
              :
              <Tr>
                <Td>
                  <Spinner/>
                </Td>
              </Tr>
            }
            />
    )
  }
  
  return (
    <DefaultTable
          thead={
            <Tr>
              <Th>S.No</Th>
              <Th>{t('date_time')}</Th>
              <Th>{t('code')}</Th>
              <Th>{t('type')}</Th>
              <Th>{t('status')}</Th>
              <Th textAlign={"center"}>{t('amount')}</Th>
            </Tr>
          }
          tbody={!isFetchingRecord ? recordList.map((record, i: number) => (
            <Tr key={i}>
              <Td>{((currentPage - 1) * 10) + (i + 1)}</Td>
              <Td>{moment.utc(record.creationTime, "YYYY-MM-DDTHH:mm:ss").local().format('DD/MM/YYYY HH:mm:ss')}</Td>
              <Td>{record.transCode}</Td>
              <Td>{record.type}</Td>
              <Td>
                <Text fontSize={16} color={checkStatusColor(record.status)}>
                  {record.status}
                </Text>
              </Td>
              <Td>
                <Text color={checkStatusColor(record.type)} fontSize={"24px"} textAlign={"end"} fontWeight={'500'} fontFamily={"Teko,sans-serif"}>
                  {record.type.includes(RecordFormEnum.DEPOSIT) || record.type.includes(RecordFormEnum.PROMOTION) || record.type.includes(RecordFormEnum.AFFILIATE) ? "+" : "-"}{" "}{" "}
                  {convertMoney(record.amountChange.toString())} {record.currency}
                </Text>
              </Td>
            </Tr>
          )) : <Tr>
          <Td>
            <Spinner/>
          </Td>
          </Tr>}/>
  )
}

export default RecordsTableDisplay