import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import {auth} from '../firebase'
import '../style/Login.css'

const Login = () => {
    //To redirect to home after login
    const history = useHistory()

    //States for email, pass
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    //Sign in logic
    const signIn = (e) => {
        e.preventDefault()
        //firebase login functionality with email and pass
        auth.signInWithEmailAndPassword(email, pass).then(
            (auth) => {
                if(auth){
                    history.push('/')
                }
            }
        ).catch((error) => console.log(error))
    }

    //New account logic
    const register = (e) => {
        //Prevent page refresh
        e.preventDefault()
        //Create user with email and password
        auth.createUserWithEmailAndPassword(email, pass).then(
            (auth) => {
                console.log(auth)
                if(auth){
                    history.push('/')
                }
            }
        ).catch((error) => console.log(error))
    }

    return (
        <div className = 'login'>
            <Link to = '/'>
                <img className = 'login_logo'
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png" 
                alt="logo" />
            </Link>
            <div className="login_container">
                <h1>Sign in</h1>
                <form action="">
                    <h5>E-mail</h5>
                    <input 
                    type="text" 
                    value = {email}
                    onChange = {(e) => {
                        setEmail(e.target.value)
                    }}/>
                    <h5>Password</h5>
                    <input 
                    type="password" 
                    value = {pass}
                    onChange = {(e) => {
                        setPass(e.target.value)
                    }}/>

                    <button 
                    type = 'submit' 
                    className = 'login_signBtn'
                    onClick = {signIn}>Sign in</button>
                </form>
                <p>
                    By signing-in you agree to Conditions, Cookies 
                    and all that shenanigans.
                </p>

                <button 
                className = 'login_regBtn'
                onClick = {register}>Create your Amazon Account</button>
            </div>
        </div>
    )
}

export default Login
