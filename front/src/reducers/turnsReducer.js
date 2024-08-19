import { FETCH_TURNS_REQUEST, FETCH_TURNS_SUCCESS, FETCH_TURNS_FAILURE, SELECT_TURN } from '../actions/turnsActions';

const initialState = {
    loading: false,
    turns: [],
    selectedTurnId: null, // Añadido
    error: null
};

const turnReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TURNS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_TURNS_SUCCESS:
            return {
                ...state,
                loading: false,
                turns: action.payload
            };
        case FETCH_TURNS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case SELECT_TURN:
            return {
                ...state,
                selectedTurnId: action.payload 
            };
        default:
            return state;
    }
};

export default turnReducer;
