import React, { useState } from 'react';
import styled from 'styled-components';
import { borderColor } from '../style';

interface Props {
    width?: string,
    theme?: {
        bgColor?: string,
        textColor?: string,
    },
    value: string,
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    selectList: Array<string>
}

const Select: React.FC<Props> = (props) => {

    return (<SelectWrap>
        <SelectStyle
            theme={props.theme}
            value={props.value}
            onChange={(e) => props.onChange(e)}
        >
            {props.selectList.map((select, index) => {
                return <option value={select} key={index}>{select}</option>
            })}
        </SelectStyle>
        <Arrow></Arrow>
    </SelectWrap>)
}

const SelectStyle = styled.select`
    width: 100%;
    padding: 12px 16px;
    border-radius: 6px;
    background: ${({ theme }) => theme.bgColor};
    color: ${({ theme }) => theme.textColor};
    border: 1px solid ${borderColor};
`

const SelectWrap = styled.div`
    position: relative;
    width: 100%;
`
const Arrow = styled.div`
    position: absolute;
    top: 50%;
    right: 10px;
    transform:translate(0,-50%);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 10px 10px 0 10px;
    border-color: #737373 transparent transparent transparent;
    border-radius: 2px;
`

SelectStyle.defaultProps = {
    theme: {
        width: "100%",
        background: "#fff"
    }
}

export default Select;