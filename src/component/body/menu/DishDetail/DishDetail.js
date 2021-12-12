import React from 'react';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuReview from './MenuReview';
import CommentForm from './CommentForm';


const DishDetail = props => {
    const dishes = props.eachdish;
    const comments = props.comment_arr;
    const commentLoading = props.commentLoading
    //console.log(dishes);
    //console.log(props);

    return (
        <>
            <Grid item lg={6} md={6} sm={12} sx={{ pl: 0, pt: 0, alignSelf: 'center' }}>
                <Box sx={{ borderRadius: '32px', overflow:'hidden'}} >
                    <img
                        width='100%'
                        src={dishes.image}
                        alt={dishes.name}
                        loading="lazy"

                    />
                </Box>
            </Grid>
            <Grid item lg={6} md={6} sm={12} sx={{ pr:2 }}>
                <Typography  variant="h4" component="div" >
                    {dishes.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {dishes.description}
                </Typography>

                <MenuReview key={dishes.id} review={comments} commentLoading={commentLoading} />

                <CommentForm dishId={dishes.id} />

                <Box sx={{ textAlign:'center' }}>
                    <Button variant="outlined" onClick={props.modalClose} sx={{ my: 2 }}>
                        Close
                    </Button>
                </Box>

            </Grid>
        </>
    )
}

export default DishDetail;