import React from 'react'
import {useContext, useReducer} from 'react'
import {products} from './data'
import reducer from './reducer'

//Creating app context
const AppContext = React.createContext()

//Default global state
const initialState = {
    products: products,
    cart: [],
    totalPrice: 0,
}

//App Provider
const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return(
        <AppContext.Provider
        value = {{
            ...state,
            dispatch
        }}>
            {children}
        </AppContext.Provider>
    )
}

//Custom hook for using AppContext
const useGlobalContext = () => {
    return useContext(AppContext)
}

export {useGlobalContext, AppProvider}