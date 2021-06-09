import React from 'react'
import '../style/Header.css'
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Link, useHistory} from 'react-router-dom'
import { useGlobalContext } from '../context';
import {auth} from '../firebase'

const Header = () => {

    const {user, cart} = useGlobalContext()

    const history = useHistory()

    const handleAuth = () => {
        if(user){
            auth.signOut()
        }
        else{
            history.push('/login')
        }
    }

    return (
        <section className = 'header'>
            <Link to = "/">
                <img className = 'header_logo'
                src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" 
                alt="logo"/>
            </Link>

            {/* Header search */}
            <div className="header_search">
                <input className = 'header_searchInput' 
                type="text" />
                <SearchIcon className = 'header_searchIcon'/>
            </div>

            {/* Header navigation */}
            <div className="header_nav">
                {/* Sign In */}
                <div className = 'header_opts'>
                    <span className = 'header_optsLineOne'>
                        {user ? `${user.email}` : 'Guest'}
                    </span>

                    <span className = 'header_optsLineTwo_sign'
                    onClick = {handleAuth}>
                        {user ? 'Log out' : 'Log in'}
                    </span>
                </div>
                {/* Returns & orders */}
                <div className = 'header_opts'>
                    <span className = 'header_optsLineOne'>
                        Returns
                    </span>
                    <span className = 'header_optsLineTwo'>
                        & Orders
                    </span>
                </div>
                {/* Prime */}
                <div className = 'header_opts'>
                    <span className = 'header_optsLineOne'>
                        Your
                    </span>
                    <span className = 'header_optsLineTwo'>
                        Prime
                    </span>
                </div>
                {/* Shopping Cart */}
                <Link className = 'header_cartLink' to = "/checkout">
                    <div className="header_optsCart">
                        <ShoppingCartIcon />
                        <span className = 'header_optsLineTwo header_cartCount'>
                            {cart.length}
                        </span>
                    </div>
                </Link>
            </div>
        </section>
    )
}

export default Header
