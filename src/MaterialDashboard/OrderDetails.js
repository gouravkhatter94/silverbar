import React from "react";
import {Table, TableHead, TableRow, TableCell, TableBody} from '@material-ui/core';
import Title from './Title';

export const OrderDetails = (props) => {
    const {orders} = props;
    
    return(
        <>
        {orders && orders.length !== 0 && 
            (
            <>
            <Title>Orders Board</Title>
            <Table size="small">
            <TableHead>
            <TableRow>
                <TableCell>Order Id</TableCell>
                <TableCell>User Id</TableCell>
                <TableCell>Order Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Order Type</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {orders.map((row, i) => (
                <TableRow key={row.userId + i}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.userId}</TableCell>
                <TableCell>{`${row.orderQuantity} Kg`}</TableCell>
                <TableCell>{`€ ${row.price}`}</TableCell>
                <TableCell>{row.orderType}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </>
        )
        }
    </>
    );
};
