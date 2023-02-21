import { createStore,combineReducers,applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension' ;
import { productReducer,productDetailsReducer, newReviewReducer, newProductReducer,deleteProductReducer, productReviewsReducer, reviewReducer } from "./reducers/productReducer";
import { profileReducer, userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from "./reducers/orderReducer";


const reducer = combineReducers({
    products :productReducer,
    productDetails : productDetailsReducer,
    user : userReducer ,
    profile : profileReducer,
    cart :cartReducer,
    newOrder:newOrderReducer,
    myOrders:myOrdersReducer,
    orderDetails:orderDetailsReducer,
    newReview:newReviewReducer,
    newProduct:newProductReducer,
    deleteProduct: deleteProductReducer,
    allOrders:allOrdersReducer,
    order:orderReducer ,
    productReviews: productReviewsReducer,
    review:reviewReducer
});

let initialState = {
    cart: {

        cartItems :localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],

        shippingInfo:localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : {},
    }
} ;

const middleware = [thunk] ;

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store ;