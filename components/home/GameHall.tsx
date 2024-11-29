"use client"
import httpClient from '@/configs/axios/api'
import { clientAction } from '@/configs/redux/client-slice'
import { RootState } from '@/configs/redux/store'
import { NavItemEnum } from '@/constants/enum'
import { Box, Flex } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import GameHome from './game-hall/GameHome'
import GameByCategory from './game-hall/GameByCategory'
import { useViewport } from '@/configs/providers/ViewportProvider'

const GameHall = () => {
  const {currentCategorySelect, currentPlatform} = useSelector((state: RootState) => state.client)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const gameHallRef = useRef<any>(null)
  const {height} = useViewport()

  useEffect(() => {
    if(gameHallRef) {
      const scrolled = document.documentElement.scrollTop;
      const redundantSpace = height*25/100;
      scrolled > (gameHallRef?.current?.offsetTop - redundantSpace) && window.scrollTo({
        top: (gameHallRef?.current?.offsetTop - redundantSpace) || 0,
        behavior: 'smooth'
        /* you can also use 'auto' behaviour 
           in place of 'smooth' */
      }); 
    }
  }, [currentPlatform])

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true)
        const res = await httpClient.Content.getGamesCategory({
          gametype: "",
          platform: "",
        })
        if(res.success) {
          const allGameInfo = res.result
          dispatch(clientAction.setAllGameType(allGameInfo.gameType))
          dispatch(clientAction.setAllGameList(allGameInfo.gameList))
        }
      } catch (err: any) {
        console.log(err);
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  return (
    <Flex justifyContent={"center"}>
    <Box p={["3.589744vw","3.589744vw","20px","10px"]} ref={gameHallRef} maxW={["100%","100%","1400px","1400px"]}>
      {currentCategorySelect === NavItemEnum.HOME ? <GameHome isLoading={isLoading}/>
      : <GameByCategory/>}
      </Box>
    </Flex>
  )
}

export default GameHall