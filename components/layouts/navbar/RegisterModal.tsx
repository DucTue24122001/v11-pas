import { Box, Checkbox, Flex, Image, InputGroup, InputLeftAddon, SimpleGrid, Text, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useTenancy } from '@/configs/providers/TenancyProvider';
import { colors } from '@/configs/chakra-ui/color';
import DefaultInput from '@/components/utils/DefaultInput';
import DefaultInputPassword from '@/components/utils/DefaultInputPassword';
import { PageEnum, PoliciesEnum } from '@/constants/enum';
import httpClient from '@/configs/axios/api';
import logoDark from "@/public/images/pasv5logo.png"
import DefaultSelect from '@/components/utils/DefaultSelect';
import { useDispatch } from 'react-redux';
import { useTranslations } from 'next-intl';
import ClientService from '@/helpers/ClientService';
import { clientAction } from '@/configs/redux/client-slice';
import DefaultButton from '@/components/utils/DefaultButton';

const RegisterModal = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false);
  const tenancy = useTenancy();
  const  t  = useTranslations();
  const [registForm, setRegistForm] = useState({
    userName: "",
    name: "",
    phoneNumber: "",
    password: "",
    emailAddress: "",
    ReferralCode: "",
  });
  const [isHaveReferralCode, setIsHaveReferralCode] = useState(false);
  const toast = useToast({
    duration: 3000,
    isClosable: true,
  });
  const [confirmPass, setConfirmPass] = useState("");
  const router:any = useRouter();
  const [error, setError] = useState("");
  const [errorPw, setErrorPw] = useState("");
  const [errorForm, setErrorForm] = useState({
    user: "",
    name: "",
    phone: "",
    // email: "",
  });
  const [isError, setIsError] = useState(false);
  const [isPwError, setIsPwError] = useState(false);

  const resetForm = () => {
    setRegistForm({
      ...registForm,
      userName: "",
      name: "",
      phoneNumber: "",
      password: "",
      emailAddress: "",
    });
    setConfirmPass("");
  };

  useEffect(() => {
    setErrorForm({
      ...errorForm,
      user: registForm.userName ? "" : t("username_required"),
      phone: registForm.phoneNumber ? "" : t("phone_number_required"),
      name: registForm.name ? "" : t("name_required"),
      // email: registForm.emailAddress ? "" : "Email is required",
    });
    setErrorPw(() => {
      switch (false) {
        case !restrictSpecialExp.test(registForm.password):
          return t("your_password_must_not_have_special_character");
        case minMaxLengthRegExp.test(registForm.password):
          return t("your_password_maximum");
        case uppercaseRegExp.test(registForm.password) &&
          lowercaseRegExp.test(registForm.password):
          return t("your_password_uppercase_lowercase");
        case digitsRegExp.test(registForm.password):
          return t("your_password_least_one");
        case registForm.password === confirmPass:
          return t("your_confirm_password_not_match");
        default:
          return "";
      }
    });
  }, [registForm, confirmPass, tenancy]);

  const formHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, validity } = e.target;

    if (validity.valid) {
      setRegistForm({ ...registForm, [name]: value });
    }
  };

  const submitForm = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const isFormValid = Object.values(errorForm).every(
      (item) => item.length === 0
    );
    if (errorPw || !isFormValid) {
      setIsError(true);
      return;
    }
    setIsLoading(true);
    try {
      const res: any = await httpClient.Authentication.register({
        ...registForm,
        phoneNumber: "+" + tenancy?.areaCode + registForm.phoneNumber,
        emailAddress: registForm.userName + "@default.com",
        tenancyName: tenancy?.tenancyName,
      })
      if (res.success) {
        ClientService.login(res.result.token);
        toast({
          status: "success",
          title: t("account_has_been_created"),
        });
        dispatch(clientAction.handleShowRegisterModal(false));
        resetForm();
        setError("");
        router.push("/");
      } else {
        setIsError(true);
        setError(res.error.message);
      }
    } catch (err: any) {
      console.log(err);
      toast({
        status: "error",
        title: err?.response?.data?.error?.message || t("something_went_wrong"),
      });
    } finally {
      setIsLoading(false);
      setIsError(false);
    }
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
        <form style={{width:"inherit"}} onSubmit={submitForm}>
          <SimpleGrid
            w={["100%", "100%", "400px", "400px"]}
            spacingX={10}
            spacingY={4}
            margin={"auto"}
          >
            <Box>
              <DefaultSelect placeholder={tenancy?.currency || ""} isDisabled />
            </Box>
            <Box>
              <DefaultInput
                placeholder={`${t("username")} *`}
                name={"userName"}
                value={registForm.userName}
                onChange={formHandler}
              />
              {isError && (
                <Text fontSize={"14px"} color={colors.error}>
                  {errorForm.user}
                </Text>
              )}
            </Box>
            <Box>
              <DefaultInputPassword
                name={"password"}
                placeholder={`${t("password")} *`}
                value={registForm.password}
                onFocus={() => setIsPwError(true)}
                onChange={formHandler}
              />
              {isPwError && (
                <Text fontSize={"14px"} color={colors.error}>
                  {errorPw}
                </Text>
              )}
            </Box>
            <DefaultInputPassword
              onFocus={() => setIsPwError(true)}
              placeholder={`${t("confirm_pass")} *`}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setConfirmPass(e.target.value)
              }
            />
            <Box>
              <DefaultInput
                name={"name"}
                placeholder={`${t("full_name")} *`}
                value={registForm.name}
                onChange={formHandler}
              />
              {isError && (
                <Text fontSize={"14px"} color={colors.error}>
                  {errorForm.name}
                </Text>
              )}
            </Box>
            <Box>
              <InputGroup>
                <InputLeftAddon
                  h={["50px", "50px", "35px", "35px"]}
                  // eslint-disable-next-line react/no-children-prop
                  children={"+" + (tenancy?.areaCode || "")}
                />
                <DefaultInput
                  name={"phoneNumber"}
                  value={registForm.phoneNumber}
                  pattern="[0-9]*"
                  onChange={formHandler}
                  border={`1px solid ${colors.default.input}`}
                  placeholder={`${t("mobile_number")} *`}
                  _focusVisible={{ outline: "none" }}
                />
              </InputGroup>
              {isError && (
                <Text fontSize={"14px"} color={colors.error}>
                  {errorForm.phone}
                </Text>
              )}
            </Box>
            <Checkbox
              _focusVisible={{ outline: "none" }}
              autoFocus={false}
              color={"#98a2b3"}
              outline={"none"}
              colorScheme="yellow"
              isChecked={isHaveReferralCode}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setIsHaveReferralCode(e.target.checked);
                setRegistForm({
                  ...registForm,
                  ReferralCode: "",
                });
              }}
            >
              {t("do_you_have_referral_code")}
            </Checkbox>
            {isHaveReferralCode && (
              <DefaultInput
                placeholder={t("referral_required")}
                name={"ReferralCode"}
                value={registForm.ReferralCode}
                onChange={formHandler}
              />
            )}
            <Flex flexDirection={"row"}>
              <Text fontSize={"0.9rem"} lineHeight={"22.5px"} color={"#98a2b3"}>
                {t("age_verification")}{" "}
                <span
                  style={{
                    cursor: "pointer",
                    fontWeight: 700,
                    color: colors.primary,
                    fontSize: "0.9rem",
                    lineHeight: "22.5px",
                    textTransform: "uppercase",
                  }}
                  onClick={() => {
                    window.open(
                      `../${PageEnum.Policies}/${PoliciesEnum.Terms}`
                    );
                  }}
                >
                  {t("terms_and_condition")}
                </span>
              </Text>
            </Flex>
            {error && (
              <Text fontSize={"14px"} color={colors.error}>
                {error}
              </Text>
            )}
            <DefaultButton
              isLoading={isLoading}
              textTransform={"uppercase"}
              bg={colors.primaryBg}
              type="submit"
              transition={"all .1s ease-in-out"}
              borderRadius={"5px"}
              color={colors.default.white}
              _hover={{ filter: "brightness(110%)" }}
            >
              {t("join_now")}
            </DefaultButton>
          </SimpleGrid>
        </form>
      </Flex>
    </Box>
  )
}

export default RegisterModal

const uppercaseRegExp = /(?=.*?[A-Z])/;
const restrictSpecialExp = /(?=.*?[#?!@$%^&*-])/;
const lowercaseRegExp = /(?=.*?[a-z])/;
const digitsRegExp = /(?=.*?[0-9])/;
const minMaxLengthRegExp = /.{8,15}/;
