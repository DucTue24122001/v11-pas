import { CheckCircleIcon } from '@chakra-ui/icons';
import { IconButton, useClipboard } from '@chakra-ui/react';
import React, { useState } from 'react'
import { MdOutlineContentCopy } from 'react-icons/md';

const CopyButton = ({copyText, ...props}: any) => {

  const [isCopy, setIsCopy] = useState(false);
  const { onCopy } = useClipboard(copyText);

  return (
    <IconButton aria-label='copy' colorScheme={"whatsapp"} icon={isCopy ? <CheckCircleIcon/> : <MdOutlineContentCopy/>} onClick={() => {
      setIsCopy(true);
      setTimeout(() => setIsCopy(false), 3000);
      onCopy();
  }} {...props}/>
  )
}

export default CopyButton