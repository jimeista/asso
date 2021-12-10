import { configureStore } from '@reduxjs/toolkit'

// reducers
import auth from './auth-slice'

const reducer = {
  auth,
}

export const store = configureStore({
  reducer,
})
