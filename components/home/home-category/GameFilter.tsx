import { clientAction } from '@/configs/redux/client-slice'
import { RootState } from '@/configs/redux/store'
import { SearchIcon } from '@chakra-ui/icons'
import { Box, Center, Flex, Grid, Image, Input, InputGroup, InputLeftElement, Select, Text } from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const GameFilter = () => {
  const {currentCategorySelect, allGameTypes, currentPlatform, gameFilter} = useSelector((state: RootState) => state.client)
  const t = useTranslations()
  const dispatch = useDispatch()

  const gameTypesFilterByCategory = useMemo(() => {
    return allGameTypes?.find(
      (item) => item?.game_type === currentCategorySelect)
  }, [currentCategorySelect, allGameTypes])

  return (
    <Box w={"100%"} bg={"#fff"} mb={5} p={"20px"}>
      <Grid templateColumns={["repeat(2,1fr)","repeat(4,1fr)","repeat(8,1fr)","repeat(8,1fr)"]} gap={5} pt={"5px"} overflowX={"auto"} w={"100%"}>
          <Text borderBottom={"5px solid #043bfe"} fontWeight={600} fontSize={[14,18]}>Game Providers</Text>
          {gameTypesFilterByCategory?.platforms?.map((platform: any, i) => (
            <Flex key={i}
              borderRadius="5px"
              minW={"65px"}
              cursor={'pointer'}
              gap={3}
              p={"5px"}
              color={currentPlatform === platform.platform ? 'black' : ''}
              onClick={() => dispatch(clientAction.setCurrentPlatform(platform.platform))}
              border={currentPlatform === platform.platform ? "1px solid #043bfe" : ""}
              bg={currentPlatform !== platform.platform ? "#f2f4f7" : "#fff"}
              >
              <Image
                boxSize={"25px"}
                objectFit={"contain"}
                src={`https://pasystem.s3.ap-southeast-1.amazonaws.com/platforms/${platform.platform}-logo.png`}
                alt=''
              />
              <Text whiteSpace={"nowrap"} fontSize={[14,16]} color={currentPlatform !== platform.platform ? "#98a2b3" : "#043bfe"} textAlign={'center'} textOverflow={"ellipsis"} overflow={"hidden"}>
                {platform.platform_name}
              </Text>
            </Flex>
        ))}
      </Grid>
      <Flex mt={5} gap={"10px"} justifyContent={"space-between"}>
        <Select w={["100%","100%","200px","200px"]}
          h={"35px"}
          value={gameFilter.currentFilter}
          onChange={(e) => dispatch(clientAction.setGameFilter({...gameFilter, currentFilter: e.target.value}))}>
          {filters.map((item: any) => (
            <option key={item.id} value={item.value}>
              {t(`${item.name}`)}
            </option>
          ))}
        </Select>
        <InputGroup
          h={"35px"}
          w={["100%","100%","200px","200px"]}
        >
          <Input h={"35px"} placeholder={t("search_game")} 
            onChange={(e) => dispatch(clientAction.setGameFilter({...gameFilter, inputSearch: e.target.value}))}></Input>
          <InputLeftElement >
            <SearchIcon />
          </InputLeftElement>
        </InputGroup>
      </Flex>
    </Box>
  )
}

export default GameFilter

const filters = [
  { id: 1, name: "all", value: "" },
  { id: 2, name: "hot", value: "Hot" },
];