import React, { useEffect } from 'react';
import { PostItem, RootState } from '../redux/types';
import { connect } from 'react-redux';
import { fetchPost } from '../redux/actions/postActions';
import { match, withRouter, Link } from 'react-router-dom';
import { Url } from '../constants';

interface Params {
    id: string
}

interface Props {
    fetchPost: (id: number) => void,
    posts: PostItem[],
    match: match<Params>,
    isLoading: boolean
}

const Profile: React.FC<Props> = ({ fetchPost, posts, match, isLoading }) => {

    useEffect(() => {
        fetchPost(Number(match.params.id));
    }, [])

    const makePost = () => {
        console.log(posts);
        if (posts && posts.length) {
            return posts.map((post) => {
                return (
                    <div key={post.id}>
                        <div>{post.id}</div>
                        <Link to={{
                            pathname: Url.postDetail + post.id,
                            state: {
                                imageUrl: post.image_url,
                                content: post.content
                            }
                        }}>
                            <img src={post.image_url} width={200} />
                        </Link>
                    </div>
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
        <div>
            <button onClick={() => history.back()}>戻る</button>
            <h2>プロフィール</h2>
            <div>サンプルテキストサンプルテキストサンプルテキストサンプルテキスト</div>
            <Link to={"/post/" + match.params.id}>投稿する</Link>
            <h2>貰った商品</h2>
            <div> {isLoading ? "読み込んでいます..." : makePost()} </div>
        </div>
    )
}

const mapStateToProps = (state: RootState) => {
    return {
        posts: state.posts.postItems,
        isLoading: state.posts.isLoading
    }
}

export default withRouter(connect(mapStateToProps, { fetchPost })(Profile));