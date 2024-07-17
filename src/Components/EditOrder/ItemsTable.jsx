import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react'

const ItemsTable = ({items}) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Cantidad</TableCell>
            {/* <TableCell>ID</TableCell> */}
            <TableCell>Nombre</TableCell>
            <TableCell>Marca</TableCell>
            <TableCell>Precio</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow
              key={item._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{item.qty}</TableCell>
              {/* <TableCell>{item.product._id}</TableCell> */}
              <TableCell>{item.product.name}</TableCell>
              <TableCell>{item.product.brand}</TableCell>
              <TableCell>{item.product.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ItemsTable