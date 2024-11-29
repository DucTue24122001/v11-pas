import { Button, Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import Calendar from 'react-calendar'
import moment from 'moment';
import { colors } from '@/configs/chakra-ui/color';
import { useTranslations } from 'next-intl';

const DefaultCalendar = ({confirmDate, isSearchMonth, ...props}: any) => {
  const [date, setDate] = useState<any>([searchingDateValue.thisWeek._d ,new Date()])
  const t = useTranslations()
  
  return (
    <Flex {...props} zIndex={10} bgColor={colors.default.white} flexDir={['column','row','row','row']} borderRadius={5} border={`1px solid ${colors.default.lightGray}`}>
      <Flex fontSize={14} gap={[5,0,0,0]} w={["340px","340px","100px","100px"]} p={3} flexDir={['row','column','column','column']} overflow={'auto'}>
        <Text sx={dateButton} onClick={() => setDate([new Date(), new Date()])}>{t('today')}</Text>
        <Text sx={dateButton} onClick={() => setDate([searchingDateValue.yesterday._d, searchingDateValue.yesterday._d])}>{t('yesterday')}</Text>
        <Text sx={dateButton} onClick={() => setDate([searchingDateValue.thisWeek._d, new Date()])}>{t('this_week')}</Text>
        <Text sx={dateButton} onClick={() => setDate([searchingDateValue.startLastWeek._d, searchingDateValue.endLastWeek._d])}>{t('last_week')}</Text>
        <Text sx={dateButton} onClick={() => setDate([searchingDateValue.month._d, new Date()])} display={isSearchMonth ? "block" : "none"}>{t('this_month')}</Text>
        <Text sx={dateButton} onClick={() => setDate([searchingDateValue.startLastMonth._d, searchingDateValue.endLastMonth._d])} display={isSearchMonth ? "block" : "none"}>
        {t('last_month')}
        </Text>
      </Flex>
      <Flex borderLeft={`1px solid ${colors.default.lightGray}`} flexDir={'column'}>
      <Calendar selectRange={true}
        onChange={setDate}
        value={date}
        maxDate={new Date()}/>
        <Flex p={2} justifyContent={'flex-end'}>
          <Button size={"xs"} color={colors.default.gray} onClick={() => confirmDate(date)}>{t('ok')}</Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

const searchingDateValue: any = {
  yesterday: moment().subtract(1, "days"),
  thisWeek: moment().startOf("isoWeek"),
  startLastWeek: moment().isoWeekday(-6),
  endLastWeek: moment().isoWeekday(0),
  month: moment().startOf("month"),
  startLastMonth: moment().subtract(1, "month").startOf("month"),
  endLastMonth: moment().subtract(1, "month").endOf("month"),
};

const dateButton = {
  cursor: "pointer",
  minW: "fit-content"
}

export default DefaultCalendar