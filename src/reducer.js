//Reducer function
const reducer = (state, action) => {
    switch (action.type) {
        case "ADDTOCART":
            return{
                ...state,
                cart: state.cart.concat({
                    id: action.id,
                    title: action.title,
                    image: action.image,
                    price: action.price,
                    rating: action.rating
                })
            }
        case 'REMOVE_ITEM':
            return{
                ...state,
                cart: state.cart.filter((item) => item.id !== action.id)
            }
        case "TOTALPRICE":
            return{
                ...state,
                totalPrice: action.total
            }
        default:
            return{
                ...state
            }
    }
}

export default reducer