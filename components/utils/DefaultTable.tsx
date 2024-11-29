import { colors } from '@/configs/chakra-ui/color'
import { Table, TableContainer, Tbody, Thead } from '@chakra-ui/react'
import React from 'react'

const DefaultTable = ({tbody, thead, ...props}: any) => {
  return (
    <TableContainer border={`1px solid ${colors.default.table}`} whiteSpace={'nowrap'} overflowX={'auto'} maxW={"100%"} borderRadius={5} {...props}>
          <Table>
            <Thead bgColor={colors.default.bg}>
                {thead}
            </Thead>
            <Tbody fontSize={"14px"}>
                {tbody}
            </Tbody>
          </Table>
    </TableContainer>
  )
}

export default DefaultTable