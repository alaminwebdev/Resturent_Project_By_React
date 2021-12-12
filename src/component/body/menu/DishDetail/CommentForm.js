import React, {useEffect} from 'react';
import { addComment } from '../../../../redux/actionCreators';
import { connect } from 'react-redux';

import { useForm, Controller } from "react-hook-form";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';



const mapDispatchToProps = dispatch => {
    return {
        addComment: (dishId, author, rating, comment) => dispatch(addComment(dishId, author, rating, comment))
    }
}


const CommentForm = props => {

    const { register, handleSubmit, control, reset, formState: { errors, isSubmitSuccessful } } = useForm();

    const onSubmit = data => {
        //console.log(props.dishId, data.author, data.rating, data.comment)
        props.addComment(props.dishId, data.author, data.rating, data.comment);
    }

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({ 
                author: '',
                rating:'',
                comment:''
             });
        }
    });

    const style ={
        mt:2
    }

    //console.log(props);
    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <TextField
                fullWidth
                label="Name"
                variant="outlined"
                {...register("author", { required: "Name is required." })}
                error={Boolean(errors.author)}
                helperText={errors.name?.message}
                sx={{...style}}

            />


            <FormControl
                error={Boolean(errors.rating)}
                fullWidth
                sx={{...style}}
            >
                <InputLabel id="demo-simple-select-label">rating</InputLabel>
                <Controller

                    render={({ field }) => (
                        <Select
                            {...field}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="rating"
                        >
                            <MenuItem value='1'>One</MenuItem>
                            <MenuItem value='2'>Two</MenuItem>
                            <MenuItem value='3'>Three</MenuItem>
                            <MenuItem value='4'>Four</MenuItem>
                            <MenuItem value='5'>Five</MenuItem>
                        </Select>
                    )}

                    name="rating"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: "Rating is required !"
                    }}
                />
                <FormHelperText style={{ color: '#d32f2f' }}>{errors.rating?.message}</FormHelperText>
            </FormControl>


            <TextField
                fullWidth
                label="comment"
                variant="outlined"
                {...register("comment", { required: "Comment is required" })}
                error={Boolean(errors.comment)}
                helperText={errors.comment?.message}
                sx={{...style}}
            />



            <Button
                sx={{...style}}
                type='submit'
                variant="outlined"
                color="primary">
                Submit
            </Button>
        </form>
    )
}

export default connect(null, mapDispatchToProps)(CommentForm);

