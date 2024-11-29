"use client"
import { Respond } from '@/constants/type'
import React, { useState } from 'react'
import httpClient from '../axios/api'
import ClientService from '@/helpers/ClientService'
import { PageEnum } from '@/constants/enum'
import { useParams, usePathname, useRouter } from 'next/navigation'

type Account = null | {
  isLogin: boolean
  userId: number
  surName: string
  userName: string
  name: string
  phoneNumber: string
  email: string
  balance: number
  referralCode: string
}

type TCheckTokenProps = {
  children: React.ReactNode
}

const isTokenExpireContext = React.createContext<Account>(null)

const CheckTokenProvider = ({children}: TCheckTokenProps) => {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(false)
  const [data, setData] = useState<any>(null)
  const pathname = usePathname()
  const params = useParams()

  React.useEffect(() => {
    (async () => {
      try {
        const res : Respond = await httpClient.User.getProfile()
        if(res.success) {
          setData(res?.result)
          setIsLogin(true)
        }
      } catch (error: any) {
        if (error?.response?.status === 401 || error?.response?.status === 500 || error?.response?.status === 403 || error?.response?.data?.error?.code === 401) {
          ClientService.logout()
          if (isLogin === true || pathname.includes(PageEnum.Account)) {
            setIsLogin(false)
            router.push("/");
          }
        }
      }
    })()
  },[pathname, router, params])

  return (
    <isTokenExpireContext.Provider value={isLogin ? {...data, isLogin: isLogin} : {isLogin: false}}>
      {children}
    </isTokenExpireContext.Provider>
  )
}

export default CheckTokenProvider

export const useCheckTokenProvider = () => {
  const tenancy = React.useContext(isTokenExpireContext)
  return tenancy
}