"use client"
import httpClient from '@/configs/axios/api'
import { useTenancy } from '@/configs/providers/TenancyProvider'
import {  TSlider } from '@/constants/type'
import { Box, Flex, Image, Link, Text } from '@chakra-ui/react'
import { useLocale } from 'next-intl'
import React from 'react'
import Slider from "react-slick";
import useSWR from 'swr'

const HomeHeader = () => {
  const tenancy = useTenancy()
  const locale = useLocale()
  const {data: sliders} = useSWR("/sliders" + tenancy?.tenancyName + locale, () => httpClient.Content.getSlider(tenancy?.tenancyName))

  return (
    <Flex justifyContent={"center"}>
    <Box className="home-slider" w={["100%","100%","1400px","1400px"]} p={"10px"} borderRadius={10} overflow={"hidden"}>
      {sliders?.result?.length > 0 && 
        <Slider infinite={true} slidesToScroll={1} slidesToShow={1} speed={500} autoplay={true} autoplaySpeed={4000} arrows={false}
          dots={true}>
          {sliders?.result.map((slider: TSlider, i: number) => (
            <Image borderRadius={10} alt={slider.title} key={i} src={slider.imageUrl} w={"100%"} h={["100%","100%","100%","360px"]} objectFit={"cover"} />
          ))}
        </Slider>}
    </Box>
    </Flex>
  )
}

export default HomeHeader