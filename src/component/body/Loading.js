import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loading() {
    return (
        <Container maxWidth='xl'>
            <Box sx={{ display: 'flex', justifyContent:'center', mt:5 }}>
                <CircularProgress  sx={{ color:"#007FFF" }}/>
            </Box>
            {/* <Grid container spacing={2} sx={{ my: 5 }}>
                <Grid item >
                    <Skeleton />
                    <Skeleton animation="wave" />
                    <Skeleton animation={false} />
                </Grid>
            </Grid> */}
        </Container >
    )
}
