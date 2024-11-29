import DefaultButton from '@/components/utils/DefaultButton'
import DefaultInput from '@/components/utils/DefaultInput'
import { ErrorText } from '@/components/utils/NotificationText'
import { DropdownItem, SelectDropdown } from '@/components/utils/SelectDropdown'
import httpClient from '@/configs/axios/api'
import { colors } from '@/configs/chakra-ui/color'
import { useCheckTokenProvider } from '@/configs/providers/CheckTokenProvider'
import { accountAction } from '@/configs/redux/account-slice'
import { RootState } from '@/configs/redux/store'
import { Box, Flex, Text, useToast } from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export enum AddBankEnum {
  Name = "accountName",
  DisplayName = "displayName",
  BankNum = "accountNumber",
}

const AddBank = () => {
  const accountDetail = useCheckTokenProvider()
  const {allListBank} = useSelector((state: RootState) => state.account)
  const dispatch = useDispatch()
  const t = useTranslations()
  const toast = useToast({
    duration: 3000,
    isClosable: true,
  })
  const [isDropdown, setIsDropdown] = useState(false)
  const [currentBankSelect, setCurrentBankSelect] = useState<any>({})
  const [currentBankSelectId, setCurrentBankSelectId] = useState<any>("")
  const [isLoading, setIsLoading] = useState(false)
  const [addBankForm, setAddBankForm] = useState({
    accountNumber: "",
    displayName: "",
  })
  const [addBankErrorForm, setAddBankErrorForm] = useState({
    bankNum: "",
    displayName: "",
    currentBank: "",
  })
  const [isError, setIsError] = useState(false)

  const resetForm = () => {
    setAddBankForm({
      accountNumber: "",
      displayName: "",
    })
    setIsError(false)
  }

  useEffect(() => {
    (async () => {
      if(allListBank.length === 0) {
        try {
          const bankList: any = await httpClient.Bank.getAllBank()
          dispatch(accountAction.setAllListBank(bankList.result));
          } catch (err) {
            console.log(err);
          }
        }
      })();
  }, []);

  useEffect(() => {
    setAddBankErrorForm({
      bankNum: addBankForm.accountNumber ? "" : t('bank_number_required'),
      currentBank: Object.keys(currentBankSelect).length !== 0 ? "" : t('bank_required'),
      displayName: addBankForm.displayName ? "" : t('display_name_required')
    })
  }, [currentBankSelect, addBankForm])

  const onSubmitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    const isError = Object.values(addBankErrorForm).some(value => value.length !== 0)
    if (isError) {
      setIsError(true)
      return
    }
    setIsLoading(true)
    try {
      const res: any = await httpClient.Bank.createBank({
        ...addBankForm,
        accountName: accountDetail?.name,
        bankName: currentBankSelect.name,
        bankShortName: currentBankSelect.shortName,
      })
      if (res.success) {
        dispatch(accountAction.addBankToListBank(res.result))
        toast({
          status: "success",
          title: "Submit bank account successfully",
        })
        resetForm()
      } else {
        toast({
          status: "error",
          title: res.error.message,
        })
      }
    } catch (err: any) {
      console.log(err);
      toast({
        status: "error",
        title: err?.response?.data?.error?.message || "Something went wrong, please try again latter",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const bankFormInput = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value, validity} = e.target
    if (validity.valid) {
      setAddBankForm({...addBankForm, [name] : value})
    }
  }

  const selectBankHandler = (bank: any) => {
    setIsDropdown(false)
    setCurrentBankSelectId(bank.id)
    setCurrentBankSelect(bank)
  }

  return (
    <Flex w={"100%"} p={["20px 10px","20px 10px","40px 60px","40px 60px"]}
      flexDir={'column'} bgColor={colors.default.white} borderRadius={10}>
      <form onSubmit={onSubmitHandler}>
      <Text fontSize={"15px"} mb={"10px"} fontWeight={"bold"} display={["none","none","block","block"]}>{t('please_enter_bank')}</Text>
      <Flex maxW={["100%","100%","400px","400px"]} flexDir={'column'} gap={[3,3,5,5]}>
        <DefaultInput value={accountDetail?.name} isDisabled/>
        <Box>
        <SelectDropdown isDropdown={isDropdown} closeDropdown={() => setIsDropdown(false)} openDropdown={() => setIsDropdown(true)}

          currentSelect={Object.keys(currentBankSelect).length === 0 ? 
          <Text fontWeight={"thin"}>{t('select_bank')}</Text> : <Text>{currentBankSelect.name} ({currentBankSelect.shortName})</Text>}

          dropdownList={allListBank.map((bank: any, i: number) => (
            <DropdownItem key={bank.id}
              id={bank.id}
              currentId={currentBankSelectId}
              onClick={() => selectBankHandler(bank)}>
              <Text textOverflow={"ellipsis"}>{bank.name} ({bank.shortName})</Text>
            </DropdownItem>
          ))}/>
          {isError && <ErrorText>{addBankErrorForm.currentBank}</ErrorText>}
        </Box>
        <Box>
          <DefaultInput placeholder={t('account_number')} name={AddBankEnum.BankNum} pattern="[0-9]*" onChange={bankFormInput} value={addBankForm.accountNumber}/>
          {isError && <ErrorText>{addBankErrorForm.bankNum}</ErrorText>}
        </Box>
        <Box>
          <DefaultInput placeholder={t('display_name')} name={AddBankEnum.DisplayName} onChange={bankFormInput} value={addBankForm.displayName}/>
          {isError && <ErrorText>{addBankErrorForm.displayName}</ErrorText>}
        </Box>
        <DefaultButton type={"submit"} isLoading={isLoading}>
          <Text textTransform={"uppercase"}>
          {t('add_bank')}
          </Text>
        </DefaultButton>
      </Flex>
      </form>
    </Flex>
  )
}

export default AddBank