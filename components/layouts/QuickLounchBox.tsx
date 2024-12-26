import { Flex, Image } from "@chakra-ui/react";
import React, { useState } from "react";
import { MdHorizontalRule } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import inboxIco from "@/public/images/icon_inbox.png";
import vipIco from "@/public/images/icon_vip.png";
import homeIco from "@/public/images/icon_home.png";
import promoIco from "@/public/images/icon_promotion.png";
import logoutIco from "@/public/images/icon_logout.png";
import { useBreakpoint } from "@/constants/hooks/useBreakpoint";
import { useRouter } from "next/navigation";
import ClientService from "@/helpers/ClientService";
import { useDispatch } from "react-redux";
import { useCheckTokenProvider } from "@/configs/providers/CheckTokenProvider";
import { clientAction } from "@/configs/redux/client-slice";

const QuickLounchBox = () => {
  const [show, setShow] = useState(false);
  const width = useBreakpoint(900);
  const router = useRouter();
  const dispatch = useDispatch()
  const accountStatus = useCheckTokenProvider()

  const handleShowBox = () => {
    setShow(!show);
  };
  console.log(accountStatus?.isLogin);
  

  const handleClickMenu = (hrf:string) => {
    if (accountStatus?.isLogin) {
      router.push(hrf)
    }else{
      dispatch(clientAction.handleShowRegisterModal(true))
      dispatch(clientAction.setLoginOrRegister(true))
    }
  }

  if (width) {
    return null;
  }

  return (
    <Flex
      bg={"#fff"}
      borderRadius={"10px"}
      boxShadow={"0 0 10px 0 rgba(0,0,0,.2)"}
      pos={"fixed"}
      left={"10px"}
      overflow={"hidden"}
      p={"10px"}
      top={"200px"}
      w={"70px"}
      maxH={!show ? "360px" : "60px"}
      transition={"all .3s"}
      flexDir={"column"}
    >
      <Flex
        cursor={"pointer"}
        onClick={handleShowBox}
        justifyContent={"center"}
        alignItems={"center"}
        bg={"#F2F4F7"}
        p={"10px"}
        borderRadius={"100%"}
        margin={"auto"}
        mb={5}
      >
        {show ? <MdAdd fontSize={20} /> : <MdHorizontalRule fontSize={20} />}
      </Flex>
      <Flex flexDir={"column"} gap={2}>
        {menuDummy.map((item, i) => (
          <Flex cursor={"pointer"} justifyContent={"center"} key={i}>
            <Image
              _hover={{ transform: "scale(1.5)", transition: "all .5s" }}
              maxW={"45px"}
              onClick={() => handleClickMenu(item.hrf)}
              src={item.img}
            />
          </Flex>
        ))}
        <Flex display={accountStatus?.isLogin ? "flex" : "none"} cursor={"pointer"} justifyContent={"center"}>
          <Image
            _hover={{ transform: "scale(1.5)", transition: "all .5s" }}
            maxW={"45px"}
            onClick={() => {
              ClientService.logout()
              router.push("/");
            }}
            src={logoutIco.src}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default QuickLounchBox;

const menuDummy = [
  {
    img: homeIco.src,
    hrf: "/",
  },
  {
    img: inboxIco.src,
    hrf: "/account/inbox",
  },
  {
    img: vipIco.src,
    hrf: "/account/vip",
  },
  {
    img: promoIco.src,
    hrf: "/promotion",
  },
];
