import * as React from 'react';

import { connect } from 'react-redux'

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import Typography from '@mui/material/Typography';

import Navigation from './Navigation';
import NavigationMain from './NavigationMain';

import RestaurantMenuRoundedIcon from '@mui/icons-material/RestaurantMenuRounded';
import Fab from '@mui/material/Fab';

import './header.css'

const mapStateToProps = state => {
    return {
        token: state.authState.token,
        cartItems: state.cartState.cartItems
    }
}



const Header = (props) => {
    //console.log(props);
    const { history } = props;

    const theme = useTheme();
    const isMobileBreakpoints = useMediaQuery(theme.breakpoints.down('sm'));
    //console.log(isMobileBreakpoints);



    return (
        <AppBar position="static" sx={{
            bgcolor: 'transparent',
            boxShadow: 0,
            lineHeight: '5',
            borderBottom: 1,
            borderColor: '#EAEEF3'
        }} >

            <Toolbar>
                <Typography variant="h6" component="div" className="headerMain" sx={{ flexGrow: 1, }}>
                    <Fab
                        size="medium"
                        aria-label="Resturent"
                        href='/'
                        sx={{
                            color: '#fff',
                            bgcolor: '#007FFF',
                            "&:hover": { bgcolor: '#007FFF' }
                        }}
                    >
                        <RestaurantMenuRoundedIcon />
                    </Fab>
                </Typography>

                <div>
                    {isMobileBreakpoints ? (<> <Navigation  key={props.token} token={props.token} /> </>) : (<> <NavigationMain key={props.token} token={props.token} cartLength={props.cartItems? props.cartItems.length : null}  /> </>)
                    }
                </div>
            </Toolbar>

        </AppBar>
    );
}

export default connect(mapStateToProps, null)(Header)