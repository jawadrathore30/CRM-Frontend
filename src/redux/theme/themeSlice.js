import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	mode: "light", // 'light' or 'dark'
};

const themeSlice = createSlice({
	name: "theme",
	initialState,
	reducers: {
		toggleTheme(state) {
			state.mode = state.mode === "light" ? "dark" : "light";
		},
		setTheme(state, action) {
			state.mode = action.payload; // you can explicitly set 'light' or 'dark'
		},
	},
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
