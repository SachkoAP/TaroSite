import { createSlice } from "@reduxjs/toolkit";
import { apiGetBlock } from "../../api/ApiRequest";



const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    selectBlock: 0,
    selectCourse: 0,
    idSelectBlock: null,
    numberSeleccttBlock: 0,
    idSelectCours: null,
    idSelectTest: null,
    coursesData: [],
  },



  reducers: {
    //! добавить выбранный блок

    apiTest(state, action) {
      const { dataTest } = action.payload || {};
      if (dataTest) {
        state.testData = dataTest;
      } else {
        console.error("dataTest is undefined in action.payload");
        // Optionally, handle the error by setting a default value or taking other actions.
      }
    },


    addselectBlock(state, action) {
      const { select, id } = action.payload;
      state.idSelectBlock = id;
      state.selectBlock = select;
    },

    updateNumberSelectBlock(state, action) {
      state.numberSeleccttBlock = action.payload;
    },

    addSelectTest(state, action) {
      const { id } = action.payload;
      state.idSelectTest = id;
    },

    addIdSelectCours(state, action) {
      const { id } = action.payload;
      state.idSelectCours = id;
    },

    addIdSelectBlock(state, action) {
      const { id } = action.payload;
      state.idSelectBlock = id;
    },

   nextSelectBlock(state) {
    if (state.selectBlock < 8) {
        state.selectBlock += 1;
        state.numberSeleccttBlock += 1;
    }
  },

    removeSelectBlock(state) {
      state.selectBlock = "";
    },

    setSelectCourse(state, action) {
      state.selectCourse = action.payload.id;
    },

    
  },
});

// export const { addselectBlock, removeSelectBlock, nextSelectBlock } = isSelectBlockSlice.actions;
export const {
  setSelectCourse,
  apiTest,
  updateNumberSelectBlock,
  addselectBlock,
  removeSelectBlock,
  nextSelectBlock,
  addIdSelectBlock,
  addIdSelectCours,
  addSelectTest
} = coursesSlice.actions;

export default coursesSlice.reducer;
