import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  test: number;
}

const initialState: State = {
  test: 0,
};

export const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTest: (state, action: PayloadAction<number>) => {
      state.test = action.payload;
    },
  },
});

export default slice.reducer;
