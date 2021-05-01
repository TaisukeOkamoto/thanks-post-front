import React from 'react';
import { textColor } from '../style';
import styled from 'styled-components';

interface Props {
    text: string
    onClick: () => void,
    theme?: {
        padding?: string,
        bgColor?: string,
        textColor?: string,
        width?: string,
        weight?: string
    }
}

const Button: React.FC<Props> = (props) => {
    return (<ButtonStyle
        onClick={() => props.onClick()}
        theme={props.theme}>
        {props.text}
    </ButtonStyle>);
}

const ButtonStyle = styled.button`
    width: ${({ theme }) => theme.width};
    padding: ${({ theme }) => theme.padding};
    border-radius: 10px;
    background-color: ${({ theme }) => theme.bgColor};
    color: ${({ theme }) => theme.textColor};
    font-weight: ${({ theme }) => theme.weight};
`
ButtonStyle.defaultProps = {
    theme: {
        padding: "0",
        textColor: textColor,
        width: "auto",
        bgColor: "transparent",
        weight: "bold"
    }
}

export default Button;