import React from 'react';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Box } from '@mui/system';

const controls = [
    { id: 1, label: 'Salad', type: 'salad' },
    { id: 2, label: 'Cheese', type: 'cheese' },
    { id: 3, label: 'Meat', type: 'meat' }
]
const ControlBulid = props => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', m: 3 }}>
            <Typography variant="h6" color='inherit' sx={{ mr: 3 }} >{props.label} : </Typography>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button onClick={props.added}>Add</Button>
                <Button onClick={props.removed}>Remove</Button>
            </ButtonGroup>
        </Box>
    )
}

const Control = props => {
    return (
        <Box >
            <Typography variant="h3" color="#fff" sx={{ bgcolor: '#007FFF', py: 1 }} >Add Ingredients</Typography>
            <Box >
                {controls.map((item) => {
                    return <ControlBulid
                        label={item.label}
                        type={item.type}
                        key={item.id}
                        added={ () =>props.ingredientAdd(item.type)}
                        removed={ () =>props.ingredientRemove(item.type)}
                    />
                })}
            </Box>
            <Typography variant="h3" color="#fff" sx={{ bgcolor: '#007FFF', py: 1 }} >Price {props.price} BDT</Typography>
            <Button disabled={!props.purchasable} variant="outlined" onClick={props.modalOpen} sx={{ mt:3}}>
                Order Now
            </Button>
        </Box>

    )
}

export default Control
