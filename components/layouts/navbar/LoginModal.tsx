"use client";
import {
  Box,
  Center,
  Checkbox,
  Flex,
  Image,
  Link,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Switch,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginFormEnum } from "@/constants/enum";
import logo from "@/public/images/pasv5logo.png";
import { useTenancy } from "@/configs/providers/TenancyProvider";
import { useBreakpoint } from "@/configs/providers/ViewportProvider";
import httpClient from "@/configs/axios/api";
import { RootState } from "@/configs/redux/store";
import ClientService from "@/helpers/ClientService";
import { useTranslations } from "next-intl";
import { clientAction } from "@/configs/redux/client-slice";
import DefaultInput from "@/components/utils/DefaultInput";
import DefaultInputPassword from "@/components/utils/DefaultInputPassword";
import DefaultButton from "@/components/utils/DefaultButton";
import { colors } from "@/configs/chakra-ui/color";
import { useRouter } from "next/navigation";

const LoginModal = () => {
  const { isShowLoginModal, loginForm, isCheckRemember } = useSelector(
    (state: RootState) => state.client
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<any>("");
  const dispatch = useDispatch();
  const rememberMeData = ClientService.getRememberMe();
  const isBreakpoint = useBreakpoint();
  const t = useTranslations();
  const tenancy = useTenancy();
  const router = useRouter();

  useEffect(() => {
    if (rememberMeData) {
      dispatch(
        clientAction.setLoginForm({
          name: "usernameOrEmailAddress",
          value: rememberMeData.username,
        })
      );
      dispatch(
        clientAction.setLoginForm({
          name: "password",
          value: rememberMeData.password,
        })
      );
      dispatch(clientAction.setIsCheckRemember(rememberMeData.isCheckRemember));
    }
  }, []);

  const loginFormHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(clientAction.setLoginForm({ name, value }));
  };

  const loginHandle = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!loginForm.usernameOrEmailAddress || !loginForm.password) {
      setIsError(t("username_password_required"));
      return;
    }
    setIsLoading(true);
    try {
      const data: any = await httpClient.Authentication.login({
        ...loginForm,
        TenancyName: tenancy?.tenancyName,
      });
      if (data.error) {
        setIsError(data.error.message);
      } else {
        if (isCheckRemember) {
          ClientService.saveRememberMe({
            username: loginForm.usernameOrEmailAddress,
            password: loginForm.password,
            isCheckRemember,
          });
        } else {
          ClientService.unSaveRememberMe();
        }
        if (data.result.token) {
          ClientService.login(data.result.token);
          router.push("/");
          setIsError("");
          dispatch(clientAction.handleShowRegisterModal(false));
        } else {
          dispatch(clientAction.handleShowRegisterModal(false));
          dispatch(
            clientAction.setOldAccountRegistInfo({
              ...data.result,
              emailAddress: data.result.userName + "@default.com",
            })
          );
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    dispatch(clientAction.handleShowForgotPwModal(true));
    dispatch(clientAction.handleShowRegisterModal(false));
  };

  return (
    <Box
      w={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Flex
        w={"100%"}
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <form style={{width:"inherit"}} onSubmit={loginHandle}>
          <SimpleGrid
            w={["100%", "100%", "400px", "400px"]}
            spacingX={10}
            spacingY={2}
            margin={"auto"}
          >
            <DefaultInput
              name={LoginFormEnum.Username}
              value={loginForm.usernameOrEmailAddress}
              placeholder={t("username")}
              onChange={loginFormHandle}
            />
            <DefaultInputPassword
              name={LoginFormEnum.Password}
              value={loginForm.password}
              placeholder={t("password")}
              onChange={loginFormHandle}
            />
            {isError && (
              <Text alignSelf={"flex-end"} fontSize={"sm"} color={"#ce4242"}>
                {isError}
              </Text>
            )}
            <Flex
              display={["none", "none", "flex", "flex"]}
              justifyContent={"flex-end"}
              gap={2}
              mt={4}
              color={"#98a2b3"}
            >
              <label htmlFor={"remember-desktop"}>{t("Remember")}</label>
              <Switch
                id="remember-desktop"
                _focusVisible={{ outline: "none" }}
                colorScheme={"blue"}
                isChecked={isCheckRemember}
                onChange={(e) =>
                  dispatch(clientAction.setIsCheckRemember(e.target.checked))
                }
              />
            </Flex>
            <Flex
              justifyContent={"flex-start"}
              gap={2}
              mb={5}
              display={["flex", "flex", "none", "none"]}
              color={"#98a2b3"}
            >
              <Checkbox
                id="remember-mobile"
                _focusVisible={{ outline: "none" }}
                colorScheme={"blue"}
                isChecked={isCheckRemember}
                onChange={(e) =>
                  dispatch(clientAction.setIsCheckRemember(e.target.checked))
                }
              />
              <label htmlFor={"remember-mobile"}>{t("Remember")}</label>
            </Flex>
            <DefaultButton
              h={["50px", "50px", "40px", "40px"]}
              bg={colors.primaryBg}
              type={"submit"}
              isLoading={isLoading}
              color={colors.default.white}
              textTransform={"uppercase"}
            >
              {t("Login")}
            </DefaultButton>
            <Link
              onClick={handleForgotPassword}
              color={colors.primary}
              fontSize={["14px", "14px", "16px", "16px"]}
              textAlign={"center"}
            >
              {t("Forgot_Password")}
            </Link>
            <Flex
              flexDir={"column"}
              display={["none", "none", "flex", "flex"]}
            >
              <Flex gap={1}>
                <Text color={"#98a2b3"}>{t("not_a_member")},</Text>
              </Flex>
              <Link color={colors.primary}>
                {t("contact_customer_service")}
              </Link>
            </Flex>
          </SimpleGrid>
        </form>
      </Flex>
    </Box>
  );
};

export default LoginModal;
