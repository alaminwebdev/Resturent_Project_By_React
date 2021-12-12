import React from 'react';
import { motion } from 'framer-motion';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LabelRoundedIcon from '@mui/icons-material/LabelRounded';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


//framer motion effect start
const stagger = {
    animate: {
        transition: {
            staggerChildren: 0.2
        }
    }
};

let easing = [0.6, -0.05, 0.01, 0.50];

const fadeInUp = {
    initial: {
        y: 60,
        opacity: 0,
        transition: { duration: 0.8, ease: easing }
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.4,
            ease: easing
        }
    }
};

//framer motion effect end

const slideLabelStyle = {
    borderColor: '#E5E8EC',
    color: '#007FFF',
    "&:hover": { borderColor: '#E5E8EC' },
    textTransform: 'capitalize',
    ml: 1,
    mb: 1
}


const SlideText = props => {
    //const stagger = props.parentAnimate;

    //const fadeInUp = props.animateVarient;

    const dishIndex = props.dishIndex;

    return (
        //motion this tag for framer motion
        <motion.div
            key={props.dishIndex.id}
            initial='initial'
            animate='animate'
            variants={stagger}
        >
            <motion.div variants={fadeInUp}  >
                <Button variant="outlined" sx={{ ...slideLabelStyle }} startIcon={<LabelRoundedIcon />}>
                    {dishIndex.label}
                </Button>
            </motion.div>

            <motion.div variants={fadeInUp} >
                <Typography variant="h1" sx={{ fontWeight: 600, px: 0, color: "#007FFF" }}>
                    {dishIndex.name}
                </Typography>
            </motion.div>

            <motion.div variants={fadeInUp}>
                <Typography variant="h1" gutterBottom sx={{ fontWeight: 600, px: 0 }}>
                    {dishIndex.subtitle}
                </Typography>
            </motion.div>

            <motion.div variants={fadeInUp}  >
                <Typography variant="subtitle2"   sx={{ ml: 1, pr: '30%' }}>
                    {dishIndex.description}
                </Typography>
            </motion.div>

            <motion.div variants={fadeInUp} >
                <Button variant="contained" sx={{ ml: 1, mt:2, bgcolor:'#007FFF'}} endIcon={<AddShoppingCartIcon />}>
                    Add to cart
                </Button>
            </motion.div>

        </motion.div>

    )
}

export default SlideText
