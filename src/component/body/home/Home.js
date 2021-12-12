import React, { useState } from 'react';

import DISHES from '../../../data/dishes';
import SlideText from './SlideText';
import SlideImage from './SlideImage';

import { motion, AnimatePresence } from 'framer-motion';
import { wrap } from '@popmotion/popcorn';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid';
import Fab from '@mui/material/Fab';
import ArrowLeftRoundedIcon from '@mui/icons-material/ArrowLeftRounded';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';




//mui css style start
const slideButtonStyle = {
    color: '#fff',
    bgcolor: '#007FFF',
    "&:hover": { bgcolor: '#007FFF' }
}


//mui css style end


const Home = () => {

    const [[page, direction], setPage] = useState([0, 0]);
    //const imageIndex = wrap(0, images.length, page);
    //const itemIndex = wrap(0, item.length, page);
    const Dishes = wrap(0, DISHES.length, page);


    //console.log(DISHES[Dishes].name);
    const paginate = newDirection => {
        setPage([page + newDirection, newDirection]);
        //this Dishes will print index number of DISHES object 
        //console.log(Dishes);
    };

    return (
        <Container maxWidth='xl'
            className="slide-container"
            sx={{
                // 1 means 8px 
                alignItems: 'center',
                py: 10,
                position: 'relative'
            }}
        >
            <AnimatePresence initial='initial'  >  {/* AnimatePresence this tag for framer motion */}
                <motion.div key={DISHES[Dishes]} >
                    <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                        <Grid item xs={12} sm={12} md={6} lg={7}>
                            <SlideText
                                dishIndex={DISHES[Dishes]}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={5}>
                            <SlideImage
                                src={DISHES[Dishes]}
                                custom={direction}
                                paginate={paginate}
                            />
                        </Grid>
                    </Grid>
                </motion.div>
            </AnimatePresence>
            <Box
                sx={{
                    position: 'absolute',
                    left: '50%',
                    bottom: '0',
                    transform: 'translateX(-50%)'
                }}
            >
                <Fab
                    sx={{ ...slideButtonStyle, mr: 1 }}
                    size="small"
                    aria-label="previous"
                    onClick={() => paginate(-1)}
                >
                    <ArrowLeftRoundedIcon />
                </Fab>

                <Fab
                    sx={{ ...slideButtonStyle }}
                    size="small"
                    aria-label="next"
                    onClick={() => paginate(1)}
                >
                    <ArrowRightRoundedIcon />
                </Fab>
            </Box>
        </Container>
    )
}

export default Home
