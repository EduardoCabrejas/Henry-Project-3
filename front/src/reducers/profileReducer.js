const initialState = {
    profilePicture: null,
    error: null,
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_PROFILE_PICTURE_SUCCESS':
            return {
                ...state,
                profilePicture: action.payload,
                error: null,
            };
        case 'UPDATE_PROFILE_PICTURE_FAILURE':
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default profileReducer;
