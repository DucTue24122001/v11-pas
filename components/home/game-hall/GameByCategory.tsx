import React from 'react'
import { useSelector } from 'react-redux'
import { NavItemEnum } from '@/constants/enum'
import { RootState } from '@/configs/redux/store'
import { categoryList } from '../HomeCategory'
import LiveGameContainer from './game-by-category/LiveGameContainer'
import GameByFirmContainer from './game-by-category/GameByFirmContainer'
import { Box } from '@chakra-ui/react'
import { checkIsLiveGame } from '@/helpers/functions'
import GameFilter from '../home-category/GameFilter'

const GameByCategory = () => {
  const {currentCategorySelect} = useSelector((state: RootState) => state.client)

  const checkLiveGame = (game: NavItemEnum) => {
    switch (game) {
      case "LIVEARENA":
        return true;
      case "LIVE":
        return true;
      case "SPORTS":
        return true;
      case "LOTTERY":
        return true;
      case "FH":
        return false;
      case "SLOT":
        return false;
      case "ARCADE":
        return false;
      case "RNGTABLE":
        return false;
      default:
        return <></>;
    }
  };

  return (
    <>
      {categoryList.map((category, i) => {
        if(currentCategorySelect !== category.value) return null

        return <Box pb={"40px"} key={i}>
          {!checkIsLiveGame(currentCategorySelect) && <GameFilter/>}
          {checkLiveGame(currentCategorySelect) ? <LiveGameContainer/> : <GameByFirmContainer/>}
        </Box>
      })}
    </>
  )
}

export default GameByCategory