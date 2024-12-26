import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { MdOutlineCheckCircleOutline, MdOutlineCircle } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { Bank } from '@/constants/type'
import CopyButton from '@/components/utils/CopyButton'
import {saveAs} from "file-saver";
import { colors } from '@/configs/chakra-ui/color'
import { useTranslations } from 'next-intl'
import { RootState } from '@/configs/redux/store'
import { accountAction } from '@/configs/redux/account-slice'

type PropsType = {
  bank: Bank
}

const AgentBankItem = ({bank, ...props}: PropsType) => {
  const {currentAgentBankSelect}: any = useSelector((state: RootState) => state.account)
  const t = useTranslations()
  const dispatch = useDispatch()

  const downloadFile = async (url: string) => {
    saveAs(url + '?not-from-cache-please', `qr-${currentAgentBankSelect.bankName}`)
  }

  if (!currentAgentBankSelect) {
    return null
  } else {
  return (
    <Flex sx={depositInfoSection} gap={2}>
      <Box ml={"5px"} fontSize={20} color={"#36c96c"} cursor={'pointer'}>
        {currentAgentBankSelect.id === bank?.id ? <MdOutlineCheckCircleOutline /> 
        : <MdOutlineCircle onClick={() => dispatch(accountAction.setCurrentAgentBankSelect(bank))}/>}
      </Box>
      <Flex flexDir={"column"} gap={4} fontSize={"14.4px"} fontWeight={[0,0,700,700]}>
        <Text cursor={'pointer'} onClick={() => dispatch(accountAction.setCurrentAgentBankSelect(bank))}>
          {bank?.accountName} ({bank?.bankShortName})  
        </Text>
        {currentAgentBankSelect.id === bank?.id && <Flex gap={bank?.imageUrl ? 8 : 10} alignItems={'center'} flexWrap={"wrap"} justifyContent={'center'}>
          <Flex gap={4} flexDir={'column'} justifyContent={'center'} h={"70px"}>
            <Text>{t('ac_name')}</Text>
            <Text>{t('ac_number')}</Text>
          </Flex>
          <Flex gap={4} flexDir={'column'} color={colors.primary} justifyContent={'center'} h={"70px"}>
            <Text>{bank?.accountName}</Text>
            <Text>{bank?.accountNumber}</Text>
          </Flex>
          <Flex gap={4} flexDir={'column'} justifyContent={'center'} h={"70px"}>
            <CopyButton copyText={bank?.accountName}/>
            <CopyButton copyText={bank?.accountNumber}/>
          </Flex>
          {bank?.imageUrl && 
          // bank?.statusImage &&
            <Flex flexDir={'column'} gap={1}>
            <Image alt='qr-code' boxSize={"120px"} mr={["30px","30px","0px","0px"]} src={bank.imageUrl} />
            <Button colorScheme='whatsapp' w={"110px"} h={"30px"} padding={"5px"} alignSelf={'center'}
              display={["block","block","none","none"]} mr={["30px","30px","0px","0px"]} fontWeight={400}
              onClick={() => downloadFile(bank.imageUrl)}>
              {t("save_qr")}
            </Button>
          </Flex>}
        </Flex>}
      </Flex>
    </Flex>
  )
  }
}

export default AgentBankItem

const depositInfoSection = {
  borderLeft: ["none","none","1px solid #d6d6d6","1px solid #d6d6d6"],
  p: ["5px 0 20px","5px 0 20px","5px 0 20px 20px","5px 0 20px 20px"],
  maxW:["100%","100%","500px","500px"]
}