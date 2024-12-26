import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  Link,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { LoginFormEnum } from "../../constants/enum";
import { useDispatch, useSelector } from "react-redux";
import { useBreakpoint } from "@/constants/hooks/useBreakpoint";
import ClientService from "@/helpers/ClientService";
import { RootState } from "@/configs/redux/store";
import { useTranslations } from "next-intl";
import { useTenancy } from "@/configs/providers/TenancyProvider";
import { clientAction } from "@/configs/redux/client-slice";
import DefaultInput from "../utils/DefaultInput";
import { colors } from "@/configs/chakra-ui/color";
import DefaultInputPassword from "../utils/DefaultInputPassword";
import httpClient from "@/configs/axios/api";
import { useRouter } from "next/navigation";

const LoginSection = () => {
  const dispatch = useDispatch();
  const isBreakpoint = useBreakpoint(840);
  const rememberMe = ClientService.getRememberMe();
  const { loginForm, isCheckRemember } = useSelector(
    (state: RootState) => state.client
  );
  const router = useRouter();
  const [isError, setIsError] = useState<any>("");
  const [isLoading, setIsLoading] = useState(false);
  const t  = useTranslations();
  const tenancy = useTenancy();

  useEffect(() => {
    dispatch(
      clientAction.setRememberMeLogin({
        username: rememberMe ? rememberMe.username : "",
        password: rememberMe ? rememberMe.password : "",
      })
    );
    dispatch(
      clientAction.setIsCheckRemember(
        rememberMe ? rememberMe.isCheckRemember : false
      )
    );
  }, []);
  
  const loginInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(clientAction.setLoginForm({ name, value }));
  };

  const loginHandler = async (e: React.SyntheticEvent) => {
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
        } else {
          dispatch(clientAction.handleShowRegistOldAccountModal(true));
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

  return (
    <Flex mr={[0,2]}>
      <form onSubmit={loginHandler}>
        <Flex gap={2} alignItems={"center"}>
          <Box position={"relative"} display={["none", "none", "none", "block"]}>
            <DefaultInput
              w={"200px"}
              placeholder={t("username")}
              value={loginForm.usernameOrEmailAddress}
              tabIndex={1}
              name={LoginFormEnum.Username}
              borderColor={colors.default.white}
              color={colors.default.black}
              onChange={loginInputHandler}
            />
            <Center position={"absolute"} color={colors.check} right={0}>
              <Checkbox
                size="md"
                bottom={0}
                colorScheme="blue"
                isChecked={isCheckRemember}
                onChange={(e) =>
                  dispatch(clientAction.setIsCheckRemember(e.target.checked))
                }
              >
                {t("Remember")}
              </Checkbox>
            </Center>
          </Box>
          <Flex position={"relative"} display={["none", "none", "none", "block"]}>
            <DefaultInputPassword
              value={loginForm.password}
              w={"200px"}
              placeholder={t("password")}
              tabIndex={2}
              name={LoginFormEnum.Password}
              borderColor={colors.default.white}
              color={colors.default.black}
              onChange={loginInputHandler}
            />
            {isError && (
              <Text
                position={"absolute"}
                right={0}
                top={-5}
                textAlign={"end"}
                w={"500px"}
                fontSize={"sm"}
                color={colors.error}
              >
                {isError}
              </Text>
            )}
            <Link
              position={"absolute"}
              fontSize={"md"}
              color={colors.check}
              right={0}
              onClick={() => dispatch(clientAction.handleShowForgotPwModal(true))}
            >
              {t("Forgot_Password")}
            </Link>
          </Flex>
          <Button
            _hover={{ bg: "transparent" }}
            display={["block", "block", "block", "none"]}
            bgColor={colors.secondary}
            sx={navButton}
            color={colors.default.white}
            isLoading={isLoading}
            onClick={() => {dispatch(clientAction.handleShowRegisterModal(true))
              dispatch(clientAction.setLoginOrRegister(true))
            }}
            textTransform={"uppercase"}
          >
            {t("Login")}
          </Button>
          <Button
            _hover={{ bg: "transparent" }}
            display={["none", "none", "none", "block"]}
            bgColor={colors.default.white}
            border={"1px solid #043bfe"}
            sx={navButton}
            color={colors.primary}
            type="submit"
            isLoading={isLoading}
            textTransform={"uppercase"}
          >
            {t("Login")}
          </Button>
          <Button
            _hover={{ bg:colors.primaryBg }}
            bg={colors.primaryBg}
            sx={navButton}
            color={colors.default.white}
            textTransform={"uppercase"}
            onClick={() =>{
              dispatch(clientAction.handleShowRegisterModal(true))
              dispatch(clientAction.setLoginOrRegister(false))
            }
            }
          >
            {t("join_now")}
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};

const navButton = {
  fontSize: ["12px", "12px", "12px", "15px"],
  w: ["fit-content", "fit-content", "fit-content", "135px"],
  fontWeight: "bold",
  h:["31px","35px"]
};

export default LoginSection;
