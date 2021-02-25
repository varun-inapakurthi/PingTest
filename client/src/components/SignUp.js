import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { login, register } from '../actions/userAction';
import { RESET_ERROR } from '../actionTypes/userActionTypes';
const SignUp = ({ history }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const user = useSelector(state => state.user)

    const dispatch = useDispatch()

    let { userInfo, error } = user;
    useEffect(() => {
        if (userInfo) {
            history.push('/')
        }
    }, [history, userInfo])
    useEffect(() => {
        dispatch({
            type: RESET_ERROR
        })
    }, [])
    const signinHandler = (e) => {
        e.preventDefault()
        dispatch(register(name, email, password))
    }
    return (

        <div className="container" style={{ maxWidth: "30vw", border: "1px solid black", marginTop: "80px" }}>
            <h1 className="text-center">Sign Up</h1>
            <form onSubmit={signinHandler} style={{ margin: "30px 0" }}>
                <div className="form-group">
                    <label >Name</label>
                    <input type="" className="form-control" value={name} placeholder="Enter Name" onChange={e => setName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label >Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label >Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <button type="submit" disabled={!name.trim().length || !email.trim().length || !password.trim().length} onClick={signinHandler} className="btn btn-primary mx-auto">Sign Up</button>
            </form>

            {error && <div className="alert alert-danger mt-3" id="alert" role="alert">
                {error}
            </div>}

        </div>

    );
}

export default SignUp;