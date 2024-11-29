import { Flex, OrderedList } from '@chakra-ui/react'
import React from 'react'
import { ErrorText } from './NotificationText'
import { useTranslations } from 'next-intl'

const ResponsiveNote = ({children, ...props}: any) => {
  const t = useTranslations()
  return (
    <Flex flexDir={"column"} px={"5px"} gap={4} display={["flex","flex","flex","none","none"]} minH={"fit-content"}>
      <ErrorText fontStyle={"italic"} fontWeight={600} fontSize={"14px"}>{t('important_notes')}</ErrorText>
      <OrderedList fontSize={"14px"} {...props} lineHeight={"25px"} px={"8px"}>
        {children}
      </OrderedList>
    </Flex>
  )
}

export default ResponsiveNote