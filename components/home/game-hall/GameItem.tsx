import httpClient from '@/configs/axios/api'
import { colors } from '@/configs/chakra-ui/color'
import { useCheckTokenProvider } from '@/configs/providers/CheckTokenProvider'
import { useBreakpoint } from '@/configs/providers/ViewportProvider'
import { clientAction } from '@/configs/redux/client-slice'
import { ListCategory } from '@/constants/enum'
import { TGame } from '@/constants/type'
import { Box, Center, ChakraProps, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { HiWrenchScrewdriver } from 'react-icons/hi2'
import { useDispatch } from 'react-redux'

type TGameItemProps = ChakraProps & {
  game: TGame,
}

const GameItem = ({game, ...props}: TGameItemProps) => {
  const accountStatus = useCheckTokenProvider()
  const dispatch = useDispatch()
  const breakpoint = useBreakpoint()

  const checkShowGameCompany = (type: string) => {
    switch (type) {
      case ListCategory.LIVE:
      case ListCategory.LIVEARENA:
      case ListCategory.LOTTERY:
      case ListCategory.SPORTS:
        return false
      default:
        return true
    }
  }


  const handleClickUrl = async (game: TGame) => {
    if (!accountStatus?.isLogin) {
      dispatch(clientAction.handleShowRegisterModal(true));
      dispatch(clientAction.setLoginOrRegister(true))
    } else {
      try {
        const res: any = await httpClient.Content.getLinkGame({
          platform: game.platform,
          game_code: game.game_code,
        });
        if (res.success) {
          if (breakpoint && game.platform !== "SBOBET") {
            dispatch(
              clientAction.setCurrentGameUrl({
                gameUrl: res?.result,
                gameInfo: game,
              })
            );
            dispatch(clientAction.setShowPlayingGameModal(true));
          } else {
            window.open(res?.result);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Center borderRadius={"15px"} flexDir={'column'}  _hover={{transform: "translateY(-5px)"}} transition={".3s"} 
      cursor={'pointer'} onClick={() => handleClickUrl(game)}>
      <Box pos={"relative"}>
        {game?.playable === false && <Box
          position={"absolute"}
          w={"100%"}
          borderRadius={5}
          h={"100%"}
          bgColor={
            "rgb(255 255 255 / 59%)"
          }
          cursor={"not-allowed"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          fontSize={[28, 30, 30, 35]}
          zIndex={11}
        >
          <HiWrenchScrewdriver color={colors.primary} />
        </Box>}
        {checkShowGameCompany(game.game_type) && 
          <Center pos={"absolute"} right={"-10px"} top={"-5px"} zIndex={10}
          borderRadius={"6px"}
            bgColor={"#fff"} boxShadow={"0 1px 5px #acacac"} h={["25px","25px","30px","30px"]} w={["35px","35px","40px","40px"]}>
            <Image
              alt='platform'
              h={"80%"}
              w={"80%"}
              objectFit={"contain"}
              src={`https://pasystem.s3.ap-southeast-1.amazonaws.com/platforms/${game?.platform}-logo.png`}
              />
          </Center>
        }
        {checkShowGameCompany(game.game_type) ? 
        <Image borderRadius={"15px"} alt={game.game_name_en} src={game.imageURL} />  
        : 
        <Image borderRadius={"15px"} alt={game.game_name_en} src={`/images/${game.platform}.png`} /> 
        }
        
        {checkShowGameCompany(game.game_type) && <Center pos={"absolute"} left={"50%"} bottom={0} transform={"translateX(-50%)"} 
          w={"100%"}
          bgColor={"#00000080"}
          zIndex={10} borderBottomRadius={"15px"}>
          <Text color={"#fff"} fontSize={["12px","12px","14px","14px"]}>{game?.rtp ? `RTP:${(game?.rtp).toFixed(2)}%` : ""}</Text>
        </Center>}
      </Box>
      {
        checkShowGameCompany(game.game_type) &&
      <Text noOfLines={1} whiteSpace={"wrap"} textOverflow={"ellipsis"} overflow={"hidden"} w={["70px","70px","100px","100px"]} textAlign={"center"}>
        {game.game_name_en}
      </Text>
      }
    </Center>
  )
}

export default GameItem