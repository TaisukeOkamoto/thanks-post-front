import React from 'react';
import { Link } from 'react-router-dom';
import { Url } from '../constants';

interface Props { }

export const Header: React.FC<Props> = (props) => {
    return (
        <div>
            <ul>
                <li><Link to={Url.singIn}>ログイン</Link></li>
                <li><Link to={Url.about}>Thanks Postとは</Link></li>
                <li><Link to={Url.signup}>サインアップ</Link></li>
            </ul>
        </div >
    );
}
