import { createSlice } from '@reduxjs/toolkit';
import db from '../../services/db';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {events: [], doneEvents: []},
    reducers: {
        set_events: (state, action) => {
            state.events = action.payload;
            return state;
        },
        set_doneEvents: (state, action) => {
            state.doneEvents = action.payload;
            return state;
        },
    }
})

export const events_map = (state) => state.calendar.events;
export const doneEvents_map = (state) => state.calendar.doneEvents;
export const calendarActions = calendarSlice.actions;

export const find_events = () => async (dispatch) => {

    const resId = await db.get('auth');

    const res = await db.get(`events?userId=${resId.data.id}&active=true`);

    dispatch(calendarActions.set_events(res.data));

}

export const find_doneEvents = () => async (dispatch) => {

    const resId = await db.get('auth');

    const res = await db.get(`events?userId=${resId.data.id}&active=false`);

    dispatch(calendarActions.set_doneEvents(res.data));

}

export const register_event = (name, date, start, end, description) => async (dispatch) => {

    //const resId = await db.get('auth');

    await db.post('events', {
        name: name,
        date: date,
        startTime: start,
        endTime: end,
        description: description,
        active: true
    })
    .then(() => {
        dispatch(find_events());
        dispatch(find_doneEvents());
        toast.success('Event saved!', { position: toast.POSITION.BOTTOM_RIGHT })
    })
    .catch((err) => {
        console.log(err);
    });

}

export const delete_event = (eventId) => async (dispatch) => {

    await db.delete('events' , {
        data: {
            event: eventId
        }
    })
    .then(() => {
        dispatch(find_events());
        dispatch(find_doneEvents());
        toast.success('Event deleted with success!', { position: toast.POSITION.BOTTOM_RIGHT })
    })
    .catch((err) => {
        toast.error('Error when deleting event!', { position: toast.POSITION.BOTTOM_RIGHT })
        console.log(err);
    });
}

export const edit_event = (eventId, name, date, start, end, description) => async (dispatch) => {

    await db.put('events', {
        event: eventId,
        name: name,
        date: date,
        startTime: start,
        endTime: end,
        description: description
    })
    .then(() => {
        dispatch(find_events());
        dispatch(find_doneEvents());
        toast.success('Event edited with success!', { position: toast.POSITION.BOTTOM_RIGHT })
    })
    .catch((err) => {
        toast.error('Error when editing event!', { position: toast.POSITION.BOTTOM_RIGHT })
        console.log(err);
    });

}

export const setActive_event = (eventId) => async (dispatch) => {

    await db.patch('events', {
        event: eventId,
    })
    .then(() => {
        dispatch(find_events());
        dispatch(find_doneEvents());
        toast.success('Moved event!', { position: toast.POSITION.BOTTOM_RIGHT })
    })
    .catch((err) => {
        toast.error('Error! Failed to movecd event', { position: toast.POSITION.BOTTOM_RIGHT })
        console.log(err);
    });

}

export default calendarSlice.reducer;