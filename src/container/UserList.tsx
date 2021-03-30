// import React, { useEffect, useState } from 'react';
// import { connect } from 'react-redux';
// import { RootState, UserItem, UserState } from '../redux/types';
// import { fetchUsers, deleteUser, createUser } from '../redux/actions/userActions';
// import { Link, withRouter } from 'react-router-dom';
// import firebase from '../firebaseConfig';

// type Props = {
//     users: Array<UserItem>,
//     isLoading: boolean,
//     fetchUsers: () => void,
//     deleteUser: (id: number) => void,
//     createUser: (name: string, email: string) => void,
//     message: string,
// }

// const UserList: React.FC<Props> = ({ users, isLoading, message, fetchUsers, deleteUser, createUser }) => {

//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     useEffect(() => {
//         fetchUsers();
//     }, [])

//     const handleDelete = (id: number) => {
//         deleteUser(id);
//     }

//     const checkSignInUser = () => {
//         firebase.auth().onAuthStateChanged(function (user) {
//             if (user) {
//                 console.log(user);
//             } else {
//                 console.log("ユーザーはいません");
//             }
//         });
//     }

//     const handleCreateUser = () => {
//         firebase.auth().createUserWithEmailAndPassword(email, password)
//             .then((data) => {
//                 console.log(data.user?.uid);
//                 console.log(data.user?.providerId);
//                 createUser(name, email);
//             })
//             .catch((error) => {
//                 console.log(error);
//                 var errorCode = error.code;
//                 var errorMessage = error.message;
//                 // ..
//             });
//     }

//     const logout = () => {
//         firebase.auth().signOut().then(() => {
//             console.log("ログアウトしました");
//         }).catch((error) => {
//             console.log("ログアウトに失敗しました");
//         });
//     }

//     const makeUserList = () => {
//         if (message) {
//             alert(message);
//         }
//         if (users && users.length) {
//             return users.map((user, index) => {
//                 return (
//                     <div key={index}>
//                         <div>{user.id}</div>
//                         <div>{user.name}</div>
//                         <div>{user.email}</div>
//                         <div>
//                             <button onClick={() => handleDelete(user.id)}>削除する</button>
//                             <Link to={"/profile/" + user.id}>プロフィール</Link>
//                         </div>
//                     </div>
//                 )
//             })
//         } else {
//             return (<p>ユーザーはありません</p>)
//         }
//     }
//     return (
//         <>
//             <button onClick={logout}>ログアウト</button>
//             <h3>ここにユーザー一覧</h3>
//             <div>名前：<input type="text" onChange={(e) => setName(e.target.value)} value={name} /></div>
//             <div>メールアドレス：<input type="email" onChange={(e) => setEmail(e.target.value)} value={email} /></div>
//             <div>パスワード<input type="password" onChange={(e) => setPassword(e.target.value)} value={password} /></div>
//             <button onClick={handleCreateUser}>新規ユーザー作成</button>
//             <br /><br />
//             {isLoading ? "読み込んでいます..." : makeUserList()}
//         </>
//     );
// }

// const mapStateToProps = (state: RootState) => {
//     const users = state.users.userItems;
//     const isLoading = state.users.isLoading;
//     const message = state.users.message;
//     return { users, isLoading, message }
// }


// export default connect(mapStateToProps, { fetchUsers, deleteUser, createUser })(UserList);

import React from 'react';

interface Props { }

const UserList: React.FC<Props> = (props) => {
    return <div></div>;
}

export default UserList;
