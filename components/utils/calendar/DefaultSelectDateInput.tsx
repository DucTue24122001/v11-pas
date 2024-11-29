/* eslint-disable react/no-children-prop */
import { Box, InputGroup, InputRightElement } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineCalendar } from 'react-icons/ai'
import { format } from 'date-fns/format'
import moment from 'moment'
import DefaultInput from '../DefaultInput'
import { colors } from '@/configs/chakra-ui/color'
import { useOutsideClick } from '@/helpers/useOutsideHandler'
import DefaultCalendar from './DefaultCalendar'

const DefaultSelectDateInput = ({selectDate, setShowCalendar, isSearchMonth, customizeDate, ...props}: any) => {
  const calendarRef = useRef(null)
  const [isShowCalendar, setIsShowCalendar] = useState(false)
  const [currentDateInput, setCurrentDateInput] = useState(`${moment().startOf('week').format("YYYY-MM-DD")} ~ ${moment().format("YYYY-MM-DD")}`)
  const disableDropdown = () => {
    setIsShowCalendar(false)
  }

  useEffect(() => {
    if (setShowCalendar) {
      setShowCalendar(isShowCalendar)
    }
  }, [isShowCalendar])
  
  useEffect(() => {
    if (customizeDate) {
      setCurrentDateInput(`${customizeDate.startDate} ~ ${customizeDate.endDate}`)
    }
  }, [customizeDate])

  useOutsideClick(calendarRef, disableDropdown)

  const selectDateHandler = (date: any) => {
    const startDate = new Date(date[0])
    const endDate = new Date(date[1])
    setCurrentDateInput(`${format(startDate, 'yyyy-MM-dd')} ~ ${format(endDate, 'yyyy-MM-dd')}`)
    setIsShowCalendar(false)
    if (selectDate) {
      selectDate(date)
    }
  }

  return (
    <Box position={"relative"} ref={calendarRef} {...props}>
      <InputGroup color={colors.default.lightGray} onClick={() => setIsShowCalendar(true)}>
        <DefaultInput value={currentDateInput} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentDateInput(e.target.value)}/>
        <InputRightElement h={["50px","50px","35px","35px"]} children={<AiOutlineCalendar/>}/>
      </InputGroup>
      {isShowCalendar && <DefaultCalendar position={"absolute"} isSearchMonth={isSearchMonth} confirmDate={selectDateHandler}/>}
    </Box>
  )
}

export default DefaultSelectDateInput