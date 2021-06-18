//Reducer function
const reducer = (state, action) => {
    switch (action.type) {
        case "ADDTOCART":
            return {
                ...state,
                cart: state.cart.concat({
                    id: action.id,
                    title: action.title,
                    image: action.image,
                    price: action.price,
                    rating: action.rating,
                    quantity: action.quantity,
                }),
            };
        case "REMOVE_ITEM":
            return {
                ...state,
                cart: state.cart.filter(
                    (item, index) => index !== action.index
                ),
            };
        case "DECREASEQUANTITY":
            return {
                ...state,
                cart: state.cart.map((item, index) => {
                    if (index === action.index) {
                        if (item.quantity > 0) {
                            item.quantity = item.quantity - 1;
                        }
                    }
                    return item;
                }),
            };
        case "ADDQUANTITY":
            return {
                ...state,
                cart: state.cart.map((item, index) => {
                    if (index === action.index) {
                        item.quantity = item.quantity + 1;
                    }
                    return item;
                }),
            };
        case "TOTALPRICE":
            return {
                ...state,
                totalPrice: action.total,
            };
        case "SETUSER":
            return {
                ...state,
                user: action.user,
            };
        case "EMPTY_CART":
            return {
                ...state,
                cart: [],
            };
        default:
            return {
                ...state,
            };
    }
};

export default reducer;
