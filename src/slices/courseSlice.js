import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  course: null,
};

const courseSlice = createSlice({
  name: 'course',
  initialState: initialState,
  reducers: {
    resetCourseState(state, value) {
      state.user = value.payload;
    },
  },
});
export const { resetCourseState } = courseSlice.actions;
export default courseSlice.reducer;
