
"use client"
import InboxInfo from '@/components/account/inbox/InboxInfo'
import MailList from '@/components/account/inbox/MailList'
import Card from '@/components/utils/Card'
import httpClient from '@/configs/axios/api'
import { accountAction } from '@/configs/redux/account-slice'
import { RootState } from '@/configs/redux/store'
import { Respond } from '@/constants/type'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Inbox = () => {
  const { currentMailRead } = useSelector((state: RootState) => state.account)
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      dispatch(accountAction.fetchingMailStatus(true))
      try {
        const res: Respond = await httpClient.Inbox.getNotification()
        dispatch(accountAction.setInboxMail(res.result))
      } catch (err) {
        console.log(err);
      } finally {
        dispatch(accountAction.fetchingMailStatus(false))
      }
    })()
  }, [])
  // if (!isLogin) return null

  return (
    <>
      <Card p={["10px","10px","50px","50px"]}>
        {!currentMailRead ? 
        <MailList/> 
        :
        <InboxInfo/>}
      </Card>
      {/* <DeleteMailModal/> */}
    </>
  )
}

export default Inbox