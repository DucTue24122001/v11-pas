import { RootState } from '@/configs/redux/store'
import { Flex, Progress } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import GameHotHome from './game-home/GameHotHome'
import CategoryHeader from './game-home/CategoryHeader'
import GameItem from './GameItem'
import GameGrid from './GameGrid'

type TGameHome = {
  isLoading: boolean
}

const GameHome = ({isLoading}: TGameHome) => {
  const {allGameList, allGameTypes} = useSelector((state: RootState) => state.client)

  const gameHome = useMemo(() => {
    const a = allGameTypes?.slice(3, 5);
    if (a !== undefined) {
      return a;
    }
    return []
  }, [allGameTypes]);


  return (
    <Flex
      pb={"40px"}
      justifyContent={"center"}
      flexDir={"column"}
      w={"100%"}
      >
      {isLoading && <Progress isIndeterminate size='xs'/>}
      <Flex
          flexDir={"column"}
          w={"100%"}
          justifyContent={"center"}
          alignItems={"center"}>
        <GameHotHome/>
        {gameHome?.map((item: any, i: any) => (
          <Flex
            key={i}
            flexDirection={"column"}
            mb={[1, 1, 5, 5]}
            bgRepeat={"no-repeat"}
            bgSize={"100% 100%"}
            w={"100%"}>
            <CategoryHeader gameType={item?.game_type_name_home} srcImg={item?.game_type}/>
            <GameGrid>
              {allGameList?.filter((game) => game.game_type === item.game_type).map((items, i) => {
                return <GameItem key={i} game={items}/>
              })}
            </GameGrid>
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}

export default GameHome