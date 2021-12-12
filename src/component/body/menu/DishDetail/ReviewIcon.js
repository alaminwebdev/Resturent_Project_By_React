import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';


const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
        color: '#ff3d47',
    },
});

const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

const ReviewIcon = props => {

    const [value, setValue] = useState(1);
    const [hover, setHover] = useState(-1);
    console.log(value)
    return (
        <Box
            sx={{
                width: 200,
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <StyledRating
                name="customized-color"
                value={value}
                precision={0.5}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
                icon={<FavoriteIcon fontSize="inherit" />}
                emptyIcon={<FavoriteIcon fontSize="inherit" />}
            />
            {value !== null && (
                <Box sx={{ ml: 2 }}>
                    <Typography variant="caption" display="block">
                        {labels[hover !== -1 ? hover : value]}
                    </Typography>
                </Box>
            )}
        </Box>
    )
}

export default ReviewIcon
