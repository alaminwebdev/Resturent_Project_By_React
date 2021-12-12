import React, { useState } from 'react';

import { connect } from 'react-redux';
import { addToCart } from '../../../../redux/actionCreators';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Zoom from '@mui/material/Zoom';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';
import Button from '@mui/material/Button';

const mapDispatchToProps = dispatch => {
    return {
        addToCart: (dishItem, quantity, varient, price) => dispatch(addToCart(dishItem, quantity, varient, price))
    }
}

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const Varients = (props) => {
    const [quantity, setQuantity] = useState(1)
    const [varient, setVarient] = useState(props.varients[0])
    const [snackOpen, setsnackOpen] = useState(false);

    //console.log(props)
    console.log(quantity, varient)

    const vari = props.varients.map((varient, index) => {
        //console.log(varient)
        return (
            <MenuItem
                key={index}
                value={varient}

            >
                {varient}
            </MenuItem>
        )
    })

    const handleCheckout = (event) => {

        //console.log(quantity, varient, dishId, 'price:', props.price[varient] * quantity)

        props.addToCart(props.dishItem, quantity, varient, props.price[varient] * quantity);
        
  
        setsnackOpen(true);

        //clear state
        setQuantity(1);
        setVarient(props.varients[0])

    }

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setsnackOpen(false);
    };

    return (
        <Grid container spacing={1} sx={{ mt: 2 }}>
            <Grid item lg={6} md={6} sm={6} xs={6}>
                <FormControl fullWidth  >
                    <InputLabel id="demo-simple-select-label">Varient</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Varient"
                        fullWidth
                        sx={{ height: '40px' }}
                        value={varient}
                        onChange={(e) => { setVarient(e.target.value) }}
                    >
                        {vari}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
                <FormControl fullWidth >
                    <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Quantity"
                        autoWidth
                        sx={{ height: '40px' }}
                        value={quantity}
                        onChange={(e) => { setQuantity(e.target.value) }}
                    >

                        {[...Array(5).keys()].map((x, i) => {
                            return <MenuItem key={i} value={i + 1}>{i + 1}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </Grid>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mx: 1,
                    px: 1,
                    mt: 2,


                }}
            >
                <Typography variant="subtitle2" color="text.secondary" >
                    Price: {props.price[varient] * quantity}
                </Typography>
                <Tooltip title="Add To Cart" TransitionComponent={Zoom}  >
                    <IconButton aria-label="ShoppingCart" onClick={() => handleCheckout(props.dishID)}>
                        <ShoppingCartRoundedIcon />
                    </IconButton>
                </Tooltip>
                <Snackbar
                    open={snackOpen}
                    autoHideDuration={2000}
                    onClose={handleSnackClose}
                >
                    <Alert severity="success" sx={{ width: '100%' }}>
                        Cart Added Successfully
                    </Alert>
                </Snackbar>
            </Box>

        </Grid>
    )


}

export default connect(null, mapDispatchToProps)(Varients)

