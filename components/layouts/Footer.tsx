import {
  Box,
  Flex,
  Grid,
  Image,
  Text,
  Link as ChakraLink,
  Link,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import logoResponsible from "@/public/images/logo-18.b493d83.png";
import logoResponsible2 from "@/public/images/logo-bga.9096bf0.png";
import testlabs from "@/public/images/bmm-Testlabs.png";
import iTechIco from "@/public/images/iTech-Labs.png";
import PAGCORIco from "@/public/images/PAGCORpng.png";
import { BsFacebook, BsLine, BsMessenger, BsTwitter } from "react-icons/bs";
import { FiInstagram, FiMail } from "react-icons/fi";
import { FaTelegramPlane, FaViber } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { RootState } from "@/configs/redux/store";
import { colors } from "@/configs/chakra-ui/color";
import { ContentSettingEnum, SocialContactEnum } from "@/constants/enum";
import { useTenancy } from "@/configs/providers/TenancyProvider";
import { ContentSettingType, Respond } from "@/constants/type";
import { clientAction } from "@/configs/redux/client-slice";
import httpClient from "@/configs/axios/api";
import { usePathname } from "next/navigation";

const descriptionText = {
  gap: 1,
  fontSize: "14px",
  color: colors.default.white,
  alignItems: "center",
  cursor: "pointer",
};

const footerIcon = {
  p: 2,
  borderRadius: "50%",
  cursor: "pointer",
};

const Footer = ({ dir }: any) => {
  const { contactListInfo, footerBankList, socialListInfo } = useSelector((state: RootState) => state.client);
  const t = useTranslations();
  const tenancy:any = useTenancy()
  const dispatch = useDispatch()
  const pathName = usePathname()
  
  const titleFooter = {
    fontSize: ["12.6px", "12.6px", "17px", "17px"],
    // color: [
    //   colors.default.resFooter,
    //   colors.default.resFooter,
    //   tenancy?.mainColor || colors.primary,
    //   tenancy?.mainColor || colors.primary,
    // ],
    color:"#98a2b3",
    fontWeight: [500, 500, 700, 700],
  };

  useEffect(() => {
    if(tenancy) {
      (async () => {
        try {
          const res: Respond = await httpClient.Content.contentSetting(
             tenancy?.tenancyName,
          )
          if(res.success) {
            dispatch(clientAction.setContactListInfo(res.result.filter((item: ContentSettingType) => item.category === ContentSettingEnum.CONTACT)))
            dispatch(clientAction.setFooterBankList(res.result.filter((item: ContentSettingType) => item.category === ContentSettingEnum.PAYMENT)))
            dispatch(clientAction.setSocialListInfo(res.result.filter((item: ContentSettingType) => item.category === ContentSettingEnum.SOCIAL)))
          }
        } catch (err) {
          console.log(err);
        }
      })()
    }
  }, [tenancy])

  if (pathName.includes("promotion")) {
    return null
  }
  
  return (
    <Flex
      w={"100%"}
      flexDir={"column"}
      overflow={"hidden"}
      zIndex={100}
      boxShadow={"0 -1px 5px rgba(0, 0, 0, 0.4)"}
    >
      <Flex
        bg={"#fff"}
        
        w={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        pb={[20, 20, 0, 0]}
      >
        <Grid
          maxW={"1400px"}
          w={"100%"}
          p={["10px", "10px", "70px 10px", "70px 10px"]}
          gap={["20px", "20px", "20px", "20px"]}
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(1, 1fr)",
            "repeat(3, 1fr)",
            "repeat(3, 1fr)",
            "repeat(4, 1fr)",
          ]}
        >
          <Flex gap={"20px"} dir={dir}>
            <Box>
              <Text mb={"10px"} sx={titleFooter}>{t("game_license")}</Text>
              <Flex alignItems={"center"} gap={10} mb={'20px'} flexWrap={"wrap"}> 
                <Image alt="game-license-3" src={testlabs.src} height={"50px"}/>
                <Image alt="game-license-4" src={PAGCORIco.src} height={"50px"}/>
                <Image alt="game-license-5" src={iTechIco.src} height={"50px"}/>
              </Flex>
              <Text mb={"10px"} sx={titleFooter}>
              {t('Responsible_Gaming')}
              </Text>
              <Flex alignItems={"center"} gap={5} mb={'10px'}>
                <Image
                  h={"40px"}
                  src={logoResponsible.src}
                  alt={"game-license-1"}
                />
                <Image
                  h={"30px"}
                  src={logoResponsible2.src}
                  alt={"game-license-2"}
                />
              </Flex>
            </Box>
          </Flex>
          <Box>
            <Text mb={"10px"} sx={titleFooter}>
            {t('customer_support')}
            </Text>
            <Flex flexDir={"column"} gap={2}>
              {contactListInfo.map((info, i) => (
                <Flex sx={descriptionText} key={i} gap={2}>
                  {setContactSocialImage(info.name.toLowerCase())}
                  <ChakraLink href={info.link} color={colors.default.black} target={"_blank"}>
                    {info.content}
                  </ChakraLink>
                </Flex>
              ))}
            </Flex>
          </Box>
          <Flex flexDir={"column"} gap={["20px", "20px", "50px", "50px"]}>
            <Box>
              <Text mb={"10px"} sx={titleFooter}>
                {t('Payment_Partners')}
              </Text>
              <Flex
                flexWrap={"wrap"}
                flexDir={"row"}
                gap={2}
                w={["100%", "100%", "400px", "400px"]}
              >
                {footerBankList.map((payment, i) => (
                  <Image alt={`payment-${i}`} key={i} src={payment.imageUrl} h={["50px","50px","fit-content","fit-content"]}/>
                ))}
              </Flex>
            </Box>
          </Flex>
          <Box>
            <Text mb={"10px"} sx={titleFooter}>
            {t('Follow_Us')}
            </Text>
            <Flex
              gap={3}
              color={colors.default.white}
              fontSize={["25px", "25px", "20px", "20px"]}
            >
              {socialListInfo.map((info, i) => (
                <Flex sx={descriptionText} key={i} gap={2}>
                  <Link target="_blank" href={info.link}>
                    {setContactSocialImage(info.name.toLowerCase())}
                  </Link>
                </Flex>
              ))}
            </Flex>
          </Box>
        </Grid>
      </Flex>
      {/* <Flex
        w={"100%"}
        color={colors.default.black}
        display={["none", "none", "flex", "flex"]}
        justifyContent={"center"}
        fontSize={"16px"}
        alignItems={"center"}
        h={"50px"}
        // bgColor={colors.default.footerEnd}
      >
        <Text>{t('Copyright')}</Text>
      </Flex> */}
    </Flex>
  );
};

const setContactSocialImage = (name: string) => {
  switch (name) {
    case SocialContactEnum.TELEGRAM:
      return (
        <Box sx={footerIcon} bgColor={colors.telegram}>
          <FaTelegramPlane />
        </Box>
      );
    case SocialContactEnum.VIBER:
      return (
        <Box sx={footerIcon} bgColor={colors.viber}>
          <FaViber />
        </Box>
      );
    case SocialContactEnum.LINE:
      return (
        <Box sx={footerIcon} bgColor={colors.line}>
          <BsLine />
        </Box>
      );
    case SocialContactEnum.FACEBOOK:
      return (
        <Box sx={footerIcon} bgColor={colors.fb}>
          <BsFacebook />
        </Box>
      );
    case SocialContactEnum.INSTAGRAM:
      return (
        <Box sx={footerIcon} bgColor={colors.insta}>
          <FiInstagram />
        </Box>
      );
    case SocialContactEnum.MAIL:
      return (
        <Box sx={footerIcon} bgColor={colors.mail}>
          <FiMail />
        </Box>
      );
    case SocialContactEnum.MESSENGER:
      return (
        <Box sx={footerIcon} bgColor={colors.messenger}>
          <BsMessenger />
        </Box>
      );
    case SocialContactEnum.TWITTER:
      return (
        <Box sx={footerIcon} bgColor={colors.twitter}>
          <BsTwitter />
        </Box>
      );
    default:
      return <></>;
  }
};

export default Footer;
