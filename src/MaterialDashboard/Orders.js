import React from 'react';
import { createStyles, withStyles } from '@material-ui/core/styles';
import {Grid, FormControl, InputLabel, Input, InputAdornment, Select, MenuItem, Button} from '@material-ui/core';
import {AccountCircle} from '@material-ui/icons';
import Title from './Title';
import AlertDialogSlide from "../Common/Dialog";

const useStyles = createStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  formControlClass: {
    width: "90%",
    textAlign: "left"
  }
}));

const formValid = ({formErrors, ...rest}) => {
    let valid = true;

    Object.values(formErrors).forEach(
        item => item.length > 0 && (valid = false)
    );

    Object.values(rest).forEach(
        item => (item === null || item === "") && (valid = false)
    );

    return valid;
};

class Orders extends React.Component {

    constructor(props){
        super(props);

        this.classes = props.classes;
        this.state = {
            open: true,
            showContent: "DASHBOARD",
            userId: "",
            price: "",
            orderQuantity: "",
            orderType: "",
            formErrors: {
                userId: "",
                price: "",
                orderQuantity: "",
                orderType: ""
            },
            isDialogOpen: false
        };    
    }

    handleChange = e => {
        e.preventDefault();
        let {name, value} = e.target;
        let formErrors = {...this.state.formErrors};

        switch(name) {
            case "userId":
                formErrors.userId = value.length < 3 ?
                "minimum 3 characters required" : "";
                break;
            case "price":
                formErrors.price = isNaN(Number(value)) ?
                "enter valid price" : "";
                break;
            case "orderQuantity":
                formErrors.orderQuantity = isNaN(Number(value)) ?
                "enter valid quantity" : "";
                break;
            case "orderType":
                formErrors.orderType = value.length < 3 ?
                "order type is required" : "";
                break;
            default:
                break;
        }

        this.setState({
            formErrors, [name] : value
        }, () => {console.log("this.state", this.state)});
    };

    handleSubmit = async e => {
        e.preventDefault();

        if (formValid(this.state)) {
            // console.log(`
            // submitting
            // userId: ${this.state.userId}
            // price: ${this.state.price}
            // orderQuantity : ${this.state.orderQuantity}
            // orderType: ${this.state.orderType}
            // `);

            this.props.addNewOrder(this.state);
            this.toggleDialog();
            this.setState({
                userId: "",
                price: "",
                orderQuantity: "",
                orderType: "",
            });
        } else {
            console.log("Errors");
        }
    };

    toggleDialog = () => {
        this.setState(state => ({
          isDialogOpen: !state.isDialogOpen
        }));
    };

  render() {
      const {userId, orderQuantity, price, orderType, formErrors} = this.state;
      const {formControlClass} = this.classes;

    return (
        <React.Fragment>
            <Title>Create New Orders</Title>

            <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                <Grid container spacing={3}>

                <Grid md={6} lg={6} xs={12} item>
                    <FormControl className={formControlClass} required>
                        <InputLabel htmlFor="user-id">User Id</InputLabel>
                        <Input id="user-id" value={userId} name="userId" onChange={this.handleChange} startAdornment={
                            <InputAdornment position="start">
                            <AccountCircle />
                            </InputAdornment>
                        }/>
                        {
                            formErrors.userId && formErrors.userId.length > 0 && <span style={{color:"red"}}>
                            {formErrors.userId}
                            </span>
                        }
                    </FormControl>
                </Grid>

                <Grid md={6} lg={6} xs={12} item>
                    <FormControl className={formControlClass}>
                        <InputLabel htmlFor="order-quantity">Order Quantity</InputLabel>
                        <Input id="order-quantity" value={orderQuantity} name="orderQuantity" onChange={this.handleChange} startAdornment={
                            <InputAdornment position="start">
                            Kg
                            </InputAdornment>
                        }/>
                        {
                            formErrors.orderQuantity && formErrors.orderQuantity.length > 0 && <span style={{color:"red"}}>
                            {formErrors.orderQuantity}
                            </span>
                        }
                    </FormControl>
                </Grid>

                <Grid md={6} lg={6} xs={12} item>
                    <FormControl className={formControlClass}>
                        <InputLabel htmlFor="price">Price Per kg</InputLabel>
                        <Input id="price" value={price} name="price" onChange={this.handleChange} startAdornment={
                            <InputAdornment position="start">
                            €
                            </InputAdornment>
                        }/>
                        {
                            formErrors.price && formErrors.price.length > 0 && <span style={{color:"red"}}>
                            {formErrors.price}
                            </span>
                        }
                    </FormControl>
                </Grid>

                <Grid md={6} lg={6} xs={12} item>
                    <FormControl className={formControlClass}>
                        <InputLabel id="order-type">Order Type</InputLabel>
                        <Select
                        labelId="order-type"
                        id="order-type"
                        name="orderType"
                        value={orderType}
                        onChange={this.handleChange}
                        >
                            <MenuItem value={"BUY"}>BUY</MenuItem>
                            <MenuItem value={"SELL"}>SELL</MenuItem>
                        </Select>
                        {
                            formErrors.orderType && formErrors.orderType.length > 0 && <span style={{color:"red"}}>
                            {formErrors.orderType}
                            </span>
                        }
                    </FormControl>
                </Grid>

                <Grid  md={12} lg={12} xs={12}  item>
                    <Button variant="contained" type="submit" color="primary">Create Order</Button>
                </Grid>
                </Grid>
            </form>
            
            <AlertDialogSlide open={this.state.isDialogOpen} onClose={this.toggleDialog} dialog={{title:"Create New Order", context: "New Order has been created successfully."}} />
        </React.Fragment>
        )
    };
}

export default withStyles(useStyles)(Orders);
