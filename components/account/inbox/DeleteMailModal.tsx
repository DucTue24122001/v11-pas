import DefaultButton from '@/components/utils/DefaultButton'
import { colors } from '@/configs/chakra-ui/color'
import { accountAction } from '@/configs/redux/account-slice'
import { RootState } from '@/configs/redux/store'
import { Center, Modal, ModalCloseButton, ModalContent, ModalOverlay, Text } from '@chakra-ui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const DeleteMailModal = () => {
  const {isShowDeleteMailModal} = useSelector((state: RootState) => state.account)
  const dispatch = useDispatch()

  return (
    <Modal isOpen={isShowDeleteMailModal} onClose={() => dispatch(accountAction.setShowDeleteMailModal(false))}
      isCentered size={"sm"}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <Center p={"15px"} flexDir={'column'}>
          <Text p={"20px"} textAlign={'center'} fontSize={"17.6px"} fontWeight={700}>Are you sure you want to delete this message ?</Text>
          <Center>
            <DefaultButton minW={"100px"} m={"5px"}>YES</DefaultButton>
            <DefaultButton minW={"100px"} m={"5px"} colorScheme={"yellow"} color={colors.default.white} 
              onClick={() => dispatch(accountAction.setShowDeleteMailModal(false))}>NO</DefaultButton>
          </Center>
        </Center>
      </ModalContent>
    </Modal>
  )
}

export default DeleteMailModal