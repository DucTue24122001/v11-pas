import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { colors } from "@/configs/chakra-ui/color";
import { useTranslations } from "next-intl";
import { RootState } from "@/configs/redux/store";

const PoliciesNavBar = ({ ...props }) => {
  const { currentPolicies } = useSelector((state: RootState) => state.client);
  const router = useRouter();
  const t = useTranslations()

  return (
    <Flex
      h={"50px"}
      display={["flex", "flex", "none", "none"]}
      mb={"10px"}
      bgColor={colors.default.bg}
      alignItems={"center"}
      fontSize={"14px"}
      fontWeight={"bold"}
      overflow={"auto"}
      {...props}
    >
      <Box
        px={5}
        minW={"fit-content"}
        fontSize={14}
        onClick={() => router.push('/policies/terms')}
        textTransform={"uppercase"}
        color={
          currentPolicies === "terms"
            ? colors.primary
            : colors.secondary
        }
      >
        {t('terms_and_condition')}
      </Box>
      <Box
        px={5}
        minW={"fit-content"}
        fontSize={14}
        onClick={() => router.push('/policies/privacy')}
        textTransform={"uppercase"}
        color={
          currentPolicies === 'privacy'
            ? colors.primary
            : colors.secondary
        }
      >
        {t('privacy_policy')}
      </Box>
      <Box
        px={5}
        minW={"fit-content"}
        fontSize={14}
        onClick={() => router.push('/policies/disconnect')}
        textTransform={"uppercase"}
        color={
          currentPolicies === "disconnect"
            ? colors.primary
            : colors.secondary
        }
      >
       {t('disconnection_policy')}
      </Box>
    </Flex>
  );
};

export default PoliciesNavBar;
