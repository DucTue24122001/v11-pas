import { Flex } from '@chakra-ui/react'
import PromotionNavMobile from './PromotionNavMobile'
import PromotionNavDesktop from './PromotionNavDesktop'
import { colors } from '@/configs/chakra-ui/color'

const PromotionLayout = ({children, isLogin, ...props}: any) => {
  return (
    <Flex w={"100%"}
        mb={["50px","50px","0px","0px"]}
        // bgColor={[colors.default.white,colors.default.white,colors.default.bg,colors.default.bg]}
        minH={"90vh"}
        overflow={"hidden"}
        flexDir={"column"} {...props}>
        <PromotionNavMobile/>
        <Flex mx={"auto"} flexDir={"column"} h={"inherit"}>
        <PromotionNavDesktop/>
        {children}
        </Flex>
    </Flex>
  )
}

export default PromotionLayout