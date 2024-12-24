import { createSlice } from "@reduxjs/toolkit";
const data = [
  {
    id: "1",
    number: "1",
    title: "Что означает эта карта?",
    img: "./img/pilot2.png",
    answers: [
      {
        id: "11",
        value: "Ссоры, недопонимания",
      },
      {
        id: "12",
        value: "Теплые взаимоотношения",
      },
      {
        id: "13",
        value: "Стабильность",
      },
      {
        id: "14",
        value: "Симпатию и взаимный интерес",
      },
    ],
  },
  {
    id: "2",
    number: "2",
    title: "Что означает эта карта?",
    img: "./img/pilot2.png",
    answers: [
      {
        id: "21",
        value: "Новые возможности",
      },
      {
        id: "22",
        value: "Стагнацию и застой",
      },
      {
        id: "23",
        value: "Потерю контроля",
      },
      {
        id: "24",
        value: "Разочарование",
      },
    ],
  },
  {
    id: "3",
    number: "3",
    title: "Что означает эта карта?",
    img: "./img/pilot2.png",
    answers: [
      {
        id: "31",
        value: "Успех и благополучие",
      },
      {
        id: "32",
        value: "Финансовые затруднения",
      },
      {
        id: "33",
        value: "Нерешительность и сомнения",
      },
      {
        id: "34",
        value: "Ощущение пустоты",
      },
    ],
  },
  {
    id: "4",
    number: "4",
    title: "Что означает эта карта?",
    img: "./img/pilot2.png",
    answers: [
      {
        id: "41",
        value: "Упорство и трудолюбие",
      },
      {
        id: "42",
        value: "Напряженность в отношениях",
      },
      {
        id: "43",
        value: "Испытания и трудности",
      },
      {
        id: "44",
        value: "Одиночество и отчужденность",
      },
    ],
  },
  {
    id: "5",
    number: "5",
    title: "Что означает эта карта?",
    img: "./img/pilot2.png",
    answers: [
      {
        id: "51",
        value: "Перемены и неожиданности",
      },
      {
        id: "52",
        value: "Стабильность и уверенность",
      },
      {
        id: "53",
        value: "Конфликты и разногласия",
      },
      {
        id: "54",
        value: "Страх перед неизвестным",
      },
    ],
  },
];

const isTestSlice = createSlice({
  name: "test",
  initialState: {
    testData: {},
    selected: [],
    selectedQestion: 1,
    completeTest: false,
    selectId: "",
    progress: 0,
  },

  reducers: {
    //! следующий вопрос в тесте
    nextQuestion(state) {
      const number = state.selectedQestion + 1;
      state.selectedQestion = number;
      state.selectId = state.testData.questions[number - 1]?.id;
    },
    //! прошлый вопрос
    prevQuestion(state) {
      state.selectedQestion === 1
        ? (state.selectedQestion = 1)
        : (state.selectedQestion -= 1);
    },
    resetcompleteTest(state) {
      state.completeTest = false;
    },

    setcompleteTest(state, action) {
      console.log("setcompleteTest", action.payload);
      const status = action.payload;
      state.completeTest = status;
      if (!status) {
        state.selectedQestion = 1;
        state.selected = [];
        // state.selectId = "";
      }
    },

    //! добавить выбранный блок
    apiTest(state, action) {
      const { dataTest } = action.payload || {};
      if (dataTest) {
        state.testData = dataTest;
        state.selectId = dataTest.questions[0]?.id;
        state.selected = [];
        state.selectedQestion = 1;
        state.completeTest = false;
      } else {
        console.error("dataTest is undefined in action.payload");
        // Optionally, handle the error by setting a default value or taking other actions.
      }
    },

    //! запомнить Id выбранный блока
    setSelectedId(state, action) {
      const { id } = action.payload;
      state.selectId = id;
    },

    addSelected(state, action) {
      const { selectId } = action.payload;
      console.log("StateselectId", selectId);
      if (selectId) {
        const data = {
          idAnsver: selectId,
          idQuestion: state.testData.questions[state.selectedQestion - 1]?.id,
        };
        const existingAnswerIndex = state.selected.findIndex(
          (answer) => answer.idQuestion === data.idQuestion
        );
        if (existingAnswerIndex !== -1) {
          state.selected[existingAnswerIndex] = data;
        } else {
          state.selected = [...state.selected, data];
        }
      }
    },
  },
});

export const {
  apiTest,
  nextQuestion,
  addSelected,
  resetcompleteTest,
  prevQuestion,
  setcompleteTest,
  setSelectedId,
} = isTestSlice.actions;

export default isTestSlice.reducer;
