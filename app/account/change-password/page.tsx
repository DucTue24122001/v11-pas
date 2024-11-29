"use client"
import Card from '@/components/utils/Card'
import DefaultButton from '@/components/utils/DefaultButton'
import DefaultInputPassword from '@/components/utils/DefaultInputPassword'
import { ErrorText, SuccessfulText } from '@/components/utils/NotificationText'
import httpClient from '@/configs/axios/api'
import { colors } from '@/configs/chakra-ui/color'
import { ChangePwEnum } from '@/constants/enum'
import { CheckCircleIcon } from '@chakra-ui/icons'
import { Box, Flex, Text, useToast } from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import React, { useMemo, useState } from 'react'
import { IoCloseCircle } from 'react-icons/io5'

const ChangePass = () => {
  const toast = useToast()
  const [pwValidation, setPwValidation] = useState({
    onlyChar: false,
    uppercase: false,
    numAndStr: false,
    lengthValid: false,
  })
  const [passwordForm, setPasswordForm] = useState({
    oldPw: "",
    newPw: "",
    confirmPw: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  const t = useTranslations()

  const resetForm = () => {
    setPasswordForm({
      oldPw: "",
      newPw: "",
      confirmPw: "",
    })
    setPwValidation({
      onlyChar: false,
      uppercase: false,
      numAndStr: false,
      lengthValid: false,
    })
    setError("")
  }

  const isVerifyError = useMemo(() => {
    return Object.values(pwValidation).some(item => item === false)
  },[pwValidation])

  const isConfirmPassword = useMemo(() => {
    if (pwValidation.onlyChar && passwordForm.newPw === passwordForm.confirmPw){ 
      return true
    } 
    return false
  }, [pwValidation, passwordForm])

  const passwordInputHandler = (e: any) => {
    const {name, value} = e.target
    setPasswordForm({...passwordForm, [name]: value})
    if (name === ChangePwEnum.NewPw) {
      setPwValidation({
        ...pwValidation,
        uppercase: uppercaseRegExp.test(value) && lowercaseRegExp.test(value),
        onlyChar: (uppercaseRegExp.test(value) || lowercaseRegExp.test(value) || digitsRegExp.test(value)) && !specialCharRegExp.test(value),
        numAndStr: (lowercaseRegExp.test(value) || uppercaseRegExp.test(value)) && digitsRegExp.test(value),
        lengthValid: (value.length >= 6 && value.length < 20)
      });
    }
  }
  
  const onSubmitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setSuccessMsg("")
    if (isVerifyError || !isConfirmPassword) return
    setIsLoading(true)
    try {
      const res: any = await httpClient.User.changePassword({
        currentPassword: passwordForm.oldPw,
        newPassword: passwordForm.newPw,
      })
      if (res.error) {
        setError(res.error.message)
      } else {
        resetForm()
        setSuccessMsg(t("your_password_has_been_changed_successfully"))
        toast({
          status: 'success',
          title: t('your_password_has_been_changed_successfully'),
          duration: 3000,
          isClosable: true,
        })
      }
    } catch (err: any) {
      console.log(err);
      toast({
        status: "error",
        title: err?.response?.data?.error?.message || t('something_went_wrong'),
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  // if (!isLogin) return null

  return (
    <>
      <Card p={["5px","5px","30px","50px"]}>
        <form onSubmit={onSubmitHandler}>
        <Box mt={["20px","20px","40px","40px"]} mx={["5px","5px","35px","35px"]} maxW={["100%","100%","400px","400px"]}>
          <Text fontWeight={'bold'} mb={2} fontSize={15} display={["none","none","block","block"]}>{t('enter_your_current_password')}</Text>
          <Box mb={[2,2,5,5]}>
            <DefaultInputPassword name={ChangePwEnum.OldPw} value={passwordForm.oldPw}
              onChange={passwordInputHandler} placeholder={t('old_pass')}/>
            {error && <ErrorText>{error}</ErrorText>}
          </Box>
          <Text fontWeight={'bold'} mb={2} fontSize={15} display={["none","none","block","block"]}>{t('enter_your_new_password')}</Text>
          <DefaultInputPassword mb={[2,2,5,5]} name={ChangePwEnum.NewPw} value={passwordForm.newPw} 
            onChange={passwordInputHandler} placeholder={t('new_pass')}/>
          <DefaultInputPassword mb={[2,2,5,5]} name={ChangePwEnum.ConfirmPw} value={passwordForm.confirmPw}
            onChange={passwordInputHandler} placeholder={t('confirm_pass')}/>
          <Flex pl={["5px","5px","20px","20px"]} flexDir={'column'} mb={8}>
            <Flex sx={warningItem}>
              {pwValidation.onlyChar ? <CheckCircleIcon color={colors.default.success} fontSize={15}/> : <IoCloseCircle style={{color: colors.default.lightRed}}/>}
              <Text fontSize={"15px"} color={pwValidation.onlyChar ? colors.default.success : undefined}>{t('only')}</Text>
            </Flex>
            <Flex sx={warningItem}>
              {pwValidation.numAndStr ? <CheckCircleIcon color={colors.default.success} fontSize={15}/> : <IoCloseCircle style={{color: colors.default.lightRed}}/>}
              <Text fontSize={"15px"} color={pwValidation.numAndStr ? colors.default.success : undefined}>{t('least')}</Text>
            </Flex>
            <Flex sx={warningItem}>
              {pwValidation.uppercase ? <CheckCircleIcon color={colors.default.success} fontSize={15}/> : <IoCloseCircle style={{color: colors.default.lightRed}}/>}
              <Text fontSize={"15px"} color={pwValidation.uppercase ? colors.default.success : undefined}>{t('uppercase_lower_letter')}</Text>
            </Flex>
            <Flex sx={warningItem}>
              {pwValidation.lengthValid ? <CheckCircleIcon color={colors.default.success} fontSize={15}/> : <IoCloseCircle style={{color: colors.default.lightRed}}/>}
              <Text fontSize={"15px"} color={pwValidation.lengthValid ? colors.default.success : undefined}>{t('minimum')}</Text>
            </Flex>
            <Flex sx={warningItem}>
              {isConfirmPassword ? <CheckCircleIcon color={colors.default.success} fontSize={15}/> : <IoCloseCircle style={{color: colors.default.lightRed}}/>}
              <Text fontSize={"15px"} color={isConfirmPassword ? colors.default.success : undefined}>{t('reconfirm')}</Text>
            </Flex>
          </Flex>
          <DefaultButton color={"#fff"} type={"submit"} isDisabled={isVerifyError || !isConfirmPassword} 
            isLoading={isLoading}>{t('change_password')}</DefaultButton>
          <SuccessfulText>{successMsg}</SuccessfulText>
        </Box>
        </form>
      </Card>
    </>
  )
}

const uppercaseRegExp   = /(?=.*?[A-Z])/;
const lowercaseRegExp   = /(?=.*?[a-z])/;
const digitsRegExp      = /(?=.*?[0-9])/;
const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
const minLengthRegExp   = /.{6,}/;

const warningItem = {
  fontSize: [15,15,18,18],
  alignItems: "center",
  gap: 2
}

export default ChangePass