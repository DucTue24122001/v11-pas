import { Locale } from '@/config';
import { clientAction } from '@/configs/redux/client-slice';
import { RootState } from '@/configs/redux/store';
import { setUserLocale } from '@/translations/services/locale';
import { Box, Center, Flex, Image, Modal, ModalCloseButton, ModalContent, ModalOverlay, Text } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '@/configs/chakra-ui/color';

const LanguageModal = () => {
  const { isShowLanguageModal, languageList } = useSelector(
    (state: RootState) => state.client
  );
  const dispatch = useDispatch();
  const changeLanguage = (language: Locale) => {
    setUserLocale(language);
    dispatch(clientAction.setLanguage(language))
    dispatch(clientAction.handleShowLanguageModal(false))
    window.localStorage.setItem("MY_LANGUAGE", language)
  };
  const t = useTranslations();

  return (
  <Modal
    isOpen={isShowLanguageModal}
    onClose={() => dispatch(clientAction.handleShowLanguageModal(false))}
    isCentered
    size={["full", "full", "md", "lg"]}
    blockScrollOnMount={false}
    >
    <ModalOverlay />
    <ModalContent p={"30px"} color={colors.default.black}>
      <ModalCloseButton />
      <Center flexDir={"column"}>
        <Box fontSize={"19px"} fontWeight={600} borderBottom={"2px solid #043bfe"} p={2}>
          <Text>{t('select_language')}</Text>
        </Box>
        {languageList.map((language, i) => (
          <Flex key={i}
            py={"10px"}
            flexDir={"column"}
            gap={"16px"}
            alignSelf={"flex-start"}
            borderBottom={"1px solid #d9dee4"}
            w={"100%"}
            fontSize={"16px"}
            onClick={() => changeLanguage(language)}
          >
            <Text>{t(language)}</Text>
            <Flex alignItems={"center"}>
              <Image
                alt={language}
                src={`/images/${language.toLowerCase()}.png`}
                w={"50px"}
                h={"50px"}
                mr={"30px"}
                borderRadius={"50%"}
                objectFit={"cover"}
              />
              <Text cursor={"pointer"}>{t(language)}</Text>
            </Flex>
          </Flex>
        ))}
      </Center>
    </ModalContent>
  </Modal>
  )
}

export default LanguageModal