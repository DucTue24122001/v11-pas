import React from "react";
import { TenancyType } from "@/constants/type";
import useSWR from "swr";
import httpClient from "../axios/api";
import { useCookies } from "next-client-cookies";
import Maintenance from "@/components/Maintenance";

const tenancyContext = React.createContext<TenancyType>(null)

export const TenancyProvider = ({ children }: any) => {
  const cookies = useCookies();
  const { data: tenancy } = useSWR("/tenancy", () => httpClient.Tenant.getTenant(), {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    onSuccess: (data) => {
      cookies.set("tenancy", JSON.stringify(data?.result))
    }
  })

  return (
    <tenancyContext.Provider value={tenancy?.result}>
      {tenancy?.result.isMaintain ? <Maintenance/> : children}
    </tenancyContext.Provider>
  )
}

export const useTenancy = () => {
  const tenancy = React.useContext(tenancyContext)
  return tenancy
}