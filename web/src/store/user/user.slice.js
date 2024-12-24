import { createSlice } from "@reduxjs/toolkit";
const isUserSlice = createSlice({
  name: "test",
  initialState: {
    courses: [],
    id: "",
    name: "",
    phone: "",
    tariff: "",
  },

  reducers: {
    //! записать данные пользователя
    setUser(state, action) {
      const { data } = action.payload;
      state.courses = data.courses;
      state.id = data.id;
      state.name = data.name;
      state.phone = data.phone;
      state.tariff = data.tariff;
    },
    //! очистить пользователя
    clearUser(state) {
      state.courses = [];
      state.id = "";
      state.name = "";
      state.phone = "";
      state.tariff = "";
    },
  },
});

export const { setUser, clearUser } = isUserSlice.actions;

export default isUserSlice.reducer;
