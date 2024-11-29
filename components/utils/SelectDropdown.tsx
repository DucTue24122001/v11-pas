import { Box, Flex } from '@chakra-ui/react'
import React, { useRef } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { colors } from '@/configs/chakra-ui/color'
import { useTenancy } from '@/configs/providers/TenancyProvider'
import { useOutsideClick } from '@/helpers/useOutsideHandler'

export const SelectDropdown = ({dropdownList, isDropdown, openDropdown, closeDropdown, currentSelect, ...props}: any) => {
  const dropdownRef = useRef(null)

  useOutsideClick(dropdownRef, closeDropdown)

  return (
    <Box pos={"relative"} ref={dropdownRef} {...props}>
      <Flex px={"16px"} h={["50px","50px","35px","35px"]} borderRadius={5} justifyContent={'space-between'}
        bgColor={[colors.default.bg, colors.default.bg, colors.default.white, colors.default.white]}
        border={[`none`,`none`,`1px solid ${colors.default.input}`,`1px solid ${colors.default.input}`]} alignItems={'center'} cursor={'pointer'}
        onClick={openDropdown} overflowX={"hidden"} whiteSpace={'nowrap'} fontSize={14} fontWeight={700}>
        {currentSelect}
        {!isDropdown ? <ChevronDownIcon/> : <ChevronUpIcon/>}
      </Flex>
      {isDropdown && dropdownList && <Box pos={'absolute'} zIndex={5} bgColor={colors.default.white} overflowX={"hidden"} whiteSpace={'nowrap'} w={"100%"} borderRadius={5} py={"8px"} 
        maxH={"300px"} boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"}>
        {dropdownList}
      </Box>}
    </Box>
  )
}

export const DropdownItem = ({currentId, id, children, ...props}: any) => {
  const tenancy = useTenancy()
  return (
    <Flex px={"16px"} h={'50px'} alignItems={"center"} w={"100%"} 
            fontSize={14} fontWeight={700} cursor={'pointer'}
            _hover={{bgColor: currentId === id ? "#f9e6b5" : colors.default.bg}} transition={".3s"} 
            id={id}
            color={currentId === id ? colors.default.white : colors.default.font}
            bg={currentId === id ? colors.primaryBg : colors.default.white}
            {...props}>
              {children}
    </Flex>
  )
}