import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createUser } from '../redux/actions/userActions';

interface Props {
    createUser: (name: string, email: string, password: string) => void
}

const SignUp: React.FC<Props> = ({ createUser }) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = () => {
        console.log("test");
        createUser(name, email, password)
    }

    return (
        <div>
            <div>名前:<input type="text" onChange={(e) => setName(e.target.value)} value={name} /></div>
            <div>メール:<input type="email" onChange={(e) => setEmail(e.target.value)} value={email} /></div>
            <div>パスワード:<input type="password" onChange={(e) => setPassword(e.target.value)} value={password} /></div>
            <button onClick={handleSubmit}>登録</button>
        </div >
    );
}

export default connect((state) => (state), { createUser })(SignUp);