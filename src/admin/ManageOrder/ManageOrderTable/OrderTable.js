import React, { useState } from 'react';


import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';;


const OrderTable = props => {

    const { order } = props;
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {order.id}
                </TableCell>
                <TableCell >{order.customerInfo.address}</TableCell>
                <TableCell >{order.customerInfo.phone}</TableCell>
                <TableCell >
                    <FormControl fullWidth >
                        <InputLabel id="demo-simple-select-label" >Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={order.status}
                            label="Status"
                            onChange={ e => props.status(e, order.id, order.default)}
                            sx={{ fontSize: '0.875rem' }}
                            size='small'
                        >
                            <MenuItem value='pending' dense={true}>Pending</MenuItem>
                            <MenuItem value='ongoing' dense={true}>Ongoing</MenuItem>
                            <MenuItem value='delivered' dense={true}>Delivered</MenuItem>
                            <MenuItem value='canceled' dense={true}>Canceled</MenuItem>
                        </Select>
                    </FormControl>
                </TableCell>
                <TableCell align="right">
                    <IconButton aria-label="delete" onClick={() => props.delete(order.id, order.default)}>
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell sx={{ pb: 0, pt: 0, borderBottom: '0px', }} colSpan={2} >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 'auto' }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Details
                            </Typography>
                            <Table size="small" aria-label="purchases" >
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left" >Name</TableCell>
                                        <TableCell align="right" >Quantity</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {props.details.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row" >
                                                {item.dishItem || item.type}
                                            </TableCell>
                                            <TableCell align="right">{item.quantity || item.amount}</TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow>
                                        <TableCell align="right">Total Price :</TableCell>
                                        <TableCell align="right" >{props.price}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}

export default OrderTable
