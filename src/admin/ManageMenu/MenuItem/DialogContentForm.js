import React from 'react';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';

import DialogActions from '@mui/material/DialogActions';


import { useForm, Controller } from "react-hook-form";

const style = {
    mt: 3
}





const DialogContentForm = (props) => {
    //console.log(props);
    const { register, handleSubmit, control, reset, formState: { errors, isSubmitSuccessful } } = useForm();

    const onSubmit = updateData => {
        props.update(props.item.id, props.item , updateData)
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    fullWidth
                    label="Item name"
                    variant="outlined"
                    {...register("name", { required: "Item name is required." })}
                    error={Boolean(errors.name)}
                    helperText={errors.name?.message}
                    sx={{ ...style }}
                    defaultValue={props.item.name}

                />


                <FormControl
                    error={Boolean(errors.label)}
                    fullWidth
                    sx={{ ...style }}
                >
                    <InputLabel id="demo-simple-select-label">Choose Label</InputLabel>
                    <Controller

                        render={({ field }) => (
                            <Select
                                {...field}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Choose Label"
                            >
                                <MenuItem value='Hot'>Hot</MenuItem>
                                <MenuItem value='New Arrival'>New Arrival</MenuItem>
                                <MenuItem value='Top Rated'>Top Rated</MenuItem>

                            </Select>
                        )}

                        name="label"
                        control={control}
                        defaultValue={props.item.label}
                        rules={{
                            required: "Labal is required !"
                        }}
                    />
                    <FormHelperText style={{ color: '#d32f2f' }}>{errors.label?.message}</FormHelperText>
                </FormControl>


                <TextField
                    fullWidth
                    label="Description"
                    variant="outlined"
                    {...register("description", { required: "Description is required" })}
                    error={Boolean(errors.description)}
                    helperText={errors.description?.message}
                    sx={{ ...style }}
                    defaultValue={props.item.description}
                />
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
                    defaultValue={props.item.price[0].small}

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
                    defaultValue={props.item.price[0].medium}

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
                    defaultValue={props.item.price[0].large}

                />
                <DialogActions sx={{pt:2, px:0, pb:0}}>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={props.close}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="outlined"
                        color="primary">
                        Update
                    </Button>
                </DialogActions>
            </form>
        </>
    )
}

export default DialogContentForm
