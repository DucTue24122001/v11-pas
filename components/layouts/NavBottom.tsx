import { Box, Center, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { PageEnum } from '@/constants/enum'
import { useCheckTokenProvider } from '@/configs/providers/CheckTokenProvider'
import { usePathname, useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { clientAction } from '@/configs/redux/client-slice'

const NavBottom = () => {
  const accountStatus = useCheckTokenProvider()
  const router = useRouter()
  const dispatch = useDispatch()
  const pathname = usePathname()

  return (
    <Box sx={navBottom}>
      <Flex w={"100%"} justifyContent={"space-around"}>
        {navBottomItem.map((item, i) => {
          return (<Center key={i} cursor={"pointer"} flexDir={'column'} flex={".2 1"} onClick={() => {
            if (!item.isAuth) router.push(item.href)
            else {
              if (accountStatus?.isLogin) {
                router.push(item.href)
              } else {
                dispatch(clientAction.handleShowRegisterModal(true))
              }
            }
          }}>
              <Image alt={item.name} src={pathname === item.href ? item.iconFocus : item.icon} 
                boxSize={["24px","24px","30px","30px"]} mt={"1.025641vw"}/>
              <Text fontSize={["13px","13px","20px","20px"]}>{item.name}</Text>
            </Center>)
        })}
      </Flex>
    </Box>
  )
}

export default NavBottom

const navBottom = {
  pos:"fixed",
  maxW: "600px",
  w:"100%",
  minH:["12.820513vw","12.820513vw","80px","80px"],
  left:"50%",
  transform:"translateX(-50%)",
  bottom:0,
  zIndex:100,
  backdropFilter:"blur(1.923077vw)",
  borderTop:".5px solid #f0f0f0",
  bg:"#ffffffe5",
  boxShadow:"0 -.512821vw 2.051282vw 0 rgba(0,0,0,.04)",
}

const navBottomItem = [
  {
    name: "Home",
    icon: "/images/home.png",
    iconFocus: "/images/home-hover.png",
    isAuth: false,
    href: "/",
  },
  {
    name: "Promotion",
    icon: "/images/gift.png",
    iconFocus: "/images/gift-hover.png",
    isAuth: false,
    href: "/promotion",
  },
  {
    name: "Deposit",
    icon: "/images/wallet.png",
    iconFocus: "/images/wallet-hover.png",
    isAuth: true,
    href: "/account/deposit",
  },
  {
    name: "VIP",
    icon: "/images/crown.png",
    iconFocus: "/images/crown-hover.png",
    isAuth: true,
    href: `/${PageEnum.Account}/${PageEnum.Vip}`,
  },
  {
    name: "Profile",
    icon: "/images/user.png",
    iconFocus: "/images/user-hover.png",
    isAuth: true,
    href: `/${PageEnum.Account}/${PageEnum.Profile}`,
  },
]