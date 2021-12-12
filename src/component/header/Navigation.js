import * as React from 'react';

import { NavLink } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Fab from '@mui/material/Fab';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { withRouter } from 'react-router-dom';

const Navigation = props => {
    //console.log(props)

    const { history } = props;

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClick = pageUrl => {
        history.push(pageUrl)
        setAnchorEl(null);
    };

    let nav = null;
    if (props.token == null) {
        nav = (
            <MenuItem onClick={() => handleMenuClick('/login')}>Login</MenuItem>
        )
    } else {
        nav = (
            <div>
                <MenuItem onClick={() => handleMenuClick('/')}>Home</MenuItem>
                <MenuItem onClick={() => handleMenuClick('/menu')}>Menu</MenuItem>
                <MenuItem onClick={() => handleMenuClick('/build')}>Customize Burger</MenuItem>
                <MenuItem onClick={() => handleMenuClick('/contact')}>Contact</MenuItem>
            </div>
        )
    }

    return (
        <div>

            <Fab
                size="medium"
                aria-label="Resturent"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                className="menuAppbar"
                sx={{
                    bgcolor: '#007FFF',
                    color: '#fff',
                    "&:hover": { bgcolor: '#007FFF' }
                }}
            >
                <MenuIcon />
            </Fab>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                {nav}
            </Menu>
        </div>
    )
}

export default withRouter(Navigation)