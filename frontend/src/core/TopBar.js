import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import History from '@material-ui/icons/History';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Home from '@material-ui/icons/Home';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Button } from '@material-ui/core';
import { signout, isAuthenticate } from '../auth/apiAuth'


import { Link, withRouter } from 'react-router-dom'
import './TopBar.css'



const useStyles = makeStyles((theme) => ({

    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: '500px',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));


const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return 'menu-items-active';
    }
    return 'menu-items';
}



const TopBar = (props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>
                <Link className='nav-link sub-menu' to='/profile'> Profile
                </Link></MenuItem>
            <MenuItem onClick={handleMenuClose}>
                <span className='nav-link sub-menu'
                    onClick={() => signout(() => {
                        props.history.push("/");
                    })}
                >Sign out
                </span>
            </MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge color="secondary">
                        <AccountCircle />
                    </Badge>
                </IconButton>
                <p>Account</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge color="secondary">
                        <History />
                    </Badge>
                </IconButton>
                <p>History purchse</p>
            </MenuItem>
            <MenuItem onClick={handleMobileMenuClose}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <ExitToApp />
                </IconButton>
                <span className='nav-link sub-menu'
                    onClick={() => signout(() => {
                        props.history.push("/");
                    })}
                >Sign out
                </span>
            </MenuItem>
        </Menu>
    );



    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <Link to='/' className='menu-items'><Home /> Home</Link>
                    </IconButton>
                    {/* <Typography className={classes.title} variant="h6" noWrap>
                        <ul className="nav nav-tab menu-list" >
                            {!isAuthenticate() &&
                                <React.Fragment>
                                    <li className="nav-link">
                                        <Link className={isActive(props.history, '/')} to="/" >HOME</Link>
                                    </li>
                                    <li className="nav-link">
                                        <Link className={isActive(props.history, '/signin')} to="/signin" >SIGN IN</Link>
                                    </li>
                                    <li className="nav-link">
                                        <Link className={isActive(props.history, '/signup')} to="/signup" >SIGN UP</Link>
                                    </li>
                                </React.Fragment>
                            }
                            {isAuthenticate() &&
                                <React.Fragment>
                                    <li className='nav-link'>
                                        <Link className={isActive(props.history, '/profile')} to="/profile">
                                            PROFILE
                                        </Link>
                                    </li>
                                    <li className='nav-link'>
                                        <Link className={isActive(props.history, '/histoy-purchse')} to="/histoy-purchse">
                                            HISTORY PURCHASE </Link>
                                    </li>

                                    <li className="nav-link">
                                        <span className='nav-link sign-out '
                                            onClick={() => signout(() => {
                                                props.history.push("/");
                                            })}
                                        >SIGN OUT
                                </span>
                                    </li>
                                </React.Fragment>}
                        </ul>

                    </Typography> */}
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        {!isAuthenticate() &&
                            <React.Fragment>
                                <Link className='mr-3' to='/signin'>
                                    <IconButton
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-controls={menuId}
                                        aria-haspopup="true"
                                        color="inherit"
                                        className="menu-items"
                                    >
                                        Sign in
                                </IconButton>
                                </Link>
                                <Link className='mr-3' to='/signup'>
                                    <IconButton

                                        edge="end"
                                        aria-label="account of current user"
                                        aria-controls={menuId}
                                        aria-haspopup="true"
                                        color="inherit"
                                        className="menu-items"
                                    >
                                        Sign up
                                </IconButton>
                                </Link>
                            </React.Fragment>}
                        {isAuthenticate() &&
                            <React.Fragment>
                                <IconButton
                                    className='mr-3'
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    color="inherit"
                                >
                                    <Link className="menu-items" to='/history-purchase'> <History /> History purchase</Link>
                                </IconButton>
                                <IconButton
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="inherit"
                                >
                                    <div className="menu-items">  <AccountCircle /> Account</div>


                                </IconButton>
                            </React.Fragment>}

                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}


        </div>

    );
}

export default withRouter(TopBar);
