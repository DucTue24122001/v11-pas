import { colors } from '@/configs/chakra-ui/color'
import { NavItemEnum } from '@/constants/enum'
import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'

type TCategoryHeaderProps = {
  srcImg: string,
  gameType: string
}

const CategoryHeader = ({srcImg, gameType}: TCategoryHeaderProps) => {

  const convertTitleGameType = (title: string) => {
    switch (title) {
      case NavItemEnum.CASINO:
        return "Casino"
      case NavItemEnum.SLOT:
        return "Slot"
      case NavItemEnum.ARCADE:
        return "Arcade"
      case NavItemEnum.FISHING:
        return "Fishing"
      case NavItemEnum.LIVE:
        return "Live Arena"
      case NavItemEnum.LOTTERY:
        return "Lottery"
      case NavItemEnum.SPORT:
        return "Sport"
      case NavItemEnum.TABLE:
        return "Table"
      default:
        return title
    }
  }
  
  return (
    <Flex
      mb={2}
      justifyContent={"start"}
      p={"5px 0"}
    >
      <Box borderBottom={"1px solid #fff"} >
          {""}
        </Box>
        <Flex w={"fit-content"}>
          <Image
            fill={colors.primary}
            h={"24px"}
            w={"24px"}
            src={`/nav-png/${srcImg.toLocaleLowerCase()}_active.png`}
            alt=""
          ></Image>
          <Text
            fontSize={["14px", "14px", "1.17em", "1.17em"]}
            ml={2}
            textTransform={"capitalize"}
            fontWeight={600}
          >
            {convertTitleGameType(gameType)}
          </Text>
        </Flex>
        <Box borderBottom={"1px solid #fff"} >
          {""}
        </Box>
    </Flex>
  )
}

export default CategoryHeader