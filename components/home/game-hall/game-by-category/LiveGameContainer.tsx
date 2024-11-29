import httpClient from '@/configs/axios/api'
import { useTenancy } from '@/configs/providers/TenancyProvider'
import { Flex, Progress } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import useSWR from 'swr'
import { TGame } from '@/constants/type'
import { RootState } from '@/configs/redux/store'
import CategoryHeader from '../game-home/CategoryHeader'
import GameGrid from '../GameGrid'
import GameItem from '../GameItem'

const LiveGameContainer = () => {
  const {currentCategorySelect} = useSelector((state: RootState) => state.client)
  const tenancy = useTenancy()
  const {data, isLoading} = useSWR("/liveGame" + currentCategorySelect, () => httpClient.Content.getGamesCategory({
    gametype: currentCategorySelect,
    platform: "",
    tenancyName: tenancy?.tenancyName
  }))
  

  return (
    <Flex
      flexDirection={"column"}
      mb={[1, 1, 5, 5]}
      bgRepeat={"no-repeat"}
      bgSize={"100% 100%"}
      overflow={"hidden"}
    >
      <CategoryHeader gameType={currentCategorySelect} srcImg={currentCategorySelect}/>
      {isLoading && <Progress isIndeterminate size='xs'/>}
      <GameGrid>
        {data?.result?.gameList.map((game: TGame, i: number) => (
          <GameItem key={i} game={game}/>
        ))}
      </GameGrid>
    </Flex>
  )
}

export default LiveGameContainer