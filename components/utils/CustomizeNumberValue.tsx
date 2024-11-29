import { Text } from '@chakra-ui/react'
import React from 'react'
import { ErrorText, SuccessfulText } from '@/components/utils/NotificationText';
import { convertDecimalNum } from '@/helpers/functions';

const CustomizeNumberValue = ({num, ...props}: any) => {
  switch (true) {
    case Number(num) > 0:
      return <SuccessfulText {...props}>{convertDecimalNum(num)}</SuccessfulText>
    case Number(num) < 0:
      return <ErrorText {...props}>{convertDecimalNum(num)}</ErrorText>
    default:
      return <Text {...props}>0</Text>
  }
}

export default CustomizeNumberValue