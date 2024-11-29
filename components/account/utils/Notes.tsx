import { Flex, OrderedList, Text } from "@chakra-ui/react";
import React from "react";
import { AiFillQuestionCircle } from "react-icons/ai";
import { useTenancy } from "@/configs/providers/TenancyProvider";
import { colors } from "@/configs/chakra-ui/color";
import { useTranslations } from "next-intl";

const Notes = ({ children }: any) => {
  const tenancy = useTenancy()
  const t = useTranslations();
  return (
    <Flex
      w={"100%"}
      p={"30px 25px"}
      mb={20}
      gap={5}
      flexDir={"column"}
      display={["none", "none", "none", "flex", "flex"]}
      bgColor={colors.default.white}
      borderRadius={10}
      
    >
      <Flex fontSize={"20px"} alignItems={"center"} gap={4}>
        <AiFillQuestionCircle style={{ color:  colors.primary }} />
        <Text fontSize={"16px"} fontWeight={"bold"}>
          {t('notes')}
        </Text>
      </Flex>
      <OrderedList fontSize={"15px"}>{children}</OrderedList>
    </Flex>
  );
};

export default Notes;
