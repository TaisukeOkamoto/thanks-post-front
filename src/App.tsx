import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Post from './container/Post';
import Profile from './container/Profile';
import PostDetail from './container/PostDetail';
// import SignUp from './container/SignUp';
import { url } from './constants';
import Header from './container/Header';
import About from './container/About';
import Callback from './container/Callback';
import { RootState } from './redux/types';
import { connect } from 'react-redux';
import { login } from './redux/actions/sessionActions';
import { GlobalStyle } from './style';
import ProfileEdit from './container/ProfileEdit';

interface Props {
    isLoggedIn: boolean,
    login: () => void,
    isLoading: boolean,
}

interface RouteProps {
    exact?: boolean,
    path?: string,
    component: React.ComponentType<any>,
    isLoggedIn: boolean,
    isLoading: boolean
}

const PrivateRoute: React.FC<RouteProps> = ({ ...props }) => {

    if (props.isLoggedIn) {
        return <Route {...props} />
    } else {
        console.log("リダイレクト");
        return <Redirect to={url.about} />
    }
}

const App: React.FC<Props> = ({ isLoggedIn, login, isLoading }) => {

    useEffect(() => {
        console.log("isLoggedIn:" + isLoggedIn);
        if (!isLoggedIn) {
            login();
        } else {
        }
    }, [])

    return (
        <>
            <GlobalStyle />
            <Header />
            <Switch>
                {/* <Route exact path={url.singIn} component={SignIn} /> */}
                <Route exact path={url.about} component={About} />
                {/* <Route path={url.signup} component={SignUp} /> */}
                {/* <Route exact path="/" component={UserList} /> */}
                <Route exact path={url.callback} component={Callback} />
                <Route path={url.profile + ":id"} component={Profile} />
                <Route path={url.postDetail + ":id"} component={PostDetail} />
                <PrivateRoute path={url.profileEdit + ":id"} component={ProfileEdit}
                    isLoggedIn={isLoggedIn} isLoading={isLoading} />
                <PrivateRoute path={url.post} component={Post}
                    isLoggedIn={isLoggedIn} isLoading={isLoading} />
            </Switch>
        </>
    );
}

const mapStateToProps = (state: RootState) => {
    return {
        isLoggedIn: state.sessions.isLoggedIn,
        isLoading: state.sessions.isLoading,
    }
}

export default connect(mapStateToProps, { login })(App);