import React from "react";
import {Table, TableHead, TableRow, TableCell, TableBody} from '@material-ui/core';
import Title from './Title';

class SummarisedComponent extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            summarisedData : []
        };
    }

    componentWillMount = () => {
        this.parseOrders(this.props.orders);
    };

    parseOrders = (orders) => {
        let objParsedOrders = {};

        for(let order of orders) {
            if (!objParsedOrders[`${order.orderType}_${order.price}`]) {
                let copyOrder = {};

                Object.assign(copyOrder, order);
                objParsedOrders[`${order.orderType}_${order.price}`] = copyOrder;
            } else {
                let data = objParsedOrders[`${order.orderType}_${order.price}`];

                data.orderQuantity = Number(data.orderQuantity) + Number(order.orderQuantity);
                data.userId += ` & ${order.userId}`;
                objParsedOrders[`${order.orderType}_${order.price}`] = data;
            }
        }

        this.setState({summarisedData: Object.values(objParsedOrders)});
    };

    render(){
        const {summarisedData} = this.state;
        return(
            <>
            <Title>Summary</Title>
            {summarisedData && summarisedData.length !== 0 && 
                (<Table size="small">
                <TableHead>
                <TableRow>
                    <TableCell>User Id</TableCell>
                    <TableCell>Order Quantity</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Order Type</TableCell>
                    {/* <TableCell align="right">Sale Amount</TableCell> */}
                </TableRow>
                </TableHead>
                <TableBody>
                {summarisedData.map((row, i) => (
                    <TableRow key={row.userId + i}>
                    <TableCell>{row.userId}</TableCell>
                    <TableCell>{`${row.orderQuantity} Kg`}</TableCell>
                    <TableCell>{`€ ${row.price}`}</TableCell>
                    <TableCell>{row.orderType}</TableCell>
                    {/* <TableCell align="right">{row.orderType}</TableCell> */}
                    </TableRow>
                ))}
                </TableBody>
            </Table>)
            }
        </>
        );
    };
}

export default SummarisedComponent;
