import axios from 'axios';

export const updateProfilePictureSuccess = (imageUrl) => ({
    type: 'UPDATE_PROFILE_PICTURE_SUCCESS',
    payload: imageUrl,
});

export const updateProfilePictureFailure = (error) => ({
    type: 'UPDATE_PROFILE_PICTURE_FAILURE',
    payload: error,
});

export const updateProfilePicture = (file) => async (dispatch) => {
    try {
        const formData = new FormData();
        formData.append('profilePicture', file);

        const response = await axios.post('http://localhost:3000/profile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        const imageUrl = response.data.imageUrl;
        dispatch(updateProfilePictureSuccess(imageUrl));
    } catch (error) {
        dispatch(updateProfilePictureFailure(error.message));
        throw error;
    }
};