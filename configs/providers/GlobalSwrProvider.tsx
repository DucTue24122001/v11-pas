import { useToast } from '@chakra-ui/react'
import React from 'react'
import { SWRConfig } from 'swr'
import ClientService from '@/helpers/ClientService'
import { useRouter } from 'next/navigation'

type TGlobalSwrConfigProps = {
  children: React.ReactNode,
}

const GlobalSwrConfig = ({children, ...props}: TGlobalSwrConfigProps) => {
  const toast = useToast()
  const router = useRouter()

  return (
    <SWRConfig value={{
      onError(err, key, config) {
        if (err && !key.includes("/checkToken")) {
          // toast({
          //   status: "error",
          //   title: err?.response?.data?.error?.message || "Something went wrong"
          // })
        }

        if (err.status === 401 || err.status === 403) {
          ClientService.logout()
          router.push("/")
        }
      },
      onErrorRetry(err, key, config, revalidate, { retryCount }) {
        if (err.status === 404) return

        if (retryCount >= 1) return
 
        // Retry after 5 seconds.
        setTimeout(() => revalidate({ retryCount }), 5000)
      },
    }}
    >
      {children}
    </SWRConfig>
  )
}

export default GlobalSwrConfig