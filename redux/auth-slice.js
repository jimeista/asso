import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const LOGIN_URI = 'https://asso-kz.herokuapp.com/api/log_in/'
const REGISTER_URI = 'https://asso-kz.herokuapp.com/api/sign_up/'

export const login = createAsyncThunk('login', async (params) => {
  const res = await axios.post(LOGIN_URI, params)

  return { ...params, ...res.data }
})

export const register = createAsyncThunk('register', async (params) => {
  const res = await axios.post(REGISTER_URI, params)

  return { ...params, ...res.data }
})

const initialState = {
  status: 'idle',
  loading: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    handleChangePhone(state, { payload }) {
      state.mobile_phone = payload
    },
    handleChangePassword(state, { payload }) {
      state.password = payload
    },
    handleChangeName(state, { payload }) {
      state.name = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.status = 'pending'
      state.loading = true
    }),
      builder.addCase(login.fulfilled, (state, { payload }) => {
        state.status = 'succeeded'
        state.token = payload.token
        state.mobile_phone = payload.mobile_phone
        state.password = payload.password
        state.loading = false
      }),
      builder.addCase(login.rejected, (state) => {
        state.status = 'failed'
        state.loading = false
      })
  },
})

export const { handleChangePassword, handleChangePhone, handleChangeName } =
  authSlice.actions

export default authSlice.reducer

export const getStateSelector = (state) => state.auth
