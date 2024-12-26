import { useBreakpoint } from "@/constants/hooks/useBreakpoint";
import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { FaChevronUp } from "react-icons/fa";
const ScrollToTop = () => {
    const width = useBreakpoint(900)
    const handleScrollTotop = () => {
        if (typeof window !== "undefined") {
            window.scrollTo({top:0, behavior:"smooth"})
        }
    }
    if (width) {
        return null
    }
  return (
    <Flex
      bg={"#fff"}
      boxShadow={"0 0 10px 0 rgba(0,0,0,.2)"}
      borderRadius={"10px"}
      w={"70px"}
      height={"70px"}
      overflow={"hidden"}
      pos={"fixed"}
      padding={"10px"}
      top={"580px"}
      right={"10px"}
      transition={"all .3s"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDir={"column"}
      color={"#ccc"}
      onClick={handleScrollTotop}
      cursor={"pointer"}
    >
        <FaChevronUp fontSize={18} />
      <Text fontSize={16} fontWeight={600}>TOP</Text>
    </Flex>
  );
};

export default ScrollToTop;
