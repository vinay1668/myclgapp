import { configureStore,getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from "../features/auth/authSlice.js"
import postReducer from "../features/posts/postSlice.js";
import commentReducer from "../features/comments/commentSlice.js"
import pageReducer from "../features/page/pageSlice.js"
import chatReducer from "../features/chat/chatSlice.js"

export const store = configureStore({
  reducer: {
      auth : authReducer,
      posts: postReducer,
      comments: commentReducer,
      page: pageReducer,
      chat: chatReducer,
  
  },
  middleware: [
    ...getDefaultMiddleware(),
  ]
  
});
