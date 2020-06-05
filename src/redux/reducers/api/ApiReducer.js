import {
    API_CALL_FAILURE, DUMMY_API_CALL
} from '../../Actions';

const initialState = {
    testResponse: ''
}

export function apiReducer(state = initialState, action) {
    switch (action.type) {
        case API_CALL_FAILURE:
            console.log("action", action);
            return {
                ...state
            }
        case DUMMY_API_CALL:
            console.log("action", action);
            return {
                ...state,
                testResponse: action.data
            }
        default:
            return state;
    }
}