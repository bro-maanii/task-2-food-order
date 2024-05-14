import { configureStore } from '@reduxjs/toolkit'
import cartFunc from './Slices/cartFunc'
import { list } from 'postcss'

// ...

export const store = configureStore({
  reducer:{
    list: cartFunc ,//file name hai
    
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch