import { SET_USER_ID, SET_USER_EMAIL, SET_USER_PASSWORD } from "./actions";

const initialState = {
    id: null,
    email: '',
    password: ''
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_ID:
            return { ...state, id: action.payload };
        case SET_USER_EMAIL:
            return { ...state, email: action.payload };
        case SET_USER_PASSWORD:
            return { ...state, password: action.payload };
        default:
            return state;
    }

}

export default userReducer