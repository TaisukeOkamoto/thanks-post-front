import React, { useEffect } from 'react';
import { RootState, UserItem } from '../redux/types';
import * as H from 'history';
import { connect } from 'react-redux';
import { deletePost } from '../redux/actions/postActions';
import { match, Redirect, useHistory } from 'react-router';
import { url } from '../constants';
import styled from 'styled-components';
import { PageInner, section2Color, titleBorderColor, Container } from '../style';
import { isEmpty } from '../util/objectUtil';
import { getProfile } from '../redux/actions/userActions';
import Button from '../component/Button';
import noUser from '../assets/no_user.png'
import Moment from 'moment';
import { stringToDate } from '../util/DateUtil';

interface Params {
    id: string
}
interface LocationState {
    imageUrl: string,
    content: string,
    givenUserId: string,
    title: string,
    date: string,
    person: string,
}
interface Props {
    match: match<Params>,
    location: H.Location<LocationState>,
    deletePost: (id: number) => void,
    userId: string,
    isLoggedIn: boolean,
    getProfile: (userId: string) => void,
    user: UserItem
}

const PostDetail: React.FC<Props> = ({ match, location, deletePost, userId, isLoggedIn, getProfile, user }) => {

    //location.stateがpropsとして渡されていない場合はトップへリダイレクト（URL直打ちを防ぐ）
    if (location.state === undefined) {
        return <Redirect to={url.about} />
    }

    let history = useHistory();

    const handleDeletePost = () => {
        const numId = Number(match.params.id);
        deletePost(numId);
        history.push(url.profile + userId);
    }

    const makeDate = () => {
        const strDate = stringToDate(location.state.date)
        const formatDate = Moment(strDate).format('YYYY/MM/DD')
        return formatDate
    }

    useEffect(() => {
        getProfile(location.state.givenUserId);
    }, [])

    return (<div>
        <Container>
            <PageInner>
                <TitleArea>
                    <Title>{location.state.title}</Title>
                    <ContentArea>
                        <span>{makeDate()}</span>
                        <TitlePicture>
                            <ProfileImg>
                                <Recipient>もらった人</Recipient>
                                <img src={user.imageUrl ? user.imageUrl : noUser} />
                                <RecipientName>{user.name}</RecipientName>
                            </ProfileImg>
                            <img src={location.state.imageUrl} width={200} />
                        </TitlePicture>
                    </ContentArea>
                </TitleArea>
                <TitleArea>
                    <Title>もらった感想</Title>
                    <ContentArea>
                        <div>{location.state.content}</div>
                    </ContentArea>
                </TitleArea>
                <TitleArea>
                    <Title>このプレゼントをあげた人</Title>
                    <ContentArea>
                        <div>{location.state.person}</div>
                    </ContentArea>
                </TitleArea>
                {isLoggedIn ?
                    <DeleteButtonArea>
                        <Button
                            onClick={handleDeletePost}
                            theme={{
                                bgColor: "#C18686",
                                textColor: "#fff",
                                weight: "bold",
                                padding: "12px 16px",
                                width: "100px"
                            }}
                            text="削除" />
                    </DeleteButtonArea>
                    : ""}
            </PageInner>
        </Container>
    </div>);
}

const TitleArea = styled.div`
    padding: 32px 0;
`

const Title = styled.h3`
    padding: 0 0 8px 0;
    border-bottom: 1px solid ${titleBorderColor};
`

const ContentArea = styled.p`
    padding: 16px 0;
`
const ProfileImg = styled.div`
    padding: 0 8px 16px 0;
    margin: 0 auto;
    img {
        width: 130px;
        border-radius: 50%;
        padding: 0 8px 0 0;
    }
    @media (min-width: 480px) {
        margin: 0;
    }
`

const TitlePicture = styled.div`
    display: block;
    text-align: center;
    justify-content: center;
    padding: 16px 0 0 0;
    @media (min-width: 480px) {
        display: flex;
    }
`

const Recipient = styled.p`
    text-align:center;
    padding: 0 0 8px 0;
`

const RecipientName = styled.p`
    text-align:center;
`

const DeleteButtonArea = styled.div`
    text-align: center;
`

const mapStateToProps = (state: RootState) => {
    return {
        isLoggedIn: state.sessions.isLoggedIn,
        user: state.users.userItem,
        userId: state.sessions.userId
    }
}

export default connect(mapStateToProps, { deletePost, getProfile })(PostDetail);