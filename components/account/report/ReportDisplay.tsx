import React from 'react'
import { Flex } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { RootState } from '@/configs/redux/store'
import { currentShowEnum } from '@/configs/redux/report-slice'
import PlatformList from './PlatformList'
import DetailGameReport from './DetailGameReport'
import DetailReportModal from './DetailReportModal'

const ReportDisplay = () => {
  const {toggleShowPlatformAndGame} = useSelector((state: RootState) => state.report)
  
  return (
    <Flex display={["flex","flex","none","none"]} mb={"80px"}>
      {toggleShowPlatformAndGame === currentShowEnum.PLATFORM && <PlatformList/>}
      {toggleShowPlatformAndGame === currentShowEnum.GAME && <DetailGameReport/>}
      <DetailReportModal/>
    </Flex>
  )
}

export default ReportDisplay
