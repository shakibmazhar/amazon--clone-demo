import React, {useState} from 'react'
import {auth} from '../firebase'
import { useHistory, Link } from 'react-router-dom'
import '../style/Register.css'

const Register = () => {
    const history = useHistory()

    //Register states
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [displayName, setDisplayName] = useState('')

    //Register function
    const register = (e) => {
        e.preventDefault()

        //Create new user, then set display name
        auth.createUserWithEmailAndPassword(email, pass).then((auth) => {
            auth.user.updateProfile({
                displayName: displayName
            })
            if(auth) history.push('/')
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className = 'register'>
            <Link to = '/'>
                <img className = 'register_logo'
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png" 
                    alt="logo" />
            </Link>
            <div className="register_formDiv">
                <h1>Create a new account</h1>
                <form className = 'register_form'>

                    {/* Display Name */}
                    <h4>Display Name</h4>
                    <input type="text" value = {displayName} 
                    onChange = {(e) => setDisplayName(e.target.value)}/>

                    {/* Email */}
                    <h4>E-mail</h4>
                    <input type="text" value = {email} 
                    onChange = {(e) => setEmail(e.target.value)}/>

                    {/* Password */}
                    <h4>Password</h4>
                    <input type="password" value = {pass}
                    onChange = {(e) => setPass(e.target.value)} />

                </form>
                {/* Register button */}
                <button className="register_btn"
                onClick = {register}>
                    Register
                </button>
            </div>
        </div>
    )
}

export default Register
