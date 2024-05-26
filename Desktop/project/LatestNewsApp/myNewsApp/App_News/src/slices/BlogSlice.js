import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { STATUS } from 'utils/status';

export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async () => {
	const response = await axios.get('http://localhost:4001/api/getAllBlog');
	return response.data.blogs;
});

const blogSlice = createSlice({
	name: 'blog',
	initialState: {
		data: {
			blogs: []
		},
		status: STATUS.IDLE,
		error: null
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchBlogs.pending, (state) => {
				state.status = STATUS.LOADING;
			})
			.addCase(fetchBlogs.fulfilled, (state, action) => {
				state.status = STATUS.SUCCEEDED;
				state.data.blogs = action.payload;
			})
			.addCase(fetchBlogs.rejected, (state, action) => {
				state.status = STATUS.FAILED;
				state.error = action.error.message;
			});
	}
});

export default blogSlice.reducer;
