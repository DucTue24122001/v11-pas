import { colors } from '@/configs/chakra-ui/color'
import { useCheckTokenProvider } from '@/configs/providers/CheckTokenProvider'
import { useTenancy } from '@/configs/providers/TenancyProvider'
import { useViewport } from '@/configs/providers/ViewportProvider'
import { clientAction } from '@/configs/redux/client-slice'
import { RootState } from '@/configs/redux/store'
import { convertDecimalNum } from '@/helpers/functions'
import { CloseIcon, MinusIcon } from '@chakra-ui/icons'
import { Box, Center, Flex, Image, Spinner, Text } from '@chakra-ui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const PlayingGameModal = () => {
  const {currentGameUrl, isLoadingUrl, isTogglePlayingGameModal, currentGamePlayInfo} = useSelector((state: RootState) => state.client)
  const accountDetail = useCheckTokenProvider()
  const tenancy = useTenancy()
  const dispatch = useDispatch()
  const {height} = useViewport()

  const toggleGameHandler = () => {
    dispatch(clientAction.setTogglePlayingGameModal(true))
  }

  return (
    <>
      <Box pos={'fixed'} top={0} left={0} w={"100%"} zIndex={1001} display={isTogglePlayingGameModal ? "none" : "block"}>
        <Flex minH={"10vmin"} w={"100%"} zIndex={100} bgColor={"#151515"} color={"white"} fontSize={"14px"}>
          <Flex flexDir={'column'} px={"2vmin"} minW={"110px"}>
            <Text pt={"2px"}>{accountDetail?.name}</Text>
            <Text pt={"2px"}>ID: {accountDetail?.surName}</Text>
          </Flex>
          <Text mt={"5px"} pl={"5vmin"}>{tenancy?.currency}: {convertDecimalNum(accountDetail?.balance)}</Text>
          <Flex ml={'auto'} gap={1}>
            <Center bgColor={"#333"} height={"100%"} w={"10vmin"} onClick={toggleGameHandler}>
              <MinusIcon color={"white"} fontSize={16}/>
            </Center>
            <Center bgColor={"#333"} height={"100%"} w={"10vmin"}
              onClick={() => dispatch(clientAction.setShowPlayingGameModal(false))}>
              <CloseIcon color={"white"} fontSize={16}/>
            </Center>
          </Flex>
        </Flex>
        <iframe src={currentGameUrl}
          style={{width: "100%", height: `calc(${height}px - 12vmin)`, display: isLoadingUrl ? "none" : 'block', backgroundColor: "#fff"}} 
          onLoad={() => dispatch(clientAction.setLoadingUrl(false))}></iframe>
        <Center w={"100%"} height={"calc(100vh - 12vmin)"} bgColor={"white"} display={isLoadingUrl ? "flex" : "none"}>
          <Spinner/>  
        </Center>
      </Box>
      <Flex pos={'fixed'} bgImage={"linear-gradient(45deg, #636363 0%, #1f1f1f 100%)"}
        zIndex={1001} bottom={"60px"} w={"95%"} left={"50%"} transform={"translateX(-50%)"} h={"auto"} borderRadius={"10px"} 
        border={"2px solid #818181"}
        boxShadow={"0 5px 8px #00000094"} p={"5px 10px 5px 10px"} display={isTogglePlayingGameModal ? "flex" : "none"}
        onClick={() => dispatch(clientAction.setTogglePlayingGameModal(false))}> 
        <Image src={currentGamePlayInfo?.imageURL} alt={currentGamePlayInfo?.game_name_en} boxSize={"40px"}/>
        <Text pl={"20px"} lineHeight={"40px"} color={"white"}>{currentGamePlayInfo.game_name_en}</Text>
      </Flex>
    </>
  )
}

export default PlayingGameModal