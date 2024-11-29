import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { colors } from "@/configs/chakra-ui/color";
import PoliciesNavBar from "./PoliciesNavBar";
import { useTranslations } from "next-intl";
import { RootState } from "@/configs/redux/store";

const PoliciesLayout = ({ children }: any) => {
  const router = useRouter();
  const { currentPolicies } = useSelector((state: RootState) => state.client);
  const t = useTranslations();

  return (
    <Flex
      minH={"90vh"}
      alignItems={"center"}
      py={["0px", "0px", "20px", "20px"]}
      flexDir={"column"}
      pb={["70px","70px","0px","0px"]}
    >
      <PoliciesNavBar alignSelf={"flex-start"} w={"100%"} />
      <Flex className="layout" gap={["20px", "20px", "60px", "60px"]} flexDir={"column"} pb={10} px={2}>
        <Flex h={"fit-content"} display={["none", "none", "flex", "flex"]}>
        <Box
            px={"16px"}
            py={"15px"}
            borderRight={`1px solid ${colors.default.table}`}
            // onClick={() => router.push(`../policies/${policies.directPage}`)}
            onClick={() => router.push("/policies/terms")}
            cursor={"pointer"}
            transition={".3s"}
            _hover={{ bgColor: colors.default.hoverGray }}
          >
            <Text
              textTransform={"uppercase"}
              fontWeight={600}
              fontSize={"14px"}
              color={
                currentPolicies === "terms" ? colors.primary : colors.secondary
              }
            >
              {t("terms_and_condition")}
            </Text>
          </Box>
          <Box
            px={"16px"}
            py={"15px"}
            borderRight={`1px solid ${colors.default.table}`}
            // onClick={() => router.push(`../policies/${policies.directPage}`)}
            onClick={() => router.push("/policies/privacy")}
            cursor={"pointer"}
            transition={".3s"}
            _hover={{ bgColor: colors.default.hoverGray }}
          >
            <Text
              textTransform={"uppercase"}
              fontWeight={600}
              fontSize={"14px"}
              color={
                currentPolicies === "privacy"
                  ? colors.primary
                  : colors.secondary
              }
            >
              {t("privacy_policy")}
            </Text>
          </Box>  
          <Box
            px={"16px"}
            py={"15px"}
            borderRight={`1px solid ${colors.default.table}`}
            // onClick={() => router.push(`../policies/${policies.directPage}`)}
            onClick={() => router.push("/policies/disconnect")}
            cursor={"pointer"}
            transition={".3s"}
            _hover={{ bgColor: colors.default.hoverGray }}
          >
            <Text
              textTransform={"uppercase"}
              fontWeight={600}
              fontSize={"14px"}
              color={
                currentPolicies === "disconnect"
                  ? colors.primary
                  : colors.secondary
              }
            >
              {t("disconnection_policy")}
            </Text>
          </Box>
        </Flex>
        {children}
      </Flex>
    </Flex>
  );
};

export default PoliciesLayout;
