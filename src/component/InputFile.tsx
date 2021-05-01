
import React, { useState } from 'react';
import { url } from '../constants';
import styled from 'styled-components';
import { borderColor } from '../style';
import { useHistory } from 'react-router';
import Button from './Button';

interface Props {
    userId: string,
    reactRef: React.RefObject<HTMLInputElement>,
    fileUrl: string,
    setFileUrl: (imageUrl: string) => void,
    showThumbnail?: boolean,
    theme?: {
        bgColor?: string,
        textColor?: string,
        width?: string,
    }
}

const InputFile: React.FC<Props> = (props) => {

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files != null) {
            const imageUrl = URL.createObjectURL(e.target.files[0]);//fileのプレビュー用URLを作成
            props.setFileUrl(imageUrl);//プレビュー用URLをセット
            console.log(props.reactRef.current?.files);
        }
    }

    const handleDelete = () => {
        props.setFileUrl('')
        if (props.reactRef.current) {
            props.reactRef.current.value = "";
        }
    }

    return (<>
        <ButtonsArea>
            <UploadLabel htmlFor="fileUpload">
                フォルダからアップロード
            </UploadLabel>
            <Button
                text="キュー削除"
                onClick={() => handleDelete()}
                theme={{
                    bgColor: "#C18686",
                    textColor: "#fff",
                    weight: "bold",
                    padding: "12px 16px",
                    width: "120px"
                }}
            />
            <div>
                <input id="fileUpload" type="file" ref={props.reactRef} onChange={e => handleFile(e)} accept="image/*" hidden />
            </div>
        </ButtonsArea>
        <DragAndDropArea>
            <p>ファイルをここにドラッグ&amp;ドロップしてください（工事中...）</p>
        </DragAndDropArea>
        {props.showThumbnail && props.fileUrl ? <ImgThumbnail src={props.fileUrl} width={200} /> : ""}
    </>)
}

InputFile.defaultProps = {
    showThumbnail: true
}

const InputStyle = styled.input`
    width: ${({ theme }) => theme.width};
    padding: 12px 16px;
    border-radius: 6px;
    background: ${({ theme }) => theme.bgColor};
    color: ${({ theme }) => theme.textColor};
    border: 1px solid ${borderColor}
`
const UploadLabel = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 220px;
    font-weight: bold;
    background: #D9BC6F;
    border-radius: 10px;
    color: #fff;
    margin: 0 16px 0 0;
    padding: 10px;
`

const ButtonsArea = styled.div`
    display:flex;
`

const DragAndDropArea = styled.div`
    padding: 32px 0 0 0;
    width: 100%;
    > p {
        padding: 40px;
        font-weight: bold;
        background: #EAF2F7;
        color: #B5B0B0;
        text-align: center;
    }
`

const ImgThumbnail = styled.img`
    padding: 16px 0 0 0;
`


InputStyle.defaultProps = {
    theme: {
        width: "100%",
        background: "#fff"
    }
}

export default InputFile;