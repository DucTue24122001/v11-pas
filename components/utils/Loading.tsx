import { Flex, Image } from "@chakra-ui/react";

export function Loading() {

  return (
    <Flex
      w={"100%"}
      h={"100%"}
      textAlign={"center"}
      pos={"fixed"}
      background={"#0005"}
      zIndex={9999999}
      top={0}
      left={0}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Image
        w={"70px"}
        opacity={0.6}
        src={"/images/loading.gif"}
        alt="gift"
      />
    </Flex>
  )
}