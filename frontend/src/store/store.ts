import { configureStore } from '@reduxjs/toolkit'
import dateSlice from '../dateSlice'

export const store = configureStore({
    reducer: {
        date: dateSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
