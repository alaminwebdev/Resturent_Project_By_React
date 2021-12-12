import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';



const Summery = props => {
    const updateIngredient = props.ingredients.map((item) => {
        return (
            <TableRow key={item.type}>
                <TableCell>{item.type}</TableCell>
                <TableCell align="right">{item.amount}</TableCell>
                <TableCell align="right">{props.ingredientPrice[item.type] * item.amount}</TableCell>
            </TableRow>
        )
    })
    //console.log(props.ingredientPrice['salad'])
    return (
        <Card sx={{}}>
            <CardContent>
                <TableContainer>
                    <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left" colSpan={2}>
                                    Your Order Summery
                                </TableCell>
                                <TableCell align="right">Price</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Ingredient</TableCell>
                                <TableCell align="right">Qty.</TableCell>
                                <TableCell align="right">Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {updateIngredient}
                            <TableRow>
                                <TableCell colSpan={2} align="right">Total</TableCell>
                                <TableCell align="right">{props.totalPrice}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
                <Button size="small"  variant="outlined"  onClick={props.modalClose} >Close</Button>
                <Button size="small"  variant="outlined"  onClick={props.handleCheckout}>Checkout</Button>
            </CardActions>
        </Card>
    )
}

export default Summery
