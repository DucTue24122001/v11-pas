"use client"
import { Box, Center, Flex, Grid, Image, Spinner, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import totalInvImg from '@/public/images/Total_Invite.jpg'
import MTDWinLoss from '@/public/images/MTD_Winloss.jpg'
import MTDTurnover from '@/public/images/MTD_Turnover.jpg'
import MTDDeposit from '@/public/images/MTD_Deposit.jpg'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { colors } from '@/configs/chakra-ui/color'
import { RootState } from '@/configs/redux/store'
import { useTranslations } from 'next-intl'
import { Respond } from '@/constants/type'
import httpClient from '@/configs/axios/api'
import { accountAction } from '@/configs/redux/account-slice'
import Card from '@/components/utils/Card'
import { convertDecimalNum } from '@/helpers/functions'
import CustomizeNumberValue from '@/components/utils/CustomizeNumberValue'
import { DropdownItem, SelectDropdown } from '@/components/utils/SelectDropdown'

const checkColorNumber = (num: number | string | undefined) => {
  if (num) {
    switch (true) {
      case Number(num) < 0:
        return colors.error
      case Number(num) > 0:
        return colors.default.success
      case Number(num) == 0:
        return undefined
    }
  } else {
    return undefined
  }
}

const Downline = () => {
  const {downlineDetail, downlineCurrentMonthSearch} = useSelector((state: RootState) => state.account)
  const t = useTranslations()
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const dispatch = useDispatch()

  const searchDownline = async () => {
    setIsLoading(true)
    try {
      const data : Respond = await httpClient.Vip.getDownline(downlineCurrentMonthSearch)
      if (data.success) {
        dispatch(accountAction.setDownlineDetail(data.result))
      }
    } catch (err: any) {
      console.log(err);
      toast({
        status: "error",
        title: err?.response?.data?.error?.message || t('something_went_wrong'),
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    searchDownline()
  }, [downlineCurrentMonthSearch])

  if (isLoading) {
    return <>
    <Card minH={"80vh"}>
      <Box p={"5px"}>
        <SearchingDownline/>  
      </Box>
      <Center py={"10px"}>
        <Spinner color={colors.primary}/>
      </Center>
    </Card>
  </>
  }

  return (
    <>
      <Card pb={"80px"}>
        <Box p={["5px","5px","30px","30px"]}>
          <SearchingDownline searchDownline={searchDownline}/>
          <Grid templateColumns='repeat(2, 1fr)' gap={[4,4,8,8]} p={"10px"}>
            <Flex gap={3} alignItems={'center'}>
              <Image alt='total-inv' h={"50px"} src={totalInvImg.src}/>
              <Box>
                <Text mb={2}>{t("total_invite")}</Text>
                <Text>{downlineDetail?.summary.totalInvite}</Text>
              </Box>
            </Flex>
            <Flex gap={3} alignItems={'center'}>
              <Image alt='total-inv' h={"50px"} src={MTDDeposit.src}/>
              <Box>
                <Text mb={2}>{t("mtd_deposit")}</Text>
                <Text>{convertDecimalNum(downlineDetail?.summary.totalDeposit)}</Text>
              </Box>
            </Flex>
            <Flex gap={3} alignItems={'center'}>
              <Image alt='total-inv' h={"50px"} src={MTDTurnover.src}/>
              <Box>
                <Text mb={2}>{t("mtd_turnover")}</Text>
                <Text>{convertDecimalNum(downlineDetail?.summary.totalTurnover)}</Text>
              </Box>
            </Flex>
            <Flex gap={3} alignItems={'center'}>
              <Image alt='total-inv' h={"50px"} src={MTDWinLoss.src}/>
              <Box>
                <Text mb={2}>{t("mtd_winloss")}</Text>
                <Text color={checkColorNumber(downlineDetail?.summary.totalWinloss)}>{convertDecimalNum(downlineDetail?.summary.totalWinloss)}</Text>
              </Box>
            </Flex>
          </Grid>
        </Box>
        <Flex sx={headReport}>
          <Text>{t('profit_loss')}</Text>
          <CustomizeNumberValue num={downlineDetail?.totalProfit} fontSize={16}/>
        </Flex>
        <Flex sx={tableMobileReport}>
          <Text sx={tableItem}>{t('name')}</Text>
          <Text sx={tableItem} textAlign={"end"}>{t('turnover')}</Text>
          <Text sx={tableItem} textAlign={"end"}>{t('profit_loss')}</Text>
        </Flex>
        {downlineDetail && downlineDetail?.profit?.map((user, i) => (
          <Flex key={i} sx={tableMobileReport}>
            <Text sx={tableItem}>{user.username}</Text>
            <Text sx={tableItem} color={checkColorNumber(user.turnover)} textAlign={"end"}>{convertDecimalNum(user.turnover)}</Text>
            <Text sx={tableItem} color={checkColorNumber(user.profit)} textAlign={"end"}>{convertDecimalNum(user.profit)}</Text>
          </Flex>
        ))}
      </Card>
    </>
  )
}

export default Downline

const SearchingDownline = ({searchDownline}: any) => {
  const [isDropdown, setIsDropdown] = useState(false)
  const t = useTranslations()
  const monthsSearch = [
    {
      name: t("current_month"),
      value: moment().startOf('month').format("YYYY-MM-DD")
    },
    {
      name: moment().subtract(1, "month").format("MMM YYYY"),
      value: moment().subtract(1, "month").startOf('month').format("YYYY-MM-DD")
    },
    {
      name: moment().subtract(2, "month").format("MMM YYYY"),
      value: moment().subtract(2, "month").startOf('month').format("YYYY-MM-DD")
    },
    {
      name: moment().subtract(3, "month").format("MMM YYYY"),
      value: moment().subtract(3, "month").startOf('month').format("YYYY-MM-DD")
    },
  ]
  const dispatch = useDispatch()
  const [currentMonthSelect, setCurrentMonthSelect] = useState(monthsSearch[0])

  const selectMonthSearch = (monthValue: {name: string, value: string}) => {
    dispatch(accountAction.setDownlineCurrentMonthSearching(monthValue.value))
    setCurrentMonthSelect(monthValue)
    setIsDropdown(false)
  }

  
  return (
    <Box w={"100%"}>
      <Text fontWeight={[0,0,700,700]} color={""}>{t('downline_summary')}</Text>
      <SelectDropdown mt={"5px"} isDropdown={isDropdown} closeDropdown={() => setIsDropdown(false)} openDropdown={() => setIsDropdown(!isDropdown)}
        currentSelect={<Text>{currentMonthSelect.name}</Text>}
        dropdownList={
          monthsSearch.map((items, i) => (
            <DropdownItem key={i} onClick={() => selectMonthSearch(items)} currentId={currentMonthSelect.name} id={items.name}>
              <Text>{items.name}</Text>
            </DropdownItem>
          ))
        }>
      </SelectDropdown>
      {/* <DefaultButton mt={"10px"} onClick={searchDownline}>
        <AiOutlineSearch/>
        <Text ml={2}>{t('search')}</Text>
      </DefaultButton> */}
    </Box>
  )
}

const tableMobileReport = {
  p: "13px",
  justifyContent: 'space-between',
  fontSize: "14px",
  borderBottom: `1px solid ${colors.default.table}`,
}

const headReport = {
  p: "14px",
  color: colors.report.headFontColor,
  fontSize: 16,
  alignItems: 'center',
  justifyContent: 'space-between',
  bgColor: colors.report.mobileBg,
}

const tableItem = {
  flex: "1 1 0px",
}