import { clientAction } from '@/configs/redux/client-slice'
import { RootState } from '@/configs/redux/store'
import { useBreakpoint } from '@/constants/hooks/useBreakpoint'
import { Flex, Image, Link, Modal, ModalCloseButton, ModalContent, ModalOverlay } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'

const LoginAndRegisterModal = () => {
  const {isRegisterModal, isLoginOrRegister} = useSelector((state:RootState) => state.client)
  const dispatch = useDispatch()
  const isBreakpoint = useBreakpoint(840);
  const [pos, setPos] = useState(true)

  const handleChangeLoginOrRegister = () => {
    dispatch(clientAction.setLoginOrRegister(!isLoginOrRegister))
  }
  
  return (
    <Modal size={["full","4xl"]} blockScrollOnMount={true} isOpen={isRegisterModal} onClose={() => dispatch(clientAction.handleShowRegisterModal(false))}>
        <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <Flex px={"20px"} justifyContent={"center"} alignItems={"center"} gap={5} py={"40px"} flexDir={"column"}>
          <Flex justifyContent={"center"}>
            <Link href={"/"}>
              <Image alt='logo' src='/images/pasv5logo.png' h={["30px","30px","40px","40px"]} objectFit={"cover"}/>
            </Link>
          </Flex>
          <Flex w={["100%","100%","400px","400px"]} h={"45px"} gap={5} p={"5px 10px"} borderRadius={"100px"} bg={"#f2f4f7"} boxShadow={"0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -2px rgba(0,0,0,.1)"} >
              <Flex bg={isLoginOrRegister ? "#043bfe" : "transparent"} color={isLoginOrRegister ? "#fff" : "#6e7380"} onClick={handleChangeLoginOrRegister} sx={btnStyle}>Login</Flex>
              <Flex bg={!isLoginOrRegister ? "#043bfe" : "transparent"} color={!isLoginOrRegister ? "#fff" : "#6e7380"} onClick={handleChangeLoginOrRegister} sx={btnStyle}>Register</Flex>
          </Flex>
          <Flex w={"100%"}>
            {isLoginOrRegister ? <LoginModal/> : <RegisterModal /> }
          </Flex>
        </Flex>
      </ModalContent>
    </Modal>
  )
}

export default LoginAndRegisterModal

const btnStyle = {
  w:"50%",
  borderRadius:"100px",
  justifyContent:"center",
  alignItems:"center",
  fontSize:"14px",
  cursor:"pointer",
  fontWeight:600
}