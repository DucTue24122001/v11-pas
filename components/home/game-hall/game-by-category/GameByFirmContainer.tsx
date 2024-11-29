import httpClient from '@/configs/axios/api'
import { useTenancy } from '@/configs/providers/TenancyProvider'
import { Box, Progress} from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import useSWR from 'swr'
import { TGame } from '@/constants/type'
import { RootState } from '@/configs/redux/store'
import CategoryHeader from '../game-home/CategoryHeader'
import GameItem from '../GameItem'
import GameGrid from '../GameGrid'

const GameByFirmContainer = () => {
  const tenancy = useTenancy()
  const {currentCategorySelect, gameFilter, currentPlatform} = useSelector((state: RootState) => state.client)

  const {data, isLoading} = 
    useSWR("/gameByFirm" + tenancy?.tenancyName + currentCategorySelect + currentPlatform + gameFilter.currentFilter + gameFilter.inputSearch, 
    () => httpClient.Content.getGamesCategory({
    gametype: currentCategorySelect,
    platform: currentPlatform,
    status: gameFilter.currentFilter,
    tenancyName: tenancy?.tenancyName,
  }))

  const searchFilter = useMemo(() => {
    const gameList = data?.result?.gameList
    if (gameList && gameFilter.inputSearch) {
      return gameList.filter((item: any) =>
        item.game_name_en.toLowerCase().includes(gameFilter.inputSearch.toLowerCase())
      );
    }
    return gameList;
  }, [gameFilter.inputSearch, data]);

  return (
    <Box
      flexDirection={"column"}
      mb={[1, 1, 5, 5]}
      bgRepeat={"no-repeat"}
      bgSize={"100% 100%"}
      overflow={"hidden"}
    >
      <CategoryHeader gameType={currentCategorySelect} srcImg={currentCategorySelect}/>
      {isLoading && <Progress isIndeterminate size='xs'/>}
      <GameGrid>
        {searchFilter && searchFilter?.map((game: TGame, i: number) => (
          <GameItem key={i} game={game}/>
        ))}
      </GameGrid>
    </Box>
  )
}

export default GameByFirmContainer