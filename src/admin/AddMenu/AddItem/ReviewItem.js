import React from 'react';
import { connect } from 'react-redux';

import { getDatabase, ref, set, push, child } from "firebase/database";

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';



const mapStateToProps = state => {
    return {
        item: state.adminState
    }
}

const ReviewItem = props => {
    //console.log(props);
    
    const style = {
        mt: 3
    }

    const handleDish = () => {
        const menu = { ...props.item }
        //console.log(menu)
        const db = getDatabase();
        //generate a new key for one object data
        const menuKey = push(child(ref(db), 'menus')).key;
        set(ref(db, 'menus/' + menuKey ), menu)
            .then(() => {
                // Data saved successfully!
                //console.log('data saved succesfully')
                props.initialStep("success", "Item added Successfully !");
            })
            .catch((error) => {
                // The write failed...
                console.log(error)
                props.getError("error", error.message)
            });
    }

    const varients = props.item.varients.map((item) => {
        return (
            <TableRow key={Math.random()}>
                <TableCell>{item}</TableCell>
                <TableCell align="right">1</TableCell>
                <TableCell align="right">{props.item.price[0][item]}</TableCell>
            </TableRow>
        )
    })

    return (
        <Container maxWidth="md">
            <Grid container spacing={0}>
                <Grid item xs={12} sm={6} md={6} lg={6} >
                    <Card >
                        <CardMedia
                            component="img"
                            height="250"
                            image={props.item.image}
                            alt=""
                        />

                        <CardContent sx={{ pb: 1 }}>
                            <Typography variant="h6" component="div" >
                                Item Name: {props.item.name}
                                <Chip label={props.item.label} sx={{ ml: 1, fontWeight: 400, lineHeight: 1 }} size="small" variant="outlined" />
                            </Typography>

                            <Typography sx={{ mb: 1.5 }} variant="caption" color="text.secondary">
                                {props.item.description}
                            </Typography>
                            <TableContainer >
                                <Table sx={{}} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell >Varient</TableCell>
                                            <TableCell align="right">Qty.</TableCell>
                                            <TableCell align="right">Price</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {varients}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Box sx={{ mb: 2 }}>
                <Button
                    type="submit"
                    variant="outlined"
                    color="primary"
                    sx={{ ...style }}
                    endIcon={<SendIcon />}
                    onClick={handleDish}
                >
                    {props.step === 4 ? 'Finish' : 'Next'}
                </Button>
                <Button
                    disabled={props.step === 0}
                    variant="outlined"
                    color="primary"
                    onClick={props.back}
                    sx={{ ...style, ml: 3 }}
                >
                    Back
                </Button>
            </Box>
        </Container>
    )
}

export default connect(mapStateToProps, null)(ReviewItem)
