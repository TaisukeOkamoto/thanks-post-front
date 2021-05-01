import React, { createRef, useEffect, useRef, useState } from 'react';
import { LoginUser, PostItem, RootState, UserItem } from '../redux/types';
import { connect } from 'react-redux';
import { fetchPost } from '../redux/actions/postActions';
import { match, withRouter, Link } from 'react-router-dom';
import { url } from '../constants';
import styled from 'styled-components';
import { PageInner, section2Color, borderColor, titleBorderColor, Container } from '../style';
import { getProfile } from '../redux/actions/userActions';
import { MdSettings } from 'react-icons/md';
import noUser from '../assets/no_user.png'
import { TwitterShareButton, TwitterIcon } from 'react-share'

interface Params {
    id: string
}

interface Props {
    fetchPost: (id: string) => void,
    posts: PostItem[],
    match: match<Params>,
    isLoading: boolean,
    getProfile: (id: string) => void,
    user: UserItem,
    userId: string
}

const Profile: React.FC<Props> = ({ fetchPost, posts, match, isLoading, getProfile, user, userId }) => {

    // let refs: Array<React.MutableRefObject<HTMLCanvasElement | null>> = []
    // const refs = useRef({})
    // const refs = useRef(posts.map(() => createRef<HTMLCanvasElement | null>()))
    const [postElem, setPostElem]: any = useState(null);
    const ref = useRef<HTMLCanvasElement | null>(null);
    const refs = useRef<HTMLCanvasElement[] | null>([]);
    refs.current = [];
    const TRIM_SIZE = 200;

    const addToRefs = (el: HTMLCanvasElement | null) => {
        if (refs.current) {
            if (el && !refs.current.includes(el)) {
                console.log(el);
                refs.current.push(el);
            }
        }
    }

    useEffect(() => {
        if (!isLoading) {
            getProfile(match.params.id);
            fetchPost(match.params.id);
        }
    }, [user])

    // useEffect(() => {
    //     fetchPost(match.params.id);
    // }, [])

    useEffect(() => {
        setPostElem(makePost());
    }, [posts])

    useEffect(() => {
        setTimeout(() => {
            console.log("do");
            posts.map((post, i) => {
                console.log(refs.current);
                if (refs.current) {
                    const canvas = refs.current[i];
                    console.log(canvas);
                    const ctx: CanvasRenderingContext2D | null = canvas ? canvas.getContext('2d') : null;
                    if (ctx) {
                        // 画像読み込み
                        const chara = new Image();
                        chara.src = post.image_url  // 画像のURLを指定
                        console.log(post.image_url);
                        chara.onload = () => {

                            // 横長か縦長かで場合分けして描画位置を調整
                            let width = 0
                            let height = 0
                            let xOffset = 0
                            let yOffset = 0
                            if (chara.width > chara.height) {
                                height = TRIM_SIZE;
                                width = chara.width * (TRIM_SIZE / chara.height);
                                xOffset = -(width - TRIM_SIZE) / 2;
                                yOffset = 0;
                            } else {
                                width = TRIM_SIZE;
                                height = chara.height * (TRIM_SIZE / chara.width);
                                yOffset = -(height - TRIM_SIZE) / 2;
                                xOffset = 0;
                            }
                            ctx.drawImage(chara, xOffset, yOffset, width, height);
                            // ctx.drawImage(chara, 0, 0, 200, 200);
                        };
                    }
                }
            })
        }, 200)
    }, [posts, refs.current])

    // const setRef = (ref: React.MutableRefObject<HTMLCanvasElement | null>) => {
    //     refs.push(ref);
    // };

    const makePost = () => {
        console.log(posts);
        if (posts && posts.length) {
            return posts.map((post, i) => {
                return (
                    <PostWrap key={post.id}>
                        {/* <div>{post.id}</div> */}
                        <Link to={{
                            pathname: url.postDetail + post.id,
                            state: {
                                imageUrl: post.image_url,
                                content: post.content,
                                givenUserId: match.params.id,
                                title: post.title,
                                date: post.date,
                                person: post.person
                            }
                        }}>
                            <img src={post.image_url} style={{ display: 'none' }} />
                            <canvas ref={addToRefs} width={TRIM_SIZE} height={TRIM_SIZE}></canvas>
                        </Link>
                    </PostWrap>
                )
            })
        } else {
            return (
                <>
                    投稿はありません
                </>
            )
        }
    }

    return (
        <Container>
            <PageInner>
                <TopImgArea>
                    <ProfileImgWrap>
                        <ProfileImg src={user.imageUrl ? user.imageUrl : noUser} />
                    </ProfileImgWrap>
                    <div>{user.name ? user.name : ""}</div>
                    {userId == match.params.id ?
                        <>
                            <EditArea>
                                <Link to={url.profileEdit + userId}>
                                    <MdSettings />
                                </Link>
                            </EditArea>
                            <TwitterArea>
                                <TwitterShareButton
                                    title="Amazon欲しいものリストに登録しました！よかったらプレゼントしてもらえると嬉しいです！"
                                    url={location.href}>
                                    <TwitterIcon size={28} round />
                                </TwitterShareButton>
                            </TwitterArea>
                        </>
                        : ""}
                </TopImgArea>
                <ProfileArea>
                    <ProfileTitle>プロフィール</ProfileTitle>
                    <ProfileText>{user.profileText ? user.profileText : "プロフィールを記載してください"}</ProfileText>
                </ProfileArea>
                <ProfileArea>
                    <ProfileTitle>貰った商品</ProfileTitle>
                    <PostArea> {isLoading ? "読み込んでいます..." : postElem} </PostArea>
                </ProfileArea>
                <ProfileArea>
                    <ProfileTitle>欲しいものリスト</ProfileTitle>
                    <ProfileText>{user.listUrl ? user.listUrl : "欲しいものリストを登録してください"}</ProfileText>
                </ProfileArea>
            </PageInner>
        </Container >
    )
}

const TopImgArea = styled.div`
    position: relative;
    text-align: center;
    padding: 0 0 16px 0;
`

const ProfileArea = styled.div`
    padding: 32px 0;
`

const ProfileTitle = styled.h3`
    padding: 0 0 8px 0;
    border-bottom: 1px solid ${titleBorderColor};
`

const ProfileText = styled.p`
    padding: 16px 0;
`
const ProfileImgWrap = styled.div`
    width: 130px;
    margin: 0 auto;
`

const ProfileImg = styled.img`
    width: 100%;
    border-radius: 50%;
    padding: 0 0 8px 0;
`

const EditArea = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    font-size: 25px;
`

const TwitterArea = styled.div`
    position: absolute;
    top: 0;
    right: 40px;
`

const PostArea = styled.div`
    padding: 16px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
`

const PostWrap = styled.div`
padding:0 5px 10px 5px;
`

const mapStateToProps = (state: RootState) => {
    return {
        posts: state.posts.postItems,
        isLoading: state.posts.isLoading,
        user: state.users.userItem,
        userId: state.sessions.userId
    }
}

export default withRouter(connect(mapStateToProps, { fetchPost, getProfile })(Profile));