import {
    LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAIL, 
    REGISTER_USER_REQUEST,REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,LOAD_USER_REQUEST,LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,LOGOUT_SUCCESS,LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,UPDATE_PROFILE_SUCCESS,UPDATE_PROFILE_FAIL,UPDATE_PROFILE_RESET,     
    UPDATE_PASSWORD_REQUEST,UPDATE_PASSWORD_SUCCESS,UPDATE_PASSWORD_RESET,UPDATE_PASSWORD_FAIL,
    CLEAR_ERRORS,


} from "../constants/userConstant"

export const userReducer = (state = {user:{}},action)=>{
    switch (action.type) {
// all cases for requests
        case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:
        case LOAD_USER_REQUEST:
            return{
                loading:true,
                isAuthenticated:false,
            };
// all cases for success
        case LOGIN_SUCCESS:
        case REGISTER_USER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return{
                ...state,
                loading:false,
                isAuthenticated:true,
                user:action.payload
            };
        case LOGOUT_SUCCESS:
            return{
                loading:false,
                user:null,
                isAuthenticated:false,
            }
// all cases for fail
        case LOGIN_FAIL:
        case REGISTER_USER_FAIL:
            return{
                ...state,
                loading:false,
                isAuthenticated:false,
                user: null ,
                error:action.payload
            };
        
        case LOAD_USER_FAIL:
            return{
                loading:false,
                isAuthenticated:false,
                user: null ,
                error:action.payload
            }
            case LOGOUT_FAIL:
                return{
                    ...state,
                    loading:false,
                    error:action.payload,
                }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }
        
        default:
            return state ;
    }
};

export const profileReducer = (state = {},action)=>{
    switch (action.type) {
// all cases for requests
        case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
            return{
                ...state,
                loading:true,
            };
// all cases for success
        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
            return{
                ...state,
                loading:false,
                isUpdated:action.payload
            };
// all cases for fail
        case UPDATE_PROFILE_FAIL:
        case UPDATE_PASSWORD_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
// Reset case 
        case UPDATE_PROFILE_RESET:
        case UPDATE_PASSWORD_RESET:
            return{
                ...state,
                isUpdated:false,
            }
// for clearing errors
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }

        default:
            return state ;
    }
};