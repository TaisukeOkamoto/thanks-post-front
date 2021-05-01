import React, { useState } from 'react';
import { Link, match, useHistory, withRouter } from 'react-router-dom';
import { CustomFormData, RootState } from '../redux/types';
import { connect } from 'react-redux';
import { uploadPost } from '../redux/actions/postActions';
import styled from 'styled-components';
import { PageInner, section2Color, titleBorderColor, ContentsTitle, Container } from '../style';
import InputText from '../component/InputText';
import Select from '../component/Select';
import InputFile from '../component/InputFile';
import { url } from '../constants';
import TextArea from '../component/TextArea';
import Button from '../component/Button';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'moment';


interface Props {
    message: string,
    uploadPost: (formData: CustomFormData) => void,
    userId: string
}

const ProfileEdit: React.FC<Props> = ({ message, uploadPost, userId }) => {

    const selectList = ["友達", "twitterフォロワー", "その他（友達、twitterフォロワー以外）"]


    const [content, setContent] = useState("");
    const history = useHistory();
    const file_input = React.createRef<HTMLInputElement>();
    const [presentTitle, setPresentTitle] = useState("");
    const [dateValue, setDateValue]: any = useState(new Date());
    const [fileUrl, setFileUrl] = useState("");
    const [selectValue, setSelectValue] = useState(selectList[0]);

    const handleSubmit = () => {
        if (
            file_input &&
            file_input.current &&
            file_input.current.files &&
            file_input.current.files.length > 0
        ) {
            if (content && presentTitle && dateValue && selectValue) {
                const formatDate = Moment(dateValue).format('YYYYMMDDHHMMSS');
                const submitData: CustomFormData = new FormData();
                submitData.append("image", file_input.current.files[0])
                submitData.append("content", content);
                submitData.append("title", presentTitle);
                submitData.append("date", formatDate);
                submitData.append("person", selectValue);

                uploadPost(submitData)

                history.push(url.profile + userId);
            }
        }
    }

    return (
        <>
            <Container>
                <PageInner>
                    <PostWrap>
                        <PostTitle>プレゼントされて嬉しかった気持ちを書き込む</PostTitle>
                    </PostWrap>
                    <PostTitleWrap>
                        <ContentsTitle>貰ったもの</ContentsTitle>
                        <InputText
                            handleChange={(e) => setPresentTitle(e.target.value)}
                            value={presentTitle}
                        />
                    </PostTitleWrap>
                    <PostTitleWrap>
                        <ContentsTitle>貰った日付</ContentsTitle>
                        <DateWrapper>
                            <DatePicker
                                dateFormat="yyyy/MM/dd"
                                wrapperClassName="datePicker"
                                selected={dateValue}
                                onChange={date => setDateValue(date)}
                                filterDate={(date) => {
                                    return new Date() > date;
                                }}
                            />
                        </DateWrapper>
                    </PostTitleWrap>
                    <PostTitleWrap>
                        <ContentsTitle>プレゼントをくれた人</ContentsTitle>
                        <SelectWrap>
                            <Select
                                theme={{ bgColor: "#fff" }}
                                selectList={selectList}
                                value={selectValue}
                                onChange={(e) => setSelectValue(e.target.value)}
                            />
                        </SelectWrap>
                    </PostTitleWrap>
                    <PostTitleWrap>
                        <ContentsTitle>プレゼントの画像を添付してください</ContentsTitle>
                        <InputFile userId={userId} reactRef={file_input} fileUrl={fileUrl} setFileUrl={setFileUrl} />
                    </PostTitleWrap>
                    <PostTitleWrap>
                        <ContentsTitle>プレゼントされた時の気持ちを書いてください</ContentsTitle>
                        <TextArea handleChange={(e) => setContent(e.target.value)} value={content} />
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

const DateWrapper = styled.div`
 input {
    width: 100%;
    padding: 12px 16px;
    border-radius: 6px;
    background: #fff;
    border: 1px solid #d0d7d8;
 }
`

const SelectWrap = styled.div`
    width: 200px;
`

const SubmitArea = styled.div`
    text-align: center;
`

const mapStateToProps = (state: RootState) => {
    return {
        message: state.posts.message,
        userId: state.sessions.userId
    }
}

export default withRouter(connect(mapStateToProps, { uploadPost })(ProfileEdit))