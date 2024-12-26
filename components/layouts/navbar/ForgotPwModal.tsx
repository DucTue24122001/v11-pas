
import { Box, Center, Flex, Modal, ModalCloseButton, ModalContent, ModalOverlay, Spinner, Text } from '@chakra-ui/react'
import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CheckCircleIcon } from '@chakra-ui/icons'
import { IoCloseCircle } from 'react-icons/io5'
import { RootState } from '@/configs/redux/store'
import { useTenancy } from '@/configs/providers/TenancyProvider'
import { useTranslations } from 'next-intl'
import { clientAction } from '@/configs/redux/client-slice'
import DefaultInput from '@/components/utils/DefaultInput'
import { ErrorText } from '@/components/utils/NotificationText'
import DefaultButton from '@/components/utils/DefaultButton'
import DefaultInputPassword from '@/components/utils/DefaultInputPassword'
import { ForgotPwEnum } from '@/constants/enum'
import { colors } from '@/configs/chakra-ui/color'
import Timer from '@/components/utils/Timer'

const ForgotPwModal = () => {
  const {isShowForgotPwModal} = useSelector((state: RootState) => state.client)
  const [userError, setUserError] = useState<any>('')
  const [dataError, setDataError] = useState("")
  const [isSendOtp, setIsSendOtp] = useState(false)
  const [isSendOtpLoading, setIsSendOtpLoading] = useState(false)
  // const tenancy = ClientService.getTenancy()
  const tenancy = useTenancy()
  const [successMsg, setSuccessMsg] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState("")
  const [lockCurrentUser, setLockCurrentUser] = useState(false)
  const [isOtpSended, setIsOtpSended] = useState(false)
  const [resetPwForm, setResetPwForm] = useState({
    resetCode: "",
    password: "",
  })
  const [pwValidation, setPwValidation] = useState({
    oneChar: false,
    numAndStr: false,
    lengthValid: false,
  })
  const [isPasswordChangeSuccess, setIsPasswordChangeSuccess] = useState(false)
  const dispatch = useDispatch()
  const t = useTranslations()

  const resetForm = () => {
    setPwValidation({
      oneChar: false,
      numAndStr: false,
      lengthValid: false,
    })
    setIsPasswordChangeSuccess(false)
    setDataError("")
    setUserError("")
    setUsername("")
    setSuccessMsg("")
    setResetPwForm({
      resetCode: "",
      password: "",
    })
    setIsOtpSended(false)
    setLockCurrentUser(false)
  }

  const closeModalHandler = () => {
    resetForm()
    dispatch(clientAction.handleShowForgotPwModal(false))
  }

  const isPwError = useMemo(() => {
    return Object.values(pwValidation).some(item => item === false)
  }, [pwValidation])

  const handleResetForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value, validity} = e.target
    if (validity.valid) {
      setResetPwForm({...resetPwForm, [name] : value})
      if(name === ForgotPwEnum.Pass) {
        setPwValidation({
          ...pwValidation,
          oneChar: uppercaseRegExp.test(value) || lowercaseRegExp.test(value) || digitsRegExp.test(value),
          numAndStr: lowercaseRegExp.test(value) && digitsRegExp.test(value),
          lengthValid: value.length > 6 && value.length < 20
        })
      }
    }
  }

  const resetTimer = async () => {
    setIsSendOtpLoading(true)
    // try {
    //   const res = await httpClient.post("/account/SendCodePasswordReset", {
    //     tenancyName: tenancy?.tenancyName,
    //     emailAddress: username,
    //   })
    //   setIsSendOtp(true)
    //   setUserError("")
    //   setSuccessMsg("OTP code has been send")
    // } catch (err) {
    //   console.log(err);
    // } finally {
    //   setIsSendOtpLoading(false)
    // }
  }

  const submitForgotPw = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setUserError("")
    
    if(!username) {
      setUserError(t('username_password_required'))
      return
    }
    setIsLoading(true)
    // try {
    //   if (!lockCurrentUser) {
    //     setLockCurrentUser(true)
    //     const res: any = await httpClient.post("/account/SendCodePasswordReset", {
    //       tenancyName: tenancy?.tenancyName,
    //       emailAddress: username,
    //     })
    //     if (!res.success) {
    //       setUserError(res.error.message)
    //       setLockCurrentUser(false)
    //     } else {
    //       setIsOtpSended(true)
    //       setSuccessMsg("OTP code has been send")
    //     }
    //   } else {
    //     const res: any = await httpClient.post("/account/ResetPassword", {
    //       tenancyName: tenancy?.tenancyName,
    //       userName: username,
    //       ...resetPwForm
    //     })
    //     if (!res.success) {
    //       setDataError(res.error.message)
    //     } else {
    //       resetForm()
    //       setIsPasswordChangeSuccess(true)
    //       setSuccessMsg("Password has been changed")
    //     }
    //   }
    // } catch (err) {
    //   console.log(err);
    // } finally {
    //   setIsLoading(false)
    // }
  }

  return (
    <Modal isOpen={isShowForgotPwModal} onClose={closeModalHandler}
      isCentered size={["full","full","lg","lg"]}>
      <ModalOverlay />
      <ModalContent p={"15px"}>
      <ModalCloseButton right={35} top={[55,55,35,35]}/>
        <form onSubmit={submitForgotPw} style={{display: !isPasswordChangeSuccess ? "box" : "none"}}>

        <Center p={["5px","5px","45px","45px"]} flexDir={'column'} gap={5} h={["90vh","90vh","100%","100%"]}>
          <Box fontSize={"24px"} fontWeight={600}>
            <Text>{t('Forgot_Password')}</Text>
          </Box>
          <Flex w={"100%"} flexDir={'column'}>
          <DefaultInput disabled={lockCurrentUser} value={username} placeholder={t('please')}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}/>
          <ErrorText alignSelf={"flex-start"}>{userError}</ErrorText>
          </Flex>

          <Flex flexDir={'row'} w={"100%"} gap={3} display={isOtpSended ? "flex" : "none"}>
            <DefaultInput placeholder={"Enter your OTP code"} name={ForgotPwEnum.Code} pattern="^[0-9]{1,6}$" value={resetPwForm.resetCode}
              onChange={handleResetForm} w={"80%"}/>
            <DefaultButton isDisabled={isSendOtp} isLoading={isSendOtpLoading} onClick={resetTimer} w={"20%"} fontSize={[13,13,14,14]}>
              {isSendOtp ? <Timer initialMinute={1} isSendOtp={() => setIsSendOtp(false)}/> : "Resend"}
            </DefaultButton>
          </Flex>
          <Flex w={"100%"} flexDir={'column'} display={isOtpSended ? "flex" : "none"}>
          <DefaultInputPassword placeholder={"Please enter new password"} name={ForgotPwEnum.Pass} value={resetPwForm.password}
            onChange={handleResetForm}/>
          </Flex>
          <Flex pl={"20px"} flexDir={'column'} alignSelf={'flex-start'} display={isOtpSended ? "flex" : "none"}>
            <Flex sx={warningItem}>
              {pwValidation.oneChar ? <CheckCircleIcon color={colors.default.success} fontSize={15}/> : <IoCloseCircle style={{color: colors.default.lightRed}}/>}
              <Text fontSize={"15px"} color={pwValidation.oneChar ? colors.default.success : undefined}>Only numbers and letters</Text>
            </Flex>
            <Flex sx={warningItem}>
              {pwValidation.numAndStr ? <CheckCircleIcon color={colors.default.success} fontSize={15}/> : <IoCloseCircle style={{color: colors.default.lightRed}}/>}
              <Text fontSize={"15px"} color={pwValidation.numAndStr ? colors.default.success : undefined}>Least one number and one letter</Text>
            </Flex>
            <Flex sx={warningItem}>
              {pwValidation.lengthValid ? <CheckCircleIcon color={colors.default.success} fontSize={15}/> : <IoCloseCircle style={{color: colors.default.lightRed}}/>}
              <Text fontSize={"15px"} color={pwValidation.lengthValid ? colors.default.success : undefined}>Minimum 6 to maximum 20 characters</Text>
            </Flex>
          </Flex>
          <Box w={"100%"}>
            <DefaultButton h={"40px"} type={"submit"} isDisabled={(isOtpSended && isPwError)}
            color={colors.default.white} fontWeight={600} w={"100%"}>
              {!isLoading ? <Text textTransform={"uppercase"}>{t('submit')}</Text> : <Spinner/>}
            </DefaultButton>
            <ErrorText textAlign={"end"}>{dataError}</ErrorText>
          </Box>
        </Center>
        </form>
        <Center p={"45px"} flexDir={'column'} gap={5} display={isPasswordChangeSuccess ? "flex" : "none"}>
          <Text fontSize={20}>Your password has been changed</Text>
          <CheckCircleIcon fontSize={50} color={colors.default.success}/>
        </Center>
      </ModalContent>
    </Modal>
  )
}

export default ForgotPwModal

const uppercaseRegExp   = /(?=.*?[A-Z])/;
const lowercaseRegExp   = /(?=.*?[a-z])/;
const digitsRegExp      = /(?=.*?[0-9])/;
const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
const minLengthRegExp   = /.{6,}/;

const warningItem = {
  fontSize: 18,
  alignItems: "center",
  gap: 2
}