"use client"
import { NavItemEnum } from '@/constants/enum'
import { Box, Center, Flex, Image, Text } from '@chakra-ui/react'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import homeImg from "@/public/nav-png/home.png"
import slotImg from "@/public/nav-png/slot.png"
import casinoImg from "@/public/nav-png/live.png"
import arcadeImg from "@/public/nav-png/arcade.png"
import tableImg from "@/public/nav-png/rngtable.png"
import fishingImg from "@/public/nav-png/fh.png"
import sportImg from "@/public/nav-png/sports.png"
import lotteryImg from "@/public/nav-png/lottery.png"
import liveArenaImg from "@/public/nav-png/livearena.png"
import promoImg from "@/public/nav-png/promotion.png"
import categoryPointer from "@/public/images/category_pointer.png"
import CategoryItem from './home-category/CategoryItem'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/configs/redux/store'
import { clientAction } from '@/configs/redux/client-slice'
import PlayingGameModal from '../layouts/PlayingGameModal'
import { useBreakpoint } from '@/constants/hooks/useBreakpoint'
import homeActive from "@/public/nav-png/home_active.png"
import slotActive from "@/public/nav-png/slot_active.png"
import casinoActive from "@/public/nav-png/live_active.png"
import arcadeActive from "@/public/nav-png/arcade_active.png"
import tableActive from "@/public/nav-png/rngtable_active.png"
import fishingActive from "@/public/nav-png/fh_active.png"
import sportActive from "@/public/nav-png/sports_active.png"
import lotteryActive from "@/public/nav-png/lottery_active.png"
import livearenaActive from "@/public/nav-png/livearena_active.png"
import promoActive from "@/public/nav-png/promotion_active.png"
import { useParams, useRouter } from 'next/navigation'

const HomeCategory = () => {
  const {currentCategorySelect, isShowPlayingGameModal} = useSelector((state: RootState) => state.client)
  const [currentCategoryPos, setCurrentCategoryPos] = useState(0)
  const categoryContainerRef = useRef<any>(null)
  const dispatch = useDispatch()
  const categoryRef = useRef<any>(null)
  const breakpoint = useBreakpoint(900)
  const as:any = useParams()
  const router = useRouter()

  const currentCategoryImg = useMemo(() => {
    const currentCategory = categoryList.find(c => c.value === currentCategorySelect)
    return currentCategory?.icon_active
  }, [currentCategorySelect])
  

  useEffect(() => {
    switch (currentCategorySelect) {
      case NavItemEnum.SLOT:
        dispatch(clientAction.setCurrentPlatform("MIMI"));
        return;
      case NavItemEnum.FISHING:
        dispatch(clientAction.setCurrentPlatform("JILI"));
        return;
      case NavItemEnum.TABLE:
        dispatch(clientAction.setCurrentPlatform("JILI"));
        return;
      case NavItemEnum.ARCADE:
        dispatch(clientAction.setCurrentPlatform("JILI"));
        return;
      default:
        dispatch(clientAction.setCurrentPlatform(""));
        return;
    }
  }, [currentCategorySelect])
  

  return (
    <>
    <Box zIndex={100} ref={categoryRef}>
      <Box>
        {breakpoint ? 
          <Flex w={"100vw"} pos={"relative"} zIndex={2} overflowX={"auto"} 
            p={"0 1.025641vw 0 2.051282vw"}
            className='hidden-scroll'
            ref={categoryContainerRef} 
            bg={"linear-gradient(180deg,#484848,#191919)"} 
            gap={"20px"}>
            {categoryList.map((category, i) => {
              return <CategoryItem key={i} category={category}
                setCurrentPos={(currentPos) => {
                  const currentHorizontalContainerScroll = categoryContainerRef?.current?.scrollLeft
                  setCurrentCategoryPos(currentPos + currentHorizontalContainerScroll)
                }}/>
            })}
            <Center pos={"absolute"} left={currentCategoryPos} bottom={0} h={"11.794872vw"} transition={"width .3s,left .3s,right .3s"}
              bgImage={categoryPointer.src} bgPos={"bottom"} bgRepeat={"no-repeat"} bgSize={"contain"} w={"76px"}>
              <Image alt='category' src={currentCategoryImg} boxSize={"6.153846vw"}/>
            </Center>
          </Flex>
         : 
          <Flex display={as != "/" ? "flex" : "none"} overflowX={"auto"} overflowY={"hidden"}
            gap={"10px"}>
            {categoryList.map((category, i) => (
              <Flex key={i} alignItems={"center"} _hover={{color:"#000"}} gap={2} p={"10px"} cursor={"pointer"} onClick={() => {
                dispatch(clientAction.setCategorySelect(category.value))
                }}>
                {currentCategorySelect !== category.value ? 
                <Image alt='category' src={category.icon} boxSize={"30px"}/>
                : 
                <Image alt='category' src={category.icon_active} boxSize={"30px"}/>
                }
                <Text color={currentCategorySelect !== category.value ? "#98a2b3" :"#000"} fontSize={16} fontWeight={600}>{category.name}</Text>
              </Flex>
            ))}
          </Flex>
        }
      </Box>
    </Box>
    {isShowPlayingGameModal && <PlayingGameModal/>}
    </>
  )
}

export default HomeCategory
 
export const categoryList = [
  {
    name: "Home",
    icon: homeImg.src,
    icon_active: homeActive.src,
    value: NavItemEnum.HOME,
  },
  {
    name: "Live Arena",
    icon: liveArenaImg.src,
    icon_active: livearenaActive.src,
    value: NavItemEnum.LIVE,
  },
  {
    name: "Casino",
    icon: casinoImg.src,
    icon_active: casinoActive.src,
    value: NavItemEnum.CASINO,
  },
  {
    name: "Sports",
    icon: sportImg.src,
    icon_active: sportActive.src,
    value: NavItemEnum.SPORT,
  },
  {
    name: "Fishing",
    icon: fishingImg.src,
    icon_active: fishingActive.src,
    value: NavItemEnum.FISHING,
  },
  {
    name: "Slots",
    icon: slotImg.src,
    icon_active: slotActive.src,
    value: NavItemEnum.SLOT,
  },
  {
    name: "Lottery",
    icon: lotteryImg.src,
    icon_active: lotteryActive.src,
    value: NavItemEnum.LOTTERY,
  },
  {
    name: "Arcade",
    icon: arcadeImg.src,
    icon_active: arcadeActive.src,
    value: NavItemEnum.ARCADE,
  },
  {
    name: "Table",
    icon: tableImg.src,
    icon_active: tableActive.src,
    value: NavItemEnum.TABLE,
  },
]