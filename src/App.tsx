import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Post from './container/Post';
import Profile from './container/Profile';
import UserList from './container/UserList';
import PostDetail from './container/PostDetail';
import SignIn from './container/SignIn';
import SignUp from './container/SignUp';
import MailLinkedTemplate from './container/MailLinkedTemplate';
import { Url } from './constants';
import { Header } from './container/Header';
import { About } from './container/About';

interface Props { }

const App: React.FC<Props> = (props) => {
    return (
        <>
            <Header />
            <Switch>
                <Route exact path={Url.singIn} component={SignIn} />
                <Route path={Url.about} component={About} />
                <Route path={Url.mailLinkedTemplate} component={MailLinkedTemplate} />
                <Route path={Url.signup} component={SignUp} />
                {/* <Route exact path="/" component={UserList} /> */}
                <Route path={Url.profile + ":id"} component={Profile} />
                <Route exact path={Url.post + ":id"} component={Post} />
                <Route path={Url.postDetail + ":id"} component={PostDetail} />
            </Switch>
        </>
    );
}

export default App;