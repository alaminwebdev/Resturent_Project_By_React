import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Grid, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Skeleton from '@mui/material/Skeleton';
import Chip from '@mui/material/Chip';
import dateFormat from 'dateformat';


const Order = props => {
    console.log(props)
    let cartDetailsRow = null;
    if (!props.loading) {
        cartDetailsRow = props.order.cartItems.map((item) => {
            return (
                <TableRow key={Math.random()}>
                    <TableCell>{item.dishItem}({item.varient})</TableCell>
                    <TableCell align="right">{item.quantity}</TableCell>
                    <TableCell align="right">{item.price}</TableCell>
                </TableRow>
            )
        })
    }

    return (
        <Grid item lg={3} md={4} sm={6} xs={12}>

            <Card sx={{ mt: 3, }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {props.loading ? (<Skeleton animation="wave" />) : (
                            <>
                                Order Id:{props.order.id}
                            </>
                        )}
                    </Typography>
                    <Typography variant="h6" component="div">
                        {props.loading ? (<Skeleton animation="wave" />) : (
                            <>
                                Address. {props.order.customerInfo.address}
                            </>
                        )}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} variant="caption" color="text.secondary">
                        {props.loading ? (<Skeleton animation="wave" />) : (
                            <>
                                Order Placed: {dateFormat(props.order.orderTime, "dd mmm , h:MM tt")}
                                <Chip
                                    label={props.order.status}
                                    sx={{ ml: 1, fontWeight: 400 }}
                                    size="small"

                                    color={props.order.status === 'delivered' ? 'success' : props.order.status === 'ongoing' ? 'warning' : 'error'}

                                />
                            </>
                        )}
                    </Typography>

                    <TableContainer key={Math.random()} >
                        <Table sx={{}} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell >Item</TableCell>
                                    <TableCell align="right">Qty.</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.loading ? (
                                    <TableRow>
                                        <TableCell><Skeleton animation="wave" /></TableCell>
                                        <TableCell align="right"><Skeleton animation="wave" /></TableCell>
                                        <TableCell align="right"><Skeleton animation="wave" /></TableCell>
                                    </TableRow>
                                ) : (cartDetailsRow)}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </CardContent>

                {props.loading ? (
                    <CardActions><Skeleton animation="wave" width='100%' /></CardActions>
                ) : (
                    <CardActions sx={{ justifyContent: 'space-evenly', mb: 1 }}>
                        <Chip label={'Price: ' + props.order.totalPrice + 'tk'} variant="outlined" />
                        <Chip label={'Payment: ' + props.order.customerInfo.payment} variant="outlined" />
                    </CardActions>
                )}

            </Card>
        </Grid>


    )
}

export default Order
