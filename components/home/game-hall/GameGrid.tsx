import { RootState } from "@/configs/redux/store";
import { ListCategory } from "@/constants/enum";
import { ChakraProps, Flex, Grid } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";

type TGameGridProps = ChakraProps & {
  children: React.ReactNode;
  gameHome?: any;
};

const GameGrid = ({ gameHome, children, ...props }: TGameGridProps) => {
  const { currentCategorySelect }: any = useSelector(
    (state: RootState) => state.client
  );
  const checkGameType = useMemo(() => {
    switch (currentCategorySelect) {
      case ListCategory.LIVE:
      case ListCategory.LIVEARENA:
      case ListCategory.LOTTERY:
      case ListCategory.SPORTS:
        return true;

      default:
        return false;
    }
  }, [currentCategorySelect]);
  return (
    <>
      <Grid
        flexWrap={"wrap"}
        px={"5px"}
        templateColumns={
          checkGameType
            ? [
                "repeat(1, 1fr)",
                "repeat(1, 1fr)",
                "repeat(3, 1fr)",
                "repeat(3, 1fr)",
              ]
            : [
                "repeat(3, 1fr)",
                "repeat(3, 1fr)",
                "repeat(4, 1fr)",
                "repeat(6, 1fr)",
              ]
        }
        gap={[3, 3, 7, 7]}
        {...props}
      >
        {children}
      </Grid>
    </>
  );
};

export default GameGrid;
