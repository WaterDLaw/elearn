import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/user/userSlice'
import profileReducer from '../features/profile/profileSlice'
import topicReducer from './topic/topicSlice'


export const store = configureStore({
    reducer: {
        user: userReducer,
        profile: profileReducer,
        topic: topicReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['user/loginUser/fulfilled'],

      },
    }),
})

