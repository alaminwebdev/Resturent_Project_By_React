import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { fetchAllOrder } from '../../redux/adminActionCreators'
import { getDatabase, ref, set, push, child, update, remove } from "firebase/database";

import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';

import OrderTable from './ManageOrderTable/OrderTable';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography'


// accept state as a props from intial state 
const mapStateToProps = state => {
    return {
        orders: state.customBurger.orders,
        customOrderLoading: state.customBurger.orderLoading,

        defaultOrders: state.dishes.defaultOrders,
        defaultOrderLoading: state.dishes.orderLoading,

        ingredientPrice: state.customBurger.ingredientPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAllOrder: () => dispatch(fetchAllOrder()),
    }
}


const ManageOrder = props => {

    const [response, setResponse] = useState(false);
    const [responseText, setResponseText] = useState('')
    const [responseType, setResponseType] = useState('success');

    const [status, setStatus] = useState('pending');

    //render every item delete through useEffect
    const [fetch, setFetch] = useState(true);


    const statusChange = (e, id, isDefault) => {
        
        const selectedOrder = isDefault ? props.defaultOrders.filter(item => item.id === id) : props.orders.filter(item => item.id === id)
        //console.log(selectedOrder[0])
        const db = getDatabase();
        const postData = selectedOrder[0];

        update(ref(db, isDefault ? 'orders/' + id : 'customorders/' + id), {
            ...postData,
            status: e.target.value,
        })
            .then(() => {
                // Data saved successfully!
                setResponse(true);
                setResponseType('success')
                console.log(postData, 'Data updated succesfully')
                setResponseText('Data updated successfully')
                setFetch(!fetch);

                setTimeout(() => {
                    setResponse(false)
                }, 2000)
            })
            .catch((error) => {
                // The write failed...
                console.log(error)
                setResponse(true);
                setResponseType('error')
                setResponseText('Sorry ! Something Wrong.')

            });
    }

    const deleteOrder = (id, isDefault) => {
        console.log(id, isDefault)

        const db = getDatabase();

        remove(ref(db, isDefault ? 'orders/' + id : 'customorders/' + id))
            .then(() => {
                // Data saved successfully!
                //console.log('data saved succesfully')
                setResponse(true);
                setResponseType('success')
                setResponseText('Data Deleted successfully')
                setFetch(!fetch);

                setTimeout(() => {
                    setResponse(false)
                }, 2000)
            })
            .catch((error) => {
                // The write failed...
                console.log(error)
                setResponse(true);
                setResponseType('error')
                setResponseText('Sorry ! Something Wrong.')

                setTimeout(() => {
                    setResponse(false)
                }, 2000)

            });
    }

    //render on fist and when fetch state change
    useEffect(() => {
        props.fetchAllOrder();
    }, [fetch])

    return (
        <Container maxWidth="lg" sx={{ my: 5 }}>
            <Typography variant="h4" color="initial" sx={{ my: 5 }}>Default Order</Typography>
            <Collapse in={response}>
                <Alert severity={responseType} sx={{ my: 5 }}>{responseText}</Alert>
            </Collapse>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Order No.</TableCell>
                            <TableCell  >Address</TableCell>
                            <TableCell >Phone No.</TableCell>
                            <TableCell >Status</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.defaultOrders.map((order) => (
                            <OrderTable key={order.id} order={order} details={order.cartItems} price={order.totalPrice} delete={deleteOrder} status={statusChange} currentStatus={status} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Typography variant="h4" color="initial" sx={{ my: 5 }}>Custom Order</Typography>
            <TableContainer component={Paper} >
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Order No.</TableCell>
                            <TableCell  >Address</TableCell>
                            <TableCell >Phone No.</TableCell>
                            <TableCell >Status</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.orders.map((order) => (
                            <OrderTable key={order.id} order={order} details={order.ingredients} price={order.orderPrice} delete={deleteOrder} status={statusChange} currentStatus={status} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>

    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageOrder)

