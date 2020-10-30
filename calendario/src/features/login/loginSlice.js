import { createSlice } from '@reduxjs/toolkit';
import db from '../../services/db';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

export const loginSlice = createSlice({
    name: 'userLogin',
    initialState: { token: '' },
    reducers: {
        set_login: (state, action) => {
            state.token = action.payload;
            return state;
        },
        set_error: (state, action) => {
            state.error = action.payload;
            return state;
        }
    }
});

export const user_map = (state) => state.userLogin.token;
export const error_map = (state) => state.userLogin.error;
export const loginActions = loginSlice.actions;

export const login = (emailUser, passwordUser) => async (dispatch) => {
    
    await db.post('sessions', {
        email: emailUser,
        password: passwordUser
    }).then(response => {
        localStorage.setItem('token', 'Bearer ' +response.data.token);
        dispatch(loginActions.set_login(response.data));
        setTimeout(function() {
            window.location.reload(false);
        }, 400);
    }).catch( error => {
        /*var notify;
        if(error.response.status === 404) {
            notify = () => {
                toast('Error! Login fields are empty')
            }
        }
        dispatch(notify);*/
        //dispatch(loginActions.set_error(error.response.data.error));
    });
}

export default loginSlice.reducer;