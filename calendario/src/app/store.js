import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import calendarReducer from '../features/calendar/calendarSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    calendar: calendarReducer
  },
});
