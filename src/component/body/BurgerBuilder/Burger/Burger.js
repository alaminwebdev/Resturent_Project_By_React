import React from 'react';
import Ingredient from '../Ingredient/Ingredient';
import Typography from '@mui/material/Typography';

const Burger = props => {
    let ingredientArr = props.ingredients.map((item) => {
        let amountArr = [...Array(item.amount).keys()];
        //console.log(amountArr)
        return amountArr.map(_ => {
            return <Ingredient type={item.type} key={Math.random()} />
        })
    })
        .reduce((arrey, element) => {
            return arrey.concat(element);
        }, []);
    //console.log(ingredientArr)
    if (ingredientArr.length === 0) {
        ingredientArr = <Typography variant="h6" color="initial" sx={{ textAlign: 'center' }}>Please add some ingredient !</Typography>
    }
    return (
        <>
            <Ingredient type='burger-top' />
            {ingredientArr}
            <Ingredient type='burger-bottom' />
        </>

    )
}

export default Burger
