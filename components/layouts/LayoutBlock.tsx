import { Box } from "@chakra-ui/react"

type TLayoutBlock = {
  onClick: () => void
  isShow: boolean
}

const LayoutBlock = ({onClick, isShow}: TLayoutBlock) => {

  return (
    <Box pos={"fixed"} maxH={"100vh"} minW={"100vw"} top={0} left={0} bgColor={"rgba(0,0,0,.5)"} zIndex={1100}
      onClick={onClick}
      display={isShow ? "block" : "none"}
      style={{animationName: isShow ? "fadeIn" : "fadeOut"}}
      className={"animated"}
      inset={0} overflowY={"hidden"}/>
  )
}

export default LayoutBlock