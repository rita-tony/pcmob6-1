export const LOG_IN = "log_in";
export const LOG_OUT = "log_out";
export const CURRENT_USER_ID = "current_user_id";
export const CURRENT_USER_NAME = "current_user_name";


export function logInAction() {
    return { type: LOG_IN };
}

export function logOutAction() {
    return { type: LOG_OUT };
}

export function setCurrentUserId() {
    return { type: CURRENT_USER_ID };
}

export function setCurrentUserName() {
    return { type: CURRENT_USER_NAME };
}

const initialState = {
    token: null,
    currentUserId: null,
    currentUserName: null,
}

export default function blogAuthReducer(state = initialState, action) {
    console.log ('blog auth state: ');
    //console.log (state);
    switch (action.type) {
        case LOG_IN:
            return { ...state, token: action.payload }
        case LOG_OUT:
            return { ...state, token: null, currentUserId: null, currentUserName: null }
        case CURRENT_USER_ID:
            return { ...state, currentUserId: action.payload }
        case CURRENT_USER_NAME:
            return { ...state, currentUserName: action.payload }
        default:
            return state
    }
}