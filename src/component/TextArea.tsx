import React, { useState } from 'react';
import styled from 'styled-components';
import { borderColor } from '../style';

interface Props {
    handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    value: string,
    theme?: {
        bgColor?: string,
        textColor?: string,
        width?: string,
    }
}

const TextArea: React.FC<Props> = (props) => {

    return (<>
        <InputStyle
            onChange={(e) => props.handleChange(e)}
            theme={props.theme}
            value={props.value} />
    </>)
}

const InputStyle = styled.textarea`
    height: 200px;
    width: ${({ theme }) => theme.width};
    padding: 16px;
    border-radius: 6px;
    background: ${({ theme }) => theme.bgColor};
    color: ${({ theme }) => theme.textColor};
    border: 1px solid ${borderColor}
`
InputStyle.defaultProps = {
    theme: {
        width: "100%",
        background: "#fff"
    }
}

export default TextArea;