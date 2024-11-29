import { Flex, Grid } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import CategoryHeader from "./CategoryHeader";
import { RootState } from "@/configs/redux/store";
import GameItem from "../GameItem";

const GameHotHome = () => {
  const { allGameList, allGameTypes } = useSelector(
    (state: RootState) => state.client
  );

  const gameHome = useMemo(() => {
    const a = allGameTypes?.slice(1, 3);
    if (a !== undefined) {
      return a;
    }
    return [];
  }, [allGameTypes]);
  return (
    <>
      {gameHome?.map((item: any, i: any) => (
        <Flex
          key={i}
          flexDirection={"column"}
          mb={[1, 1, 5, 5]}
          bgRepeat={"no-repeat"}
          bgSize={"100% 100%"}
          w={"100%"}
        >
          <CategoryHeader
            gameType={item?.game_type_name_home}
            srcImg={item?.game_type}
          />
          <Grid
            flexWrap={"wrap"}
            px={"5px"}
            templateColumns={[
              "repeat(2, 1fr)",
              "repeat(2, 1fr)",
              "repeat(3, 1fr)",
              "repeat(3, 1fr)",
            ]}
            gap={[3, 3, 7, 7]}
          >
            {allGameList
              ?.filter((game) => game.game_type === item.game_type)
              .map((items, i) => {
                return <GameItem key={i} game={items} />;
              })}
          </Grid>
        </Flex>
      ))}
    </>
  );
};

export default GameHotHome;
