import { Box, Center, Flex, Text } from '@chakra-ui/react'
import React, { ChangeEvent } from 'react'
import { BsPaperclip } from 'react-icons/bs'
import { colors } from '@/configs/chakra-ui/color'
import { useTranslations } from 'next-intl'

const DefaultFileInput = ({imageInputChange, currentImg}: any) => {
  const onFileInputHandle = (e: ChangeEvent<HTMLInputElement>) => {
    const {files}: any = e.target
    const file: any = files[0]
    imageInputChange(file)
  }
  const t = useTranslations()

  return (
    <label htmlFor='upload-image' style={{width: "100%"}}>
        <Flex w={"100%"} justifyContent={'space-between'} fontSize={"16px"} gap={3} >
        <Flex h={["50px","50px","35px","35px"]} minW={"70%"} borderRadius={5} alignItems={'center'} px={"12px"} color={"rgba(0,0,0,.6)"} 
          bgColor={["#f2f5f9","#f2f5f9","#fff","#fff"]} cursor={'pointer'}
          border={[`1px solid #fff`,`1px solid #fff`,`1px solid #c5d0e2`,`1px solid #c5d0e2`]}>
          <BsPaperclip style={{fontSize: "20px"}}/>
          <Text noOfLines={1} fontSize={"16px"}>{currentImg ? currentImg.name : t('file_size')}</Text>
        </Flex>
        <Center h={["50px","50px","35px","35px"]} w={"100%"} borderRadius={5} alignItems={'center'} 
          px={"12px"} color={"rgba(0,0,0,.6)"} bg={colors.primaryBg} cursor={'pointer'} fontSize={15}>
          <Text textTransform={'uppercase'} fontWeight={600} color={"#fff"}>{t('upload')}</Text>
        </Center>
        </Flex>
      <Box>
        <input type="file" id={"upload-image"} accept={"image/*"} style={{display: "none"}} onChange={onFileInputHandle}/>
      </Box>
    </label>
  )
}

export default DefaultFileInput