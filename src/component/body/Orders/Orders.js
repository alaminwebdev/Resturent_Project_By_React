import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrder } from '../../../redux/actionCreators';
import Order from './Order';
import CustomOrder from './CustomOrder';
import Container from '@mui/material/Container'
import { Grid, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

// accept state as a props from intial state 
const mapStateToProps = state => {
    return {
        orders: state.customBurger.orders,
        customOrderLoading: state.customBurger.orderLoading,

        defaultOrders: state.dishes.defaultOrders,
        defaultOrderLoading: state.dishes.orderLoading,

        token: state.authState.token,
        userId: state.authState.userId,

        ingredientPrice: state.customBurger.ingredientPrice
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchOrder: (token, userId) => dispatch(fetchOrder(token, userId)),
    }
}


export class Orders extends Component {
    componentDidMount() {
        this.props.fetchOrder(this.props.token, this.props.userId);
    }

    render() {


        // let customOrders = this.props.orders.map((order, index) => {
        //     return <CustomOrder order={order} key={index} id={order.id} ingredientPrice={this.props.ingredientPrice} />
        // }).reverse(); //this reverse show the last order in first 





        let customOrders = null;
        // if (this.props.customOrderLoading) {
        //     customOrders = <CustomOrder loading={true} />
        // } else {
        //     customOrders = this.props.orders.map((order, index) => {
        //         return <CustomOrder order={order} key={index} id={order.id} ingredientPrice={this.props.ingredientPrice} />
        //     }).reverse(); //this reverse show the last order in first 
        // }



        if (this.props.customOrderLoading) {
            customOrders = <CustomOrder loading={true} />
        } else if (this.props.orders.length === 0) {
            customOrders =
                <Grid item lg={3} md={4} sm={6} xs={12}>
                    <Alert severity="warning" variant="filled" sx={{ mx: 2, mt:3 }}><AlertTitle>Empty</AlertTitle>Sorry ! Your have no Custom Order. — <strong>Go to Menu </strong></Alert>
                </Grid>
        } else {
            customOrders = this.props.orders.map((order, index) => {
                return <CustomOrder order={order} key={index} id={order.id} ingredientPrice={this.props.ingredientPrice} />
            }).reverse(); //this reverse show the last order in first 
        }



        let defaultOrders = null;

        if (this.props.defaultOrderLoading) {
            defaultOrders = <Order loading={true} />
        } else if (this.props.defaultOrders.length === 0) {
            defaultOrders =
                <Grid item lg={3} md={4} sm={6} xs={12}>
                    <Alert severity="warning" variant="filled" sx={{ mt:3 }}><AlertTitle>Empty</AlertTitle>Sorry ! Your have no  Default Order. — <strong>Go to Menu </strong></Alert>
                </Grid>
        } else {
            defaultOrders = this.props.defaultOrders.map((order, index) => {
                return <Order order={order} key={index} id={order.id} />
            }).reverse(); //this reverse show the last order in first 

        }




        //console.log(this.props.defaultOrders)
        return (
            <>
                <Container maxWidth="xl" sx={{ my: 4 }}>
                    <Typography variant="h4" color="initial" sx={{ my: 4, textAlign: "center" }}>Orders</Typography>
                    <Grid container spacing={2}>
                        {customOrders}
                    </Grid>
                    <Grid container spacing={2}>
                        {defaultOrders}
                    </Grid>
                </Container>
            </>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)
