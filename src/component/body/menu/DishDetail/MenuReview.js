import React from 'react';
import Loading from '../../Loading';
import dateFormat from 'dateformat';
import { Box, Card, Slider, Avatar, Typography } from '@mui/material';



const MenuReview = props => {
    //console.log(props);
    const review = props.review.map((eachreview, index) => {
        //console.log(eachreview.author)
        return (

            <Box className="mt-4 " key={index} sx={{}}>
                <Card 
                    sx={{
                        display:'flex',
                        padding: 2,
                        my:2,
                        boxShadow: '0 2px 4px 0 rgba(138, 148, 159, 0.2)',
                    }}
                >
                    <Avatar src="" sx={{ bgcolor: '#1565c0' }}> {eachreview.author[0]} </Avatar>
                    <Box sx={{ml:1, width:'100%' , color:'#fff',}}>
                        <Typography variant="h6" color="initial"  sx={{lineHeight:1}}>{eachreview.author}</Typography>
                        <Typography variant="caption" color="initial">Rating: {eachreview.rating + "*"}</Typography>
                        
                        <Box sx={{display: 'flex', justifyContent:'space-between', mt:1}}>
                            <Typography variant="subtitle2" color="initial">{eachreview.comment}</Typography>
                            <Typography variant="caption" color="initial">{dateFormat(eachreview.date, "dddd, mmmm dS, yyyy")}</Typography>
                        </Box>
                    </Box>

                </Card>

            </Box>

        )
    })


    if (props.commentLoading) {
        return (
            <Loading />
        )
    } else {
        return (
            <div>
                {review}
            </div>
        )
    }
}

export default MenuReview;