import { configureStore } from '@reduxjs/toolkit';
// import blogReducer from '../slices/blogSlice.js';
import BlogSlice from 'slices/BlogSlice';
const store = configureStore({
	reducer: {
		blog: BlogSlice
	}
});

export default store;
