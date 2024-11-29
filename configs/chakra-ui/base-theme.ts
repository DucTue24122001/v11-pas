import { noto, roboto } from "@/app/utils/fonts"
import { StyleFunctionProps, extendTheme } from "@chakra-ui/react"

const baseTheme = extendTheme({
  styles: {
    global: (props: StyleFunctionProps) => ({
      // body: {
      //   minH: "100dvh",
      //   maxW: "100%",
      //   mx: "auto",
      //   fontSize: "13px",
      //   overflowX: "hidden",
      //   background: "#f2f4f7",
      //   className: roboto
      // }
      "html, body": {
        boxSizing: "border-box",
        fontFamily: `'Noto Sans', sans-serif`,
        color: "#003534",
        minH: "100dvh",
        maxW: "100%",
        mx: "auto",
        fontSize: "13px",
        overflowX: "clip",
        background: "#f2f4f7",
      },
    })
  }
})

export default baseTheme