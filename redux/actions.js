export const SET_USER_ID = 'SET_USER_ID'
export const SET_USER_EMAIL = 'SET_USER_EMAIL';
export const SET_USER_PASSWORD = 'SET_USER_PASSWORD';

export const setId = id => dispatch => {
    dispatch({
        type: SET_USER_ID,
        payload: id,
    })
}


export const setEmail = email => dispatch => {
    dispatch({
        type: SET_USER_EMAIL,
        payload: email,
    })
}

export const setPassword = password => dispatch => {
    dispatch({
        type: SET_USER_PASSWORD,
        payload: password,
    })
}