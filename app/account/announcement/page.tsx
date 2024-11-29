"use client"
import AnnounceItem from '@/components/account/announcement/AnnounceItem'
import Card from '@/components/utils/Card'
import Pagination from '@/components/utils/pagination/Pagination'
import httpClient from '@/configs/axios/api'
import { useTenancy } from '@/configs/providers/TenancyProvider'
import { clientAction } from '@/configs/redux/client-slice'
import { RootState } from '@/configs/redux/store'
import { Flex, Spinner, Text } from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Announcement = () => {
  const {annoucements} = useSelector((state: RootState) => state.client)
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const pageSize = 10
  const t = useTranslations()
  const tenancy = useTenancy()

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      try {
        const res: any = await httpClient.Content.getAnnouncement(tenancy?.tenancyName)
        dispatch(clientAction.setAnnouncements(res.result))
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false)
      }
    })()
  }, [tenancy])

  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  const announcementPagination = useMemo(() => {
    return annoucements.slice((currentPage-1) * 10, (currentPage) * 10);
  }, [currentPage, annoucements])

  return (
    <>
      <Card p={"10px"}> 
        {!isLoading ? (announcementPagination.length !== 0 ? announcementPagination.map((announce: any, i: number) => (
          <AnnounceItem key={i} data={announce}/>)) : <Text p={5}>{t('there_is_no_announcement')}</Text>) : <Spinner/>}
        {!isLoading && <Flex justifyContent={'center'} mt={5}>
          <Pagination 
          currentPage={currentPage}
          pageSize={pageSize}
          totalCount={annoucements.length}
          onPageChange={onPageChange}/>
        </Flex>}
      </Card>
    </>
  )
}

export default Announcement