import React from 'react';
import { useForm } from "react-hook-form";
import { connect } from 'react-redux';
import { addPrice } from '../../../redux/adminActionCreators';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'

const mapStateToProps = state => {
    return {
        itemPrice :  state.adminState.price[0]
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addPrice: (price) => dispatch(addPrice(price))
    }
}


const AddPrice = props => {
    //console.log(props);

    const { register, handleSubmit, control, reset, formState: { errors, isSubmitSuccessful } } = useForm();

    const onSubmit = data => {
        //console.log(data);
        props.addPrice(data)
        props.next();
    }


    const style = {
        mt: 3
    }

    return (
        <Container maxWidth="md">
            <form onSubmit={handleSubmit(onSubmit)}>

                <TextField
                    fullWidth
                    label="Small"
                    variant="outlined"
                    placeholder="Price range 100 - 199"
                    type="number"
                    InputProps={{
                        inputProps: {
                            max: 199, min: 100
                        }
                    }}
                    {...register("small", { required: "Required." })}
                    error={Boolean(errors.small)}
                    helperText={errors.small?.message}
                    sx={{ ...style }}
                    defaultValue={props.itemPrice.small}

                />
                <TextField
                    fullWidth
                    label="Medium"
                    variant="outlined"
                    placeholder="Price range 200 - 399"
                    type="number"
                    InputProps={{
                        inputProps: {
                            max: 399, min: 200
                        }
                    }}
                    {...register("medium", { required: "Required." })}
                    error={Boolean(errors.medium)}
                    helperText={errors.medium?.message}
                    sx={{ ...style }}
                    defaultValue={props.itemPrice.medium}

                />
                <TextField
                    fullWidth
                    label="Large"
                    variant="outlined"
                    placeholder="Price range 400 - 999"
                    type="number"
                    InputProps={{
                        inputProps: {
                            max: 999, min: 400
                        }
                    }}
                    {...register("large", { required: "Required." })}
                    error={Boolean(errors.large)}
                    helperText={errors.large?.message}
                    sx={{ ...style }}
                    defaultValue={props.itemPrice.large}

                />


                <Box sx={{ mb: 2 }}>
                    <div>
                        <Button
                            type="submit"
                            variant="outlined"
                            color="primary"
                            sx={{ ...style }}
                            endIcon={<SendIcon />}
                        >
                            {props.step === 3 ? 'Finish' : 'Next'}
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
                    </div>
                </Box>
            </form>
        </Container>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPrice)
