import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { url } from '../constants';
import { lock } from '../lock';
import { connect } from 'react-redux';
import { RootState } from 'src/redux/types';
import styled from 'styled-components';
import { GlobalStyle, pcSizeWidth, PageInner, borderColor, textColor } from '../style';
import Button from '../component/Button';
import { logout } from '../redux/actions/sessionActions';
import Logo from '../assets/logo';
import { Button as ButtonUi } from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { MdBorderBottom } from 'react-icons/md';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';


interface Props {
    isLoggedIn: boolean,
    userId: string,
    logout: (redirectUrl: string, isLogin: boolean, userId: string) => void,
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        background: "#fff",
        boxShadow: 'none',
        borderBottom: `1px solid ${borderColor}`
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
    },
    title: {
        flexGrow: 1,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    },
    content: {
        flexGrow: 1,
        // padding: theme.spacing(3),
        padding: 0,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
    },
}));

const Header: React.FC<Props> = ({ isLoggedIn, userId, logout }) => {

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleClickAway = () => {
        setOpen(false);
    }

    const login = () => {
        lock.show()
        setOpen(false)
    }

    const doLogout = () => {
        logout(window.location.origin, isLoggedIn, userId)
        setOpen(false)
    }

    const menus = () => {
        return (
            <Menus>
                {!isLoggedIn ? <li><Button onClick={() => login()} text="ログイン" theme={{ weight: "normal" }} /></li> : ""}
                {!isLoggedIn ? <li><Button onClick={() => login()} text="アカウント作成" theme={{ weight: "normal" }} /></li> : ""}
                <li><Link onClick={() => setOpen(false)} to={url.about}>Thanks Postとは</Link></li>
                {isLoggedIn ? <li><Link onClick={() => setOpen(false)} to={url.post + userId}>投稿する</Link></li> : ""}
                {isLoggedIn ? <li><Link onClick={() => setOpen(false)} to={url.profile + userId}>アカウント</Link></li> : ""}
                {isLoggedIn ? <li>
                    <Button
                        onClick={() => doLogout()}
                        text="ログアウト"
                        theme={{ padding: "0", bgColor: "transparent", textColor: textColor }}
                    />
                </li> : ""}
            </Menus>
        )
    }

    return (
        <>
            <ClickAwayListener onClickAway={handleClickAway}>
                <div className={classes.root}>
                    <CssBaseline />
                    <AppBar
                        position="fixed"
                        className={clsx(classes.appBar, {
                            [classes.appBarShift]: open,
                        })}
                    >
                        <Toolbar>
                            <Typography variant="h6" noWrap className={classes.title}>
                                <PageInner>
                                    <Menu>
                                        <LogoArea>
                                            <Link to={url.about}><Logo width={184} height={26} /></Link>
                                        </LogoArea>
                                        <PcMenu>{menus()}</PcMenu>
                                    </Menu>
                                </PageInner>
                            </Typography>
                            <MenuButtonHandler>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    edge="end"
                                    onClick={handleDrawerOpen}
                                    className={clsx(open && classes.hide)}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </MenuButtonHandler>
                        </Toolbar>
                    </AppBar>
                    <main
                        className={clsx(classes.content, {
                            [classes.contentShift]: open,
                        })}
                    >
                        <div className={classes.drawerHeader} />
                    </main>
                    <Drawer
                        className={classes.drawer}
                        variant="persistent"
                        anchor="right"
                        open={open}
                        classes={{
                            paper: classes.drawerPaper,
                        }}>
                        <div className={classes.drawerHeader}>
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                            </IconButton>
                        </div>
                        <Divider />
                        {/* メニュー内の記述は以下 */}
                        <List>
                            {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                            {/* <ListItemText primary={text} /> */}
                            {menus()}
                        </List>
                        {/* <Divider /> */}
                    </Drawer>
                </div>
            </ClickAwayListener>
        </ >
    );
}

const mapStateToProps = (state: RootState) => {
    return {
        isLoggedIn: state.sessions.isLoggedIn,
        userId: state.sessions.userId
    }
}

const LogoArea = styled.div`
    padding: 0 50px 0 0;
    svg {
        vertical-align: middle;
    }
`

const HeaderContainer = styled.div`
    height: 73px;
    background: #fff;
    display: flex;
    align-items: center;
    width: ${pcSizeWidth + 'px'};
    width: 100%;
    margin: 0 auto;
    padding: 16px;
    border-bottom: 1px solid ${borderColor};
`
const Menu = styled.ul`
    padding: 0;
    font-size: 16px;
    display: flex;
`
const PcMenu = styled.div`
    display: none;
    @media (min-width: 780px) {
        display: block;
    }
`
const Menus = styled.div`
     > li {
        padding: 12px;
     }
    @media (min-width: 780px) {
        display: flex;
        align-items: center;
        list-style: none;
        padding: 0;
        > li {
        padding: 0 0 0 20px;
        }
    }
`
const MenuButtonHandler = styled.div`
    display: block;
    @media (min-width: 780px) {
        display: none;
    }
`

export default connect(mapStateToProps, { logout })(Header);