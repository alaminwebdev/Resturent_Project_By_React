import React, { useState } from 'react';
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';

import { useForm, Controller } from "react-hook-form";
import { connect } from 'react-redux';
import { resetIngredient } from '../../../../redux/actionCreators';
import axios from 'axios';

// accept state as a props from intial state 
const mapStateToProps = state => {
    return {
        ingredients: state.customBurger.ingredients,
        orderPrice: state.customBurger.totalPrice,
        purchasable: state.customBurger.purchasAble,
        token: state.authState.token,
        userId: state.authState.userId,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        resetIngredient: () => dispatch(resetIngredient()),
    }
}


const CheckOut = props => {
    const { register, handleSubmit, control, reset, formState: { errors, isSubmitSuccessful } } = useForm();

    const [response, setResponse] = useState(false)
    const [responseText, setResponseText] = useState('')
    const [responseType, setResponseType] = useState('success')

    const onSubmit = data => {
        const customOrder = {
            customerInfo: data,
            ingredients: props.ingredients,
            orderPrice: props.orderPrice,
            orderTime: new Date().toISOString(),
            userId:props.userId,
            status:'pending',
            default:false
        }
        axios.post(`${process.env.REACT_APP_FIREBASE_DATABASE_URL}/customorders.json`, customOrder)
            .then(response => {
                if (response.status === 200) {
                    setResponse(true);
                    setResponseText('Order placed successfully');
                    setResponseType('success');

                    //form will be empty
                    reset({
                        address: '',
                        phone: '',
                        payment: ''
                    });
                    //this will close alert box
                    setTimeout(() => {
                        setResponse(false);
                    }, 2000)
                    props.resetIngredient();
                }
            })
            .catch(error => {
                setResponse(true);
                setResponseText(error.message);
                setResponseType('error');
                //this will close alert box
                setTimeout(() => {
                    setResponse(false);
                }, 2000)
                //console.log(error.message)
            })
        //console.log(customOrder);
        //props.addComment(props.dishId, data.author, data.rating, data.comment);
    }

    const goBack = () => {
        props.history.goBack('/build')
    }


    const style = {
        mt: 3,
        textAlign: 'center'
    }

    //console.log(props)
    return (
        <Container maxWidth="md" sx={style}>
            <Typography variant="h4" color="initial" >
                Checkout
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h6" color="initial" >
                    Payment: {props.orderPrice} tk
                </Typography>

                <Collapse in={response}>
                    <Alert severity={responseType} sx={{ mt: 3 }}>{responseText}</Alert>
                </Collapse>

                <TextField
                    sx={style}
                    fullWidth
                    label="Your Address"
                    variant="outlined"
                    {...register("address", { required: "address is required." })}
                    error={Boolean(errors.address)}
                    helperText={errors.address?.message}

                />

                <TextField
                    sx={style}
                    fullWidth
                    label="Phone Number"
                    variant="outlined"
                    {...register("phone", { required: "phone is required" })}
                    error={Boolean(errors.phone)}
                    helperText={errors.phone?.message}
                />


                <FormControl
                    sx={{ ...style, textAlign: 'left' }}
                    error={Boolean(errors.payment)}
                    fullWidth
                >
                    <InputLabel id="demo-simple-select-label">Payment Type</InputLabel>
                    <Controller

                        render={({ field }) => (
                            <Select
                                {...field}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Payment Type"
                            >
                                <MenuItem value='bKash'>bKash</MenuItem>
                                <MenuItem value='nagad'>Nagad</MenuItem>
                                <MenuItem value='rocket'>Rocket</MenuItem>
                                <MenuItem value='upay'>Upay</MenuItem>
                            </Select>
                        )}

                        name="payment"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: "payment is required !"
                        }}
                    />
                    <FormHelperText style={{ color: '#d32f2f' }}>{errors.payment?.message}</FormHelperText>
                </FormControl>

                <Button
                    disabled={!props.purchasable}
                    sx={style}
                    type='submit'
                    variant="outlined"
                    color="primary">
                    Place Order
                </Button>
                <Button
                    sx={{ ...style, ml: 3 }}
                    variant="outlined"
                    color="primary"
                    onClick={goBack}
                >
                    Go back
                </Button>
            </form>
        </Container>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut)
