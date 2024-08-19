import axios from 'axios';

// Acciones
export const FETCH_TURNS_REQUEST = 'FETCH_TURNS_REQUEST';
export const FETCH_TURNS_SUCCESS = 'FETCH_TURNS_SUCCESS';
export const FETCH_TURNS_FAILURE = 'FETCH_TURNS_FAILURE';
export const SELECT_TURN = 'SELECT_TURN';
export const CANCEL_TURN_REQUEST = 'CANCEL_TURN_REQUEST';
export const CANCEL_TURN_SUCCESS = 'CANCEL_TURN_SUCCESS';
export const CANCEL_TURN_FAILURE = 'CANCEL_TURN_FAILURE';

// Creadores de acciones
const fetchTurnsRequest = () => ({
    type: FETCH_TURNS_REQUEST
});

const fetchTurnsSuccess = (turns) => ({
    type: FETCH_TURNS_SUCCESS,
    payload: turns
});

const fetchTurnsFailure = (error) => ({
    type: FETCH_TURNS_FAILURE,
    payload: error
});

const cancelTurnRequest = () => ({
    type: CANCEL_TURN_REQUEST
});

const cancelTurnSuccess = (turnId) => ({
    type: CANCEL_TURN_SUCCESS,
    payload: turnId
});

const cancelTurnFailure = (error) => ({
    type: CANCEL_TURN_FAILURE,
    payload: error
});

export const fetchTurns = () => async (dispatch, getState) => {
    dispatch(fetchTurnsRequest());
    const state = getState();
    const userId = state.auth.user?.id;

    try {
        const response = await axios.get(`http://localhost:3000/turns/${userId}`);
        const turns = response.data;
        dispatch(fetchTurnsSuccess(turns));
    } catch (error) {
        dispatch(fetchTurnsFailure(error.message));
    }
};

export const cancelTurn = (turnId) => async (dispatch, getState) => {
    dispatch(cancelTurnRequest());
    const state = getState();
    const userId = state.auth.user?.id;

    try {
        await axios.put(`http://localhost:3000/turns/${userId}/${turnId}/cancel`);
        dispatch(cancelTurnSuccess(turnId));
    } catch (error) {
        dispatch(cancelTurnFailure(error.message));
    }
};

export const selectTurn = (turnId) => ({
    type: SELECT_TURN,
    payload: turnId
});
