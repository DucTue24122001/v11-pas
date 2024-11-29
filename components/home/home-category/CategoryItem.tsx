import { clientAction } from '@/configs/redux/client-slice'
import { RootState } from '@/configs/redux/store'
import { NavItemEnum } from '@/constants/enum'
import { Center, Image, Text } from '@chakra-ui/react'
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

type TCategoryItem = {
  category: {
    name: string,
    icon: string,
    value: NavItemEnum,
  },
  setCurrentPos?: (currentPos: number) => void,
}

const CategoryItem = ({category, setCurrentPos}: TCategoryItem) => {
  const {currentCategorySelect} = useSelector((state: RootState) => state.client)
  const categoryRef = useRef<any>(null)
  const dispatch = useDispatch()


  return (
    <Center sx={categoryItem} maxW={"40px"} ref={categoryRef} w={"100%"}
      visibility={currentCategorySelect === category.value ? "hidden" : "visible"}
      onClick={() => {
        dispatch(clientAction.setCategorySelect(category.value))
        const {x, width} = categoryRef?.current?.getBoundingClientRect()
        setCurrentPos && setCurrentPos(x - width/2)
      }}>
      <Image alt='category' src={category.icon} boxSize={"6.153846vw"}/>
      <Text color={"white"} whiteSpace={"nowrap"}>{category.name}</Text>
    </Center>
  )
}

export default CategoryItem

const categoryItem = {
  w: "13.846154vw",
  pos: "relative",
  zIndex: 3,
  flexDir: "column",
  p: "1.025641vw 0",
  m: "0 1.512821vw",
}
