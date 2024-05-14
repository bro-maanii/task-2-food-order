import { createSlice, current, nanoid } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Jost } from 'next/font/google'



// Define a type for the slice state
interface IDishes {
    id: number;
    name: string;
    price: number;
    quantity: number;

}
const isServer = typeof window === 'undefined';
// Define the initial state using that type
const initialState: IDishes[]=isServer
? []
: JSON.parse(localStorage.getItem('cartFunc') || '[]');
export const cartFunc = createSlice({
  name: 'cartFunc',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addCart (state, action){
        const data={
            id: action.payload.id ,
            name: action.payload.name,
            price: action.payload.price,
            quantity: action.payload.quantity
        }
        state.push(data)
        console.log(data)
        if (!isServer) {
          let listData = JSON.stringify(current(state));
          localStorage.setItem('cartFunc', listData);
        }
        // let listData = JSON.stringify(current(state))
        // localStorage.setItem('todo', listData)
    },
    removeCart: (state, action: PayloadAction<number>) => { // Payload should be the ID of the item to remove
        const index = state.findIndex(item => item.id === action.payload);
        if (index !== -1) {
          state.splice(index, 1);  // Remove the item at the found index
        } else {
          console.warn("Item with ID", action.payload, "not found in cart");
        }
        if (!isServer) {
          let listData = JSON.stringify(current(state));
          localStorage.setItem('cartFunc', listData);
        }
      },
    
  },
})

export const { addCart , removeCart } = cartFunc.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default cartFunc.reducer