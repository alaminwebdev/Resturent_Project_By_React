import React, {useEffect} from 'react';

import { withRouter } from 'react-router-dom';

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'




const style = {
    bgcolor: 'error.main', mt: 3, cursor: 'pointer', textAlign: 'center', lineHeight: '200px'
}



const Admin = props => {
    console.log(props)
    const { history } = props;

    const handleMenuClick = pageUrl => {
        history.push(pageUrl)
    };

    return (
        <Container maxWidth="lg">
            <Grid container spacing={3}>
                <Grid item lg={12}>
                    <Typography variant="h3" color="initial" sx={{ textAlign: 'center', my: 3 }}>Admin Panel</Typography>
                </Grid>
                <Grid item lg={4}>
                    <Box >
                        <Typography
                            variant="h4"
                            color="#fff"
                            sx={{ ...style }}
                            onClick={() => handleMenuClick('/addmenu')}
                        >
                            Add Menu
                        </Typography>
                    </Box>
                </Grid>
                <Grid item lg={4}>
                    <Box sx={{ ...style }}>
                        <Typography
                            variant="h4"
                            color="#fff"
                            sx={{ ...style }}
                            onClick={() => handleMenuClick('/managemenu')}
                        >
                            Manage Menu
                        </Typography>
                    </Box>
                </Grid>
                <Grid item lg={4}>
                    <Box sx={{ ...style }}>
                        <Typography
                            variant="h4"
                            color="#fff"
                            sx={{ ...style }}
                            onClick={() => handleMenuClick('/manageorder')}
                        >
                            Manage Order
                        </Typography>
                    </Box>
                </Grid>
                <Grid item lg={4}>
                    <Box sx={{ ...style }}>
                        <Typography
                            variant="h4"
                            color="#fff"
                            sx={{ ...style }}
                            onClick={() => handleMenuClick('/manageorder')}
                        >
                            Manage Users
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Container>

    )
}

export default (withRouter(Admin))