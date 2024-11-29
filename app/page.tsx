"use client"
import GameHall from "@/components/home/GameHall";
import HomeCategory from "@/components/home/HomeCategory";
import HomeHeader from "@/components/home/HomeHeader";
import { Flex } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <HomeHeader />
      <GameHall />
    </>
  );
}
