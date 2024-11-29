import { ChakraProps, Image } from '@chakra-ui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import en from "@/public/images/en.png";
import my from "@/public/images/my.png";
import km from "@/public/images/km.png";
import { clientAction } from '@/configs/redux/client-slice';
import { useLocale } from 'next-intl';

type TImageLanguage = ChakraProps & {

}

const ImageLanguage = ({...props}: TImageLanguage) => {
  const locale = useLocale()
  const dispatch = useDispatch()

  const langFlag = {
    cursor: "pointer",
    boxSize: props.boxSize ?? "25px",
    objectFit: "contain",
  };

  const showModalLanguage = () => {
    dispatch(clientAction.handleShowLanguageModal(true));
    dispatch(clientAction.handleShowMenu(false));
  };

  switch (locale) {
    case "EN":
        return (
          <Image
            src={en.src}
            sx={langFlag}
            alt="lang"
            onClick={() => showModalLanguage()}
            {...props}
          />
        );
      case "MY":
        return (
          <Image
            src={my.src}
            sx={langFlag}
            alt="lang"
            onClick={() => showModalLanguage()}
            {...props}
          />
        );
      case "KM":
        return (
          <Image
            src={km.src}
            sx={langFlag}
            alt="lang"
            onClick={() => showModalLanguage()}
            {...props}
          />
        );
      default:
        return (
          <Image
            src={en.src}
            sx={langFlag}
            alt="lang"
            onClick={() => showModalLanguage()}
            {...props}
          />
        );
  }
}

export default ImageLanguage