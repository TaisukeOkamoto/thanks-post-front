import axios from 'axios';
import React, { useState } from 'react';
import { Link, match, withRouter } from 'react-router-dom';
import { CustomFormData, RootState } from 'src/redux/types';
import { connect } from 'react-redux';
import { uploadPost } from '../redux/actions/postActions';

interface Params {
    id: string
}

interface Props {
    match: match<Params>,
    message: string,
    uploadPost: (formData: CustomFormData) => void
}

const Post: React.FC<Props> = ({ match, message, uploadPost }) => {

    const [content, setContent] = useState("");
    const [fileUrl, setFileUrl] = useState("");

    const file_input = React.createRef<HTMLInputElement>();


    const handleSubmit = () => {
        if (
            file_input &&
            file_input.current &&
            file_input.current.files &&
            file_input.current.files.length > 0
        ) {
            const submitData: CustomFormData = new FormData();
            submitData.append("image", file_input.current.files[0])
            submitData.append("id", match.params.id);
            submitData.append("content", content);

            uploadPost(submitData)
        }
    }

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target.files != null) {
            const imageUrl = URL.createObjectURL(e.target.files[0]);//fileのプレビュー用URLを作成
            setFileUrl(imageUrl);//プレビュー用URLをセット
        }

    }

    return (
        <>
            <h2>ポストページ</h2>
            <div>ユーザーID:{match.params.id}</div>
            <div><textarea onChange={(e) => setContent(e.target.value)} value={content} /></div>
            <div><input type="file" ref={file_input} onChange={e => handleFile(e)} accept="image/*" /></div>
            <div><img src={fileUrl} width={200} /></div>
            <div><button onClick={() => handleSubmit()}>送信</button></div><br />
            <button onClick={() => history.back()}>戻る</button>
        </>
    );
}

const mapStateToProps = (state: RootState) => {
    return {
        message: state.posts.message
    }
}

export default withRouter(connect(mapStateToProps, { uploadPost })(Post))