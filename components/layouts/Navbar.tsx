import { Box, Flex, Image, Text, Link } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useTenancy } from '@/configs/providers/TenancyProvider'
import { useDispatch, useSelector } from 'react-redux'
import { clientAction } from '@/configs/redux/client-slice'
import { useCheckTokenProvider } from '@/configs/providers/CheckTokenProvider'
import LoginSection from '../home/LoginSection'
import AccountDetail from '../home/AccountDetail'
import HomeCategory from '../home/HomeCategory'
import httpClient from '@/configs/axios/api'
import useSWR from 'swr'
import { useParams, usePathname, useRouter } from 'next/navigation'
import Marquee from 'react-fast-marquee'
import { Announcement } from '@/constants/type'
import { HiOutlineMegaphone } from 'react-icons/hi2'
import { PageEnum } from '@/constants/enum'
import { useLocale, useTranslations } from 'next-intl'
import menuIco from "@/public/images/icon_menu.png"
import ClientService from '@/helpers/ClientService'
import { RootState } from '@/configs/redux/store'
import { colors } from '@/configs/chakra-ui/color'
import teletgram_ico from "@/public/images/telegram_ico.png"
import en from "@/public/images/en.png"
import km from "@/public/images/km.png"
import my from "@/public/images/my.png"
import th from "@/public/images/th.png"
import zh from "@/public/images/ZH-CN.png"
import { useBreakpoint } from '@/constants/hooks/useBreakpoint'

const Navbar = () => {
  const {language} = useSelector((state:RootState) => state.client)
  const tenancy:any = useTenancy()
  const dispatch = useDispatch()
  const locale = useLocale()
  const accountStatus = useCheckTokenProvider()
  const {data: announcements} = useSWR("/announcements" + tenancy?.tenancyName + locale, () => httpClient.Content.getAnnouncement(tenancy?.tenancyName))
  const router = useRouter()
  const as = usePathname()
  const isLogin = ClientService.isAuthenticated();
  const isMobileBreakpoint = useBreakpoint(768)
  const t = useTranslations()
  

  useEffect(() => {
    if(tenancy?.lang) {
      const langList = tenancy.lang.split(",");
      dispatch(clientAction.setLanguageList(langList))
    }
  }, [tenancy])


  const showModalLanguage = () => {
    dispatch(clientAction.handleShowLanguageModal(true));
  };

  const imageLanguage = () => {
    if (typeof window !== "undefined") {
      const lang = window.localStorage.getItem("MY_LANGUAGE")
      switch (lang) {
        case "EN":
          return (
            <Image
              src={en.src}
              sx={langFlag}
              alt="lang"
              onClick={() => showModalLanguage()}
              // display={checkLogin && isMobileBreakpoint ? "none" : "block"}
            />
          );
        case "MY":
          return (
            <Image
              src={my.src}
              sx={langFlag}
              alt="lang"
              onClick={() => showModalLanguage()}
              // display={checkLogin && isMobileBreakpoint ? "none" : "block"}
            />
          );
        case "KM":
          return (
            <Image
              src={km.src}
              sx={langFlag}
              alt="lang"
              onClick={() => showModalLanguage()}
              // display={checkLogin && isMobileBreakpoint ? "none" : "block"}
            />
          );
        case "TH":
          return (
            <Image
              src={th.src}
              sx={langFlag}
              alt="lang"
              onClick={() => showModalLanguage()}
              // display={checkLogin && isMobileBreakpoint ? "none" : "block"}
            />
          );
        case "ZH-CN":
          return (
            <Image
              src={zh.src}
              sx={langFlag}
              alt="lang"
              onClick={() => showModalLanguage()}
              // display={checkLogin && isMobileBreakpoint ? "none" : "block"}
            />
          );
        default:
          return (
            <Image
              src={`/img/en.png`}
              sx={langFlag}
              alt="lang"
              onClick={() => showModalLanguage()}
              // display={checkLogin && isMobileBreakpoint ? "none" : "block"}
            />
          );
      }
    }
  };

  const handleOpenTelegramBot = () => {
    if (tenancy) {     
      if (!isLogin) {
        window.open(`https://t.me/${tenancy?.botName}`)
      }
       window.open(`https://t.me/${tenancy?.botName}?start=${tenancy?.botToken}`)
    }
  }

  return (
    <Flex overflow={"visible"} justifyContent={"center"} alignItems={"center"} flexDir={"column"} bg={"#fff"} pos={"sticky"} zIndex={1100} top={0} boxShadow={"0 4px 4px rgba(0, 0, 0, 0.4)"}>
      <Flex w={"100%"}>
      {announcements?.result?.length > 0 && <Marquee pauseOnHover={true}
        gradient={false}
        speed={40} 
        style={{background:"#f2f4f7"}}
        >
        <Flex gap={5} minH={"27px"} whiteSpace={"nowrap"}>
          {announcements?.result?.map((announce: Announcement, i: number) => (
            <Flex key={i} alignItems={'center'} gap={2} color={"#000"}>
              <Box fontSize={"20px"}>
                <HiOutlineMegaphone />
              </Box>
              <Link onClick={() => accountStatus?.isLogin ? router.push(`/${PageEnum.Account}/${PageEnum.Announce}`) : dispatch(clientAction.handleShowRegisterModal(true))}>
                <Text>{announce.body}</Text>
              </Link>
            </Flex>
          ))}
        </Flex>
      </Marquee>}
      </Flex>
      <Box w={["100%","100%","1400px","1400px"]}>
        <Flex h={["11.282051vw","11.282051vw","80px","80px"]} p={"0 15px"} 
          alignItems={'center'}
          justifyContent={"space-between"}
          color={"#fff"} 
          >
            <Flex gap={5} alignItems={"center"}>
                <Image display={["block", "none"]} onClick={() => dispatch(clientAction.handleShowMenu(true))} src={menuIco.src} boxSize={"20px"} objectFit={"contain"} alt='gift' />
                <Link href={"/"}>
                  <Image alt='logo' src='/images/pasv5logo.png' h={["20px","30px","40px","40px"]} objectFit={"cover"}/>
                </Link>
            </Flex>
            <Flex gap={1} alignItems={"center"}>
              {!accountStatus?.isLogin ? <LoginSection/> : <AccountDetail/>}
              <Flex h={"35px"} cursor={"pointer"} bg={isMobileBreakpoint ? "transparent" : "linear-gradient(270deg,#35aae0 0,#026492)"} justifyContent={"center"} alignItems={"center"} gap={"5px"} 
                  fontSize={["10px","14px"]} p={isMobileBreakpoint ? "0px" : ["3px 10px","2px 10px"]} borderRadius={"5px"} onClick={handleOpenTelegramBot}>
                  <Image src={teletgram_ico.src} w={["30px","35px"]} objectFit={"contain"}/>
                  <Text textTransform={"uppercase"} display={["none","none","block","block"]} fontWeight={600} color={colors.default.white}>{t('connect')}</Text>
              </Flex>
              {imageLanguage()}
            </Flex>
        </Flex>
        <Flex display={as == "/" ? ["flex","flex"] : ["none","flex"]}>
          <HomeCategory />
        </Flex>
      </Box>
    </Flex>
  )
}

export default Navbar
const langFlag = {
  boxSize: ["30px", "30px", "35px", "35px"],
  borderRadius: "50%",
  cursor: "pointer",
  border:"1px solid #043bfe",
  p:"2px"
};