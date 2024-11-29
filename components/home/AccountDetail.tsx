import { border, Box, Center, Flex, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { BiBell } from 'react-icons/bi'
import { BsArrowRepeat } from 'react-icons/bs'
import { GiMoneyStack } from 'react-icons/gi'
import { useDispatch, useSelector } from 'react-redux'
import { color, motion } from "framer-motion"
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import Link from 'next/link'
import { RootState } from '@/configs/redux/store'
import { useTranslations } from 'next-intl'
import ClientService from '@/helpers/ClientService'
import httpClient from '@/configs/axios/api'
import { accountAction } from '@/configs/redux/account-slice'
import { colors } from '@/configs/chakra-ui/color'
import { convertDecimalNum } from '@/helpers/functions'
import { teko } from '@/app/utils/fonts'

const AccountDetail = () => {
  const {accountDetail, accountBalance, inboxMails, currentMailRead} = useSelector((state: RootState) => state.account)
  const {promotionCheck, isShowPlayingGameModal, isTogglePlayingGameModal} = useSelector((state: RootState) => state.client)
  const [isAnimating, setIsAnimating] = useState(false);
  const dispatch = useDispatch()
  const router = useRouter()
  const t = useTranslations()

  useEffect(() => {
    if(ClientService.isAuthenticated()) {
      (async () => {
        setIsAnimating(true);
        try {
          const data: any = await httpClient.User.getProfile()
          dispatch(accountAction.setAccountDetail(data.result))
          dispatch(accountAction.setAccountBalance(data.result.balance))
        } catch (err) {
          console.log(err);
        } finally {
          setIsAnimating(false)
        }
      })()
    }
  }, [dispatch, promotionCheck, router, isShowPlayingGameModal, isTogglePlayingGameModal])

  useEffect(() => {
    (async () => {
      dispatch(accountAction.fetchingMailStatus(true))
      try {
        const res: any = await httpClient.Inbox.getNotification()
        dispatch(accountAction.setInboxMail(res.result))
      } catch (err) {
        console.log(err);
      } finally {
        dispatch(accountAction.fetchingMailStatus(false))
      }
    })()
  }, [router])

  const unreadMail = useMemo(() => {
    return inboxMails.filter((mail:any) => mail.status === false).length
  }, [inboxMails, currentMailRead])

  const resetBalance = async () => {
    if (!ClientService.isAuthenticated()) {
      router.push("/")
      return
    }
    setIsAnimating(true);
    try {
      const data: any = await httpClient.User.getProfile()      
      dispatch(accountAction.setAccountBalance(data.result.balance))
    } catch(err) {
      console.log(err);
    } finally {
      setIsAnimating(false);
    }
  }

  return (
    <Flex>
    <Flex alignItems={"center"} display={["none", "none","none","flex"]} color={colors.default.black}>
      <Link href={"/account/profile"}>
        <Text fontSize={17} fontWeight={'600'} mr={"10px"} cursor={'pointer'}>{accountDetail?.userName}</Text>
      </Link>
      <Link href={"/account/inbox"}>
      <Box fontSize={"26px"} pl={2} mx={"15px"} cursor={'pointer'} pos={"relative"}>
        <BiBell/>
        {unreadMail !== 0 && <Text sx={mailNoti} pos={'absolute'}>
          {unreadMail}
        </Text>}
      </Box>
      </Link>
      {/* <Flex sx={pointDisplay}>
        <AiFillStar style={{color: colors.primary}}/>
        <Text sx={point}>0</Text>
      </Flex> */}
      <Flex sx={pointDisplay} onClick={resetBalance}>
        <Box>
          <GiMoneyStack style={{color: "#043bfe"}}/>
        </Box>
        <Text sx={point} w={"100%"}>{convertDecimalNum(+accountBalance)}</Text>
        <motion.div animate={{ rotate: isAnimating ? 360 : 0 }} transition={{duration: isAnimating ? 1 : 0, repeat: Infinity}}>
          <BsArrowRepeat style={{color:'#043bfe'}}/>
        </motion.div>
      </Flex>
      <Flex mx={"5px"} color={colors.default.white} fontWeight={"500"} fontSize={"15px"}>
        <Link href={"/account/deposit"}>
          <Center sx={button} bg={colors.default.green} textTransform={"uppercase"}>{t('deposit')}</Center>
        </Link>
        <Link href={"/account/withdraw"}>
          <Center sx={button} bg={colors.secondary} textTransform={"uppercase"}>{t('withdraw')}</Center>
        </Link>
      </Flex> 
    </Flex>
    <Flex gap={"5px"} display={["none", "flex","flex","none"]}>
          <Center sx={responsivePoint} gap={2} fontSize={"20px"} color={"rgba(0,0,0,.54)"} h={"30px"} onClick={resetBalance}>
            <Box>
              <GiMoneyStack/>
            </Box>
            <Text fontFamily={"Teko,sans-serif"} pt={"5px"} fontSize={"20px"} color={colors.secondary} w={"100%"}>{convertDecimalNum(+accountBalance)}</Text>
            <motion.div animate={{ rotate: isAnimating ? 360 : 0 }} transition={{duration: isAnimating ? 1 : 0}}>
              <BsArrowRepeat/>
            </motion.div>
          </Center>
          <Center sx={responsivePoint} boxSize={"30px"} onClick={() => router.push("/account/deposit")}>
            <AddIcon/>
          </Center>
          <Center sx={responsivePoint} boxSize={"30px"} onClick={() => router.push("/account/withdraw")}>
            <MinusIcon/>
          </Center>
        </Flex>
    </Flex>
  )
}

const responsivePoint = {
  border: `2px solid ${colors.secondary}`,
  borderRadius: "3px", 
  px: "5px",
  cursor: "pointer"
}

const pointDisplay = {
  px: "20px",
  mx: "5px",
  cursor: "pointer",
  alignItems: "center",
  minW: "150px",
  h: "35px",
  borderRadius: 5,
  fontWeight: 500,
  fontSize: "20px",
  gap: 2,
  border:"1px solid #043bfe"
}

const point = {
  fontFamily: `Teko, sans-serif`,
  fontSize: "18px",
  color:colors.default.black
}

const button = {
  fontSize: "15px",
  fontWeight: 600,
  h: "35px",
  mx: "5px",
  borderRadius: 5,
  minW: 130,
  cursor: "pointer"
}

const mailNoti = {
  border: 0,
  bgColor: colors.error,
  color: colors.default.white,
  borderRadius: "24px",
  fontSize: "12px",
  right: "5px",
  top: "-2px",
  boxSize: "24px",
  transform: "scale(.75)",
  textAlign: "center",
  transformOrigin: "80px -20px",
  mixBlendMode: "normal",
  lineHeight: "24px"
}

export default AccountDetail