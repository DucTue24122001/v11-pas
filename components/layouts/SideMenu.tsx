"use client"
import { colors } from '@/configs/chakra-ui/color'
import { useCheckTokenProvider } from '@/configs/providers/CheckTokenProvider'
import { useTenancy } from '@/configs/providers/TenancyProvider'
import { useViewport } from '@/configs/providers/ViewportProvider'
import { PageEnum, PoliciesEnum } from '@/constants/enum'
import { Box, Flex, Image, Text, useClipboard } from '@chakra-ui/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { IoMdCheckmark } from 'react-icons/io'
import { MdLogout, MdOutlinePolicy } from 'react-icons/md'
import { TbCopy } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import ImageLanguage from './ImageLanguage'
import { RootState } from '@/configs/redux/store'
import { useTranslations } from 'next-intl'
import { clientAction } from '@/configs/redux/client-slice'
import { useParams, useRouter } from 'next/navigation'
import { convertDecimalNum } from '@/helpers/functions'
import { navItem } from '@/constants/dummy-data'
import ClientService from '@/helpers/ClientService'
import LayoutBlock from './LayoutBlock'
import { IoIosClose } from "react-icons/io"
import homeIco from "@/public/nav-png/home_active.png"

const SideMenu = () => {
  const {isShowMenu} = useSelector((state: RootState) => state.client)
  const {height} = useViewport()
  const tenancy = useTenancy()
  const accountStatus = useCheckTokenProvider()
  const { onCopy } = useClipboard(accountStatus?.surName || "");
  const [isCopy, setIsCopy] = useState(false);
  const t = useTranslations()
  const dispatch = useDispatch()
  const router = useRouter()
  const as = useParams()
  useEffect(() => {
    if (typeof window !== "undefined") {
      dispatch(clientAction.handleShowMenu(false))
    }
  },[as])

  return (
    <>
      <Flex transition={".3s"} zIndex={10000} py={"20px"} px={"20px"} flexDir={'column'} pos={"fixed"} left={0} color={"#fff"}
      w={"80vw"} h={height} overflowY={"auto"} bgColor={colors.default.white} boxShadow={"0.5333333333vw 0 0.8vw #0000001a"}
      transform={isShowMenu ? 'translateX(0)' : 'translateX(-100%)'}>
        <Flex pos={"relative"} mb={5}>
          <Image alt='logo' src='/images/pasv5logo.png' h={["30px","30px","40px","40px"]} objectFit={"cover"}/>
          <Flex boxSize={"25px"} justifyContent={"center"} alignItems={"center"} 
          pos={"absolute"} right={"5px"} top={0} bg={"#f2f4f7"} borderRadius={"50%"} 
          onClick={() => dispatch(clientAction.handleShowMenu(false))}
          >
            <IoIosClose fontSize={18} color={colors.default.black}/>
          </Flex>
        </Flex>
        
        {/* Player info */}
        {accountStatus?.isLogin && <>
        <Flex
          py={"4px"}
          flexDir={"column"}
          fontSize={16}
          gap={"2px"}
          color={colors.default.black}
        >
          <Text>User: {accountStatus?.name}</Text>
          <Flex gap={1}> 
            ID:
            <Flex
              cursor={"pointer"}
              alignItems={"center"}
              gap={1}
              onClick={() => {
                setIsCopy(true);
                setTimeout(() => setIsCopy(false), 3000);
                onCopy();
              }}
            >
              {accountStatus?.surName}
              {isCopy ? <IoMdCheckmark /> : <TbCopy />}
            </Flex>
          </Flex>
            <Text>{tenancy?.currency}: <span style={{color: colors.default.success}}>{convertDecimalNum(accountStatus.balance)}</span></Text> 
        </Flex>
        </>}
        <Flex
          fontSize={13}
          gap={"2px"}
          sx={topMenuItem}
          onClick={() => router.push("/")}
        >
          <Image boxSize={"25px"} src={homeIco.src} alt='home' />
          <Text>{t('home')}</Text>
        </Flex>

        {/* account section */}
        {accountStatus?.isLogin && (
          <>
            <Flex flexDir={"column"} >
              {navItem.map((item, i) => (
                <Link href={item.href} key={i} onClick={() => dispatch(clientAction.handleShowMenu(false))}>
                  <Flex sx={topMenuItem}>
                    <Box fontSize={"24px"}>
                      {item.icon}
                    </Box>
                    <Text>{t(item.name)}</Text>
                  </Flex>
                </Link>
              ))}
            </Flex>
          </>
        )}

        {/* Policies and Language */}
        <Flex flexDir={"column"}>
          <Link href={`/${PageEnum.Policies}/${PoliciesEnum.Terms}`}>
            <Flex sx={topMenuItem} >
              <Box fontSize={"24px"}>
                <MdOutlinePolicy />
              </Box>
              <Text>{t("policies")}</Text>
            </Flex>
          </Link>
          {/* <Flex
            sx={topMenuItem}
            gap={"10px"}
            onClick={() => {
              dispatch(clientAction.handleShowLanguageModal(true));
              dispatch(clientAction.handleShowMenu(false));
            }}
          >
            <ImageLanguage boxSize={"19px"}/>
            <Text>{t("languages")}</Text>
          </Flex> */}

          {/* Logout */}
          {accountStatus?.isLogin && (
            <Flex
              sx={topMenuItem}
              gap={"8px"}
              color={colors.error}
              onClick={() => {
                ClientService.logout();
                router.push("/");
              }}
            >
              <Box fontSize={"24px"}>
                <MdLogout />
              </Box>
              <Text>{t("logout")}</Text>
            </Flex>
          )}
        </Flex>
      </Flex>
      <LayoutBlock isShow={isShowMenu} onClick={() => dispatch(clientAction.handleShowMenu(false))}/>
    </>
  )
}

export default SideMenu

const separateSpace = {
  minH:"2.6666666667vw",
  bg:"#111421",
}

const topMenuItem = {
  py: "2.6666666667vw",
  gap: "7px",
  fontSize: "3.7666666667vw",
  alignItems: "center",
  color:colors.default.black
};