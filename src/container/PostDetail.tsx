import React from 'react';
import { RootState } from 'src/redux/types';
import * as H from 'history';
import { connect } from 'react-redux';
import { deletePost } from '../redux/actions/postActions';
import { match, Redirect } from 'react-router';


interface Params {
    id: string
}
interface LocationState {
    imageUrl: string,
    content: string
}
interface Props {
    match: match<Params>,
    location: H.Location<LocationState>,
    deletePost: (id: number) => void
}

const PostDetail: React.FC<Props> = ({ match, location, deletePost }) => {

    const handleDeletePost = () => {
        const numId = Number(match.params.id);
        deletePost(numId);
        history.back();
    }

    return (<div>
        <div><button onClick={() => history.back()}>戻る</button></div><br />
        <div><img src={location.state.imageUrl} width={200} /></div>
        <div>{location.state.content}</div>
        <button onClick={handleDeletePost}>削除</button>
    </div>);
}

export default connect((state: RootState) => ({}), { deletePost })(PostDetail);