import { clientAction } from "@/configs/redux/client-slice"
import { useParams } from "next/navigation"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const RouterListener = () => {
  const params = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(clientAction.setCategorySelect(""))
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }, [params])

  return null
}

export default RouterListener