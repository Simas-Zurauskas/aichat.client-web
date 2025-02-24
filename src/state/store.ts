import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from './reducers/auth';
import appReducer from './reducers/app';
import themeReducer from './reducers/theme';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer,
    theme: themeReducer,
  },

  middleware: (defaultMiddleware) =>
    defaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useStateDispatch = () => useDispatch<AppDispatch>();
export const useStateSelector: TypedUseSelectorHook<RootState> = useSelector;
