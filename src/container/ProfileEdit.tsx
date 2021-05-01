import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Link, match, useHistory, withRouter } from 'react-router-dom';
import { CustomProfileFormData, RootState, UserItem } from '../redux/types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { PageInner, section2Color, titleBorderColor, ContentsTitle, Container } from '../style';
import InputText from '../component/InputText';
import InputFile from '../component/InputFile';
import { url } from '../constants';
import TextArea from '../component/TextArea';
import Button from '../component/Button';
import { updateProfile, getProfile } from '../redux/actions/userActions'
import Cropper from 'react-easy-crop'
import { FiAlertTriangle } from "react-icons/fi";
import { base64toBlob } from '../util/imageUtil';

interface Props {
    message: string,
    updateProfile: (id: string, formData: CustomProfileFormData) => void,
    getProfile: (id: string) => void,
    userId: string,
    user: UserItem,
    isLoading: boolean
}

const Post: React.FC<Props> = ({ updateProfile, getProfile, userId, user, isLoading }) => {

    const history = useHistory();
    const file_input = React.createRef<HTMLInputElement>();
    const [name, setName] = useState("");
    const [profileText, setProfileText] = useState("");
    const [listUrl, setListUrl] = useState(""); //Amazon欲しいものリスト
    const [fileUrl, setFileUrl] = useState("");
    const [crop, setCrop] = useState({ x: 0, y: 0 }) //画像トリミング
    const [zoom, setZoom] = useState(1) //canvas用
    const [croppedAreaPixels, setCroppedAreaPixels] = useState({ width: "", height: "" }); //canvas用
    const [canvasBlobData, setCanvasBlobData]: any = useState({}); //時間あればany型は修正
    const canvasRef = useRef<HTMLCanvasElement | null>(null);


    const handleSubmit = () => {
        const submitData: CustomProfileFormData = new FormData();
        if (
            file_input &&
            file_input.current &&
            file_input.current.files &&
            file_input.current.files.length > 0
        ) {
            submitData.append("avatar", canvasBlobData)
        }
        if (profileText) {
            submitData.append("profile_text", profileText);
        }
        if (name) {
            submitData.append("name", name);
        }
        if (listUrl) {
            submitData.append("list_url", listUrl);
        }
        updateProfile(userId, submitData)

        history.push(url.profile + userId);
    }

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        console.log(croppedArea, croppedAreaPixels)
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx: CanvasRenderingContext2D | null = canvas ? canvas.getContext('2d') : null;
            const image = document.getElementById('source') as HTMLCanvasElement;

            canvas.setAttribute('width', croppedAreaPixels.width);
            canvas.setAttribute('height', croppedAreaPixels.height);
            if (ctx) {
                ctx.drawImage(image, croppedAreaPixels.x, croppedAreaPixels.y, croppedAreaPixels.width, croppedAreaPixels.height, 0, 0, croppedAreaPixels.width, croppedAreaPixels.height);
                setCroppedAreaPixels(croppedAreaPixels);
            }

            var canvasData = canvas.toDataURL('image/png');
            var canvasBlob = base64toBlob(canvasData);
            console.log(canvasBlob);
            setCanvasBlobData(canvasBlob);
        }
    }, [])

    useEffect(() => {
        getProfile(userId);
    }, [])

    useEffect(() => {
        setName(user.name)
        setProfileText(user.profileText);
        setListUrl(user.listUrl);
    }, [user])

    return (
        <>
            <Container>
                <PageInner>
                    <PostWrap>
                        <PostTitle>プロフィールを編集する</PostTitle>
                    </PostWrap>
                    <PostTitleWrap>
                        <ContentsTitle>名前</ContentsTitle>
                        <InputText
                            handleChange={(e) => setName(e.target.value)}
                            value={name} />
                    </PostTitleWrap>
                    <PostTitleWrap>
                        <ContentsTitle>プロフィール</ContentsTitle>
                        <TextArea handleChange={(e) => setProfileText(e.target.value)} value={profileText} />
                    </PostTitleWrap>
                    <PostTitleWrap>
                        <ContentsTitle>プロフィール画像を添付してください</ContentsTitle>
                        <InputFile
                            userId={userId}
                            reactRef={file_input}
                            setFileUrl={setFileUrl}
                            fileUrl={fileUrl}
                            showThumbnail={false}
                        />
                    </PostTitleWrap>
                    {
                        fileUrl ?
                            <>
                                <CropArea>
                                    <img id="source" style={{ display: 'none' }} src={fileUrl} />
                                    <div style={{ display: 'none' }} >
                                        <canvas ref={canvasRef}></canvas>
                                    </div>
                                    <Cropper
                                        image={fileUrl}
                                        crop={crop}
                                        zoom={zoom}
                                        aspect={1 / 1}
                                        onCropChange={setCrop}
                                        onZoomChange={setZoom}
                                        onCropComplete={onCropComplete}
                                    />
                                </CropArea>
                                <CropComment>
                                    <CropIconArea>
                                        <FiAlertTriangle />
                                    </CropIconArea>
                                    画像の位置を調整してください
                                    </CropComment>
                            </>
                            : ""
                    }
                    <PostTitleWrap>
                        <ContentsTitle>Amazon欲しいものリストのURLを記載してください</ContentsTitle>
                        <InputText
                            handleChange={(e) => setListUrl(e.target.value)}
                            value={listUrl} />
                    </PostTitleWrap>
                    <SubmitArea>
                        <Button
                            onClick={() => handleSubmit()}
                            text="送信する"
                            theme={{
                                bgColor: "#5E719D",
                                textColor: "#fff",
                                width: "200px",
                                padding: "12px 16px",
                                weight: "bold"
                            }} />
                    </SubmitArea>
                </PageInner>
            </Container>
        </>
    );
}

const PostTitle = styled.h3`
    padding: 0 0 8px 0;
    border-bottom: 1px solid ${titleBorderColor};
`

const PostWrap = styled.div`
    padding: 32px 0;
`

const PostTitleWrap = styled.div`
    width: 100%;
    padding: 0 0 32px 0;
`

const SelectWrap = styled.div`
    width: 200px;
`

const SubmitArea = styled.div`
    text-align: center;
`

const CropArea = styled.div`
    height: 200px;
    width: 200px;
    position: relative;
`

const CropComment = styled.div`
    display: flex;
    align-items: flex-start;
    padding: 16px 0;
    color: #b90a0a;
`

const CropIconArea = styled.span`
    
`

const mapStateToProps = (state: RootState) => {
    return {
        message: state.posts.message,
        userId: state.sessions.userId,
        user: state.users.userItem,
        isLoading: state.users.isLoading
    }
}

export default withRouter(connect(mapStateToProps, { updateProfile, getProfile })(Post))