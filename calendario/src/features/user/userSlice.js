import { createSlice } from '@reduxjs/toolkit';
import db from '../../services/db';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

export const userSlice = createSlice({
    name: 'user',
    initialState: { token: '', error: '', success: '' },
    reducers: {
        set_login: (state, action) => {
            state.token = action.payload;
            return state;
        },
        set_register: (state, action) => {
            state.token = action.payload;
            return state;
        },
        set_error: (state, action) => {
            state.error = action.payload;
            return state;
        },
        set_success: (state, action) => {
            state.success = action.payload;
            return state;
        }
    }
});

export const user_map = (state) => state.user.token;
export const error_map = (state) => state.user.error;
export const success_map = (state) => state.user.success;
export const userActions = userSlice.actions;

export const login = (emailUser, passwordUser) => async (dispatch) => {
    
    await db.post('sessions', {
        email: emailUser,
        password: passwordUser
    }).then(response => {
        localStorage.setItem('token', 'Bearer ' +response.data.token);
        dispatch(userActions.set_login(response.data));
        setTimeout(function() {
            window.location.reload(false);
        }, 400);
    }).catch( error => {
        dispatch(userActions.set_error(error.response.data.error));
        toast.error('Error! ' + error.response.data, { position: toast.POSITION.BOTTOM_RIGHT })
    });
}

export const register = (nomeUser, emailUser, dateUser, passwordUser) => async (dispatch) => {
    
    await db.post('users', {
        name: nomeUser,
        email: emailUser,
        dateOfBirth: dateUser,
        password: passwordUser
    }).then((response) => {
        dispatch(userActions.set_register(response.data));
        toast.success('User saved!', { position: toast.POSITION.BOTTOM_RIGHT })
        setTimeout(function() {
            window.location.reload(false);
        }, 700);
    }).catch( error => {
        dispatch(userActions.set_error(error.response.data));
        toast.error('Error! ' + error.response.data, { position: toast.POSITION.BOTTOM_RIGHT })
    });

  }

export default userSlice.reducer;