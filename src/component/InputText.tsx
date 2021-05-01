import React, { useState } from 'react';
import styled from 'styled-components';
import { borderColor } from '../style';

interface Props {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    value: string,
    theme?: {
        bgColor?: string,
        textColor?: string,
        width?: string,
    }
}

const InputText: React.FC<Props> = (props) => {

    const [value, setValue] = useState("");

    return (<>
        <InputStyle
            type="text"
            onChange={(e) => props.handleChange(e)}
            theme={props.theme}
            value={props.value} />
    </>)
}

const InputStyle = styled.input`
    width: ${({ theme }) => theme.width};
    padding: 12px 16px;
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

export default InputText;