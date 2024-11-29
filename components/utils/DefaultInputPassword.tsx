import { InputGroup, InputRightElement } from '@chakra-ui/react'
import React, { useState } from 'react'
import DefaultInput from './DefaultInput'
import { BsFillEyeSlashFill } from 'react-icons/bs'
import { AiFillEye } from 'react-icons/ai'

const DefaultInputPassword = ({...props}: any) => {
  const [isShowPassword, setIsShowPassword] = useState(false)

  const showPasswordHandle = () => {
    setIsShowPassword(state => !state)
  }

  return (
    <InputGroup w={props.w} >
      <DefaultInput placeholder={props.placeholder} type={isShowPassword ? "text" : "password"} pr={"35px"} {...props}/>
      <InputRightElement h={["50px","50px","35px","35px"]}
        // eslint-disable-next-line react/no-children-prop
        children={!isShowPassword ? 
          <BsFillEyeSlashFill
            color='#000'
            onClick={showPasswordHandle}
            cursor={"pointer"}
            style={{ fontSize: "20px" }}
          /> : <AiFillEye cursor={"pointer"} color='#000'
            onClick={showPasswordHandle}
            style={{ fontSize: "20px" }}/>
        }
      />
    </InputGroup>
  )
}

export default DefaultInputPassword