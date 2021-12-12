import React, { useState } from 'react';
import Burger from './Burger/Burger';

import Control from './Ingredient/Control';
import { Box } from '@mui/system';
import { Grid, Container } from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Summery from './OrderSummery/Summery';

import { connect } from "react-redux";
import { addIngredient, removeIngredient, updatePurchasable } from '../../../redux/actionCreators';

// accept state as a props from intial state 
const mapStateToProps = state => {
    return {
        ingredients: state.customBurger.ingredients,
        ingredientPrice: state.customBurger.ingredientPrice,
        purchasable: state.customBurger.purchasAble,
        totalPrice: state.customBurger.totalPrice,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: (igType) => dispatch(addIngredient(igType)),
        removeIngredient: (igType) => dispatch(removeIngredient(igType)),
        updatePurchasable: () => dispatch(updatePurchasable()),
    }
}

//modal style 
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    p: 4,
};


const BurgerBuilder = props => {
    const [modalOpen, setModalOpen] = useState(false)
    //modal funtionality
    const handleClose = () => setModalOpen(!modalOpen)

    //add Ingredient
    const addIngredient = type => {
        props.addIngredient(type);
        props.updatePurchasable()
    }
    //remove Ingredient
    const removeIngredient = type => {
        props.removeIngredient(type);
        props.updatePurchasable()
    }
    //handleCheckout
    const handleCheckout = () => {
        // props.history.push({
        //     pathname: '/checkout',
        //     state: {
        //         demo:'demostate',
        //         ingredients: props.ingredients,
        //         totalPrice: props.totalPrice,
        //     }
        // })
        props.history.push('/checkout')
    }
    //console.log(props)
    return (
        <Container maxWidth="xl" >
            <Grid container sx={{ my: 5 }} spacing={2}>
                <Grid item xl={6} lg={6} md={6} sm={12}>
                    <Box>
                        <Burger ingredients={props.ingredients} />
                    </Box>
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={12} sx={{ textAlign: 'center', alignSelf: 'center' }}>
                    <Box >
                        <Control
                            ingredientAdd={addIngredient}
                            ingredientRemove={removeIngredient}
                            price={props.totalPrice}
                            purchasable={props.purchasable}
                            modalOpen={handleClose}
                        />
                    </Box>
                </Grid>
            </Grid>
            <Modal
                sx={{ overflowY: 'scroll' }}
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={modalOpen}
                onClose={handleClose}
                closeAfterTransition
            >
                <Fade in={modalOpen}>
                    <Box sx={style}>
                        <Summery
                            modalClose={handleClose}
                            totalPrice={props.totalPrice}
                            ingredients={props.ingredients}
                            ingredientPrice={props.ingredientPrice}
                            handleCheckout={handleCheckout}
                        />
                    </Box>

                </Fade>
            </Modal>
        </Container>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder)