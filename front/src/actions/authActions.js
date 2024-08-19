import axios from 'axios';

export const loginSuccess = (user) => ({
    type: 'LOGIN_SUCCESS',
    payload: user,
});

export const loginFailure = (error) => ({
    type: 'LOGIN_FAILURE',
    payload: error,
});

export const loginUser = (credentials) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:3000/users/login', credentials);
        const user = response.data.user;
        dispatch(loginSuccess(user));
    } catch (error) {
        dispatch(loginFailure(error.message));
        throw error;
    }
};

export const logoutUser = () => ({
    type: 'LOGOUT',
});
