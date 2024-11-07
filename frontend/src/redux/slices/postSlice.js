import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  currentPage: 1,
  hasMore: true, // Indicates if there are more posts to load
  loading: false,
  error: null,
  totalPages: 0,
  totalPosts: 0,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    loadPostsSuccess: (state, action) => {
      const newPosts = action.payload.posts;
      state.posts = [
        ...state.posts,
        ...newPosts.filter(
          (post) => !state.posts.some((p) => p._id === post._id)
        ), // Prevent duplicates
      ];
      state.currentPage = action.payload.page;
      state.hasMore = newPosts.length > 0; // Set to false if no more posts are returned
      state.loading = false;
      state.totalPages = action.payload.totalPages;
      state.totalPosts = action.payload.totalPosts;
    },
    loadPostsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetPosts: (state) => {
      state.posts = [];
      state.currentPage = 1;
      state.hasMore = true;
      state.loading = false;
      state.error = null;
    },
  },
});

// Export actions and reducer
export const { startLoading, loadPostsSuccess, loadPostsFailure, resetPosts } =
  postSlice.actions;
export default postSlice.reducer;
