import DefaultTable from '@/components/utils/DefaultTable';
import { DropdownItem, SelectDropdown } from '@/components/utils/SelectDropdown';
import Pagination from '@/components/utils/pagination/Pagination';
import httpClient from '@/configs/axios/api';
import { colors } from '@/configs/chakra-ui/color';
import { useBreakpoint } from '@/configs/providers/ViewportProvider';
import { accountAction } from '@/configs/redux/account-slice';
import { RootState } from '@/configs/redux/store';
import { convertTime } from '@/helpers/functions';
import { Box, Flex, Spinner, Text} from '@chakra-ui/react'
import moment from 'moment';
import { useTranslations } from 'next-intl';
import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const checkIsToday = (date: Date) => {
  const today = new Date()
  return today.getFullYear() === date.getFullYear() &&
  today.getMonth() === date.getMonth() &&
  today.getDate() === date.getDate()
}

const MailList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const dispatch = useDispatch()
  const { inboxMails, isFetchingMail } = useSelector((state: RootState) => state.account)
  const [isMessageTypeDropdown, setIsMessageTypeDropdown] = useState(false)
  const t = useTranslations()

  const onMailRead = async (mail: any) => {
    dispatch(accountAction.setCurrentMailRead(mail))
    if(mail.status) return
    try {
      await httpClient.Inbox.readMail(mail.id)
    } catch (err) {
      console.log(err);
    }
  }

  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  const inboxMailPagination = useMemo(() => {
    return inboxMails.slice((currentPage-1) * 10, (currentPage) * 10);
  }, [currentPage, inboxMails])

  return (
      <Flex flexDir={'column'} gap={4} mb={"20px"}>
          <Text fontWeight={'bold'} display={"none"} fontSize={15}>{t('message_type')}</Text>
          <SelectDropdown w={"100%"} isDropdown={isMessageTypeDropdown} openDropdown={() => setIsMessageTypeDropdown(true)} closeDropdown={() => setIsMessageTypeDropdown(false)}
            currentSelect={<Text>{t('system')}</Text>}
            dropdownList={<DropdownItem onClick={() => setIsMessageTypeDropdown(false)}>{t('system')}</DropdownItem>}
            />
            <Flex flexDir={'column'}>
              {!isFetchingMail ? inboxMailPagination.map((mail: any, i: number) => (
              <Box key={mail.id} borderBottom={`1px solid ${colors.default.table}`} bgColor={!mail.status ? colors.default.bg : colors.default.white} 
                py={"20px"} px={2} onClick={() => onMailRead(mail)}>
                  <Flex justifyContent={"space-between"} mb={"5px"}>
                  <Text fontWeight={"bold"}>{mail.subject}</Text>
                  <Text>{checkIsToday(new Date(mail.creationTime)) ? convertTime(mail.creationTime) : moment(new Date(mail.creationTime)).format("MMMM DD")}</Text>
                </Flex>
                <Text>{mail.body}</Text>
              </Box>)) : <Spinner/>}
            </Flex>
            <Flex justifyContent={'center'}>
              <Pagination
                currentPage={currentPage}
                pageSize={10}
                totalCount={inboxMails.length}
                siblingCount={1}
                onPageChange={onPageChange}/>
            </Flex>
      </Flex>
  )
}

export default MailList