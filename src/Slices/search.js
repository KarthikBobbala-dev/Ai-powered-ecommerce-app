import { createSlice } from '@reduxjs/toolkit'

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchedValue: '',
  },
  reducers: {
    searchedValue: (state, action) => {
      state.searchedValue = action.payload
    },
  },
})

export const { searchedValue } = searchSlice.actions
export default searchSlice.reducer
