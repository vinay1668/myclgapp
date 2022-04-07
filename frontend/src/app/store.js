import { configureStore,getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from "../features/auth/authSlice.js"
import postReducer from "../features/posts/postSlice.js";
import commentReducer from "../features/comments/commentSlice.js"

export const store = configureStore({
  reducer: {
      auth : authReducer,
      posts: postReducer,
      comments: commentReducer,
  },
  middleware: [
    ...getDefaultMiddleware(),
  ]
  
});
