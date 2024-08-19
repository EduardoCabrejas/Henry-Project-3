const initialState = {
    user: null,
    error: null,
    isLoggedIn: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: action.payload,
                error: null,
                isLoggedIn: true,
            };
        case 'LOGIN_FAILURE':
            return {
                ...state,
                error: action.payload,
                isLoggedIn: false, 
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                isLoggedIn: false,
            };
        default:
            return state;
    }
};

export default authReducer;
