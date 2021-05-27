import React from 'react'
import '../style/Error.css'
import {Link} from 'react-router-dom'

const Error = () => {
    return (
        <div className = 'error_container'>
            <h1 className = 'error_txt'>The page does not exist!</h1>
            <Link to = "/">
                <button className = 'error_btn'>Back to Home</button>
            </Link>
        </div>
    )
}

export default Error
