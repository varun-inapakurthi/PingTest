import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userAction';
import { RESET_ERROR } from '../actionTypes/userActionTypes';
const Login = ({ history }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const user = useSelector(state => state.user)

    let { userInfo, error } = user

    const dispatch = useDispatch()

    useEffect(() => {
        if (userInfo) {
            history.push('/')
        }
    }, [userInfo, history])

    useEffect(() => {
        dispatch({
            type: RESET_ERROR
        })
    }, [])


    const loginHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }
    return (

        <div className="container" style={{ maxWidth: "30vw", border: "1px solid black", marginTop: "80px" }}>
            <h1 className="text-center">Login</h1>
            <form onSubmit={loginHandler} style={{ margin: "30px 0" }}>
                <div className="form-group">
                    <label >Email address</label>
                    <input type="email" className="form-control" aria-describedby="emailHelp" value={email} placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label >Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <button type="submit" disabled={!email.trim().length || !password.trim().length} onClick={loginHandler} className="btn btn-primary mx-auto">Login</button>
                {error && <div className="alert alert-danger mt-3" id="alert" role="alert">
                    {error}
                </div>}
            </form>

        </div>

    );
}

export default Login;