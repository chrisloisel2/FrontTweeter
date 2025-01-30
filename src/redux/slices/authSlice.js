import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import myAxios from '../../utils/interceptor';

export const login = createAsyncThunk(
	'auth/login',
	async (credentials, { rejectWithValue }) => {
		try {
			const response = await myAxios.post('/login', credentials);
			return response.data;
		} catch (error) {
			console.error(error);
			return rejectWithValue(error.response?.data || "Une erreur est survenue");
		}
	}
);

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		status: 'idle',
		user: null,
		isAuthenticated: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.user = action.payload.user;
				state.isAuthenticated = true;
				state.error = null;
			})
			.addCase(login.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload || "Erreur inconnue";
			});
	}
});

export default authSlice.reducer;
