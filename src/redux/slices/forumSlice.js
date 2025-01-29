import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import MyAxios from '../../utils/interceptor';


export const fetchPosts = createAsyncThunk(
	'forum/fetchPosts',
	async (_, { getState, rejectWithValue }) => {
		try {
			const state = getState();
			const lastTimestamp = state.forum.lastTimestamp || Date.now();

			const response = await MyAxios.get(`/api/forum/before/${lastTimestamp}`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data || 'Erreur inconnue');
		}
	}
);

const forumSlice = createSlice({
	name: 'forum',
	initialState: {
		posts: [],
		lastTimestamp: null,
		hasMore: true,
		loading: false,
		error: null
	},
	reducers: {
		resetForum: (state) => {
			state.posts = [];
			state.lastTimestamp = null;
			state.hasMore = true;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPosts.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.loading = false;
				if (action.payload.length === 0) {
					state.hasMore = false;
				} else {
					state.posts = [...state.posts, ...action.payload];
					state.lastTimestamp = action.payload[action.payload.length - 1].createdAt;
				}
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	}
});

export const { resetForum } = forumSlice.actions;
export default forumSlice.reducer;
