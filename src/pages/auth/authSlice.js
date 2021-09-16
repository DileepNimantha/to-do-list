import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getUserApi } from '../../api/user';

// import { getUserApi } from '../../api/user';

let initialState = {
  user: null,
  loading: false,
  isPrepared: false,
  isLoggedIn: false,
  error: '',
  message: ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    fetchUserStart(state) {
      state.loading = true;
    },
    fetchUserSuccess(state, action) {
      const { user } = action.payload;
      state.user = user;
      state.isLoggedIn = true;
      state.loading = false;
      state.isPrepared = true;
    },
    fetchUserFail(state) {
      state.isLoggedIn = false;
      state.loading = false;
      state.isPrepared = true;
    },
    logoutUser(state) {
      state.user = null;
      state.loading = false;
      state.isPrepared = false;
      state.isLoggedIn = false;
    }
  }
});

export const { fetchUserStart, fetchUserSuccess, fetchUserFail, logoutUser } = authSlice.actions;

export default authSlice.reducer;

export const fetchUser = data => async dispatch => {
  dispatch(fetchUserStart());
  try {
    const response = await getUserApi(data);
    localStorage.setItem('username', response.user.email);
    localStorage.setItem('firstname', response.user.firstname);

    dispatch(fetchUserSuccess(response));
  } catch (error) {
    console.log('error', error);
    toast.error('User not found');

    dispatch(fetchUserFail());
  }
};

export const logout = () => async dispatch => {
  dispatch(fetchUserStart());
  try {
    localStorage.removeItem('username');
    localStorage.removeItem('firstname');

    dispatch(logoutUser());
  } catch (error) {
    console.log('error', error);
  }
};
