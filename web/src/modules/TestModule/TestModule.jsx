import { useSelector } from "react-redux";
import styles from "./TestModule.module.scss";
import { useDispatch } from "react-redux";
import {
  addSelected,
  nextQuestion,
  resetQuestion,
  setcompleteTest,
} from "../../store/test/test.slice";
import { useEffect } from "react";
import { ReactComponent as ArrowRight } from "./../../images/arrowRight.svg";
import { apiCheckTest } from "../../api/ApiRequest";
function TestModule() {
  const store = useSelector((state) => state.isTestSlice);
  console.log("isTestSlice", store);
  const server = process.env.REACT_APP_API_URL;

  const dispatch = useDispatch();
  const nextQuestClick = () => {
    // console.log("store.selected", store.selected, " === ", store.selectId);
    console.log("store.selected", store.selected);
    if (store.selected?.find((el) => el.idQuestion === store.selectId)) {
      dispatch(nextQuestion());
    }
  };

  const CheckQuestClick = () => {
    if (store.selected?.find((el) => el.idQuestion === store.selectId)) {
      let dataSelected = [];
      store.selected.map((el) => {
        dataSelected.push(el.idAnsver);
      });

      const data = {
        id: store.testData.id,
        answers: dataSelected,
      };
      console.log("data", data);
      apiCheckTest(data).then((res) => {
        console.log("check", res);
        dispatch(setcompleteTest(true));
        console.log("check", res.data?.percent);
      });
    }
  };

  const funClickAnswer = (id) => {
    console.log("idAnsver", id);
    dispatch(addSelected({ selectId: id }));
  };
  return (
    <div className={styles.TestModule}>
      <ul className={styles.points}>
        {store?.testData?.questions?.map((_, index) => (
          <li
            key={index}
            className={
              store.selectedQestion === index + 1 ||
              index < store.selectedQestion
                ? styles.active
                : styles.Notactive
            }
          ></li>
        ))}
      </ul>
      <div className={styles.nameQuestion}>
        <div className={styles.numberQuestion}>
          <p>{store.selectedQestion}</p>
        </div>
        <div className={styles.titleQuestion}>
          <p>{store.testData?.questions[store.selectedQestion - 1]?.title}</p>
        </div>
      </div>
      <div className={styles.Question}>
        <div className={styles.QuestionInner}>
          {store.testData?.questions[store.selectedQestion - 1].file && (
            <div className={styles.QuestionImg}>
              <img
                src={`${server}/uploads/${
                  store.testData?.questions[store.selectedQestion - 1]?.file
                }`}
              />
            </div>
          )}
          <div className={styles.QuestionAnswers}>
            {store.testData?.questions[store.selectedQestion - 1]?.answers.map(
              (item, index) => (
                <div key={index}>
                  <button
                    onClick={() => funClickAnswer(item?.id)}
                    className={
                      store.selected.find((el) => el.idAnsver === item?.id)
                        ? styles.QuestionAnswersBtnActiv
                        : styles.QuestionAnswersBtn
                    }
                  >
                    <p>{item.text}</p>
                  </button>
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <div className={styles.buttonNextQuestion}>
        {store.selectedQestion === store.testData.questions.length ? (
          <button onClick={CheckQuestClick}>
            Завершить тест
            <span>
              <ArrowRight />
            </span>
          </button>
        ) : (
          <button onClick={nextQuestClick}>
            Следующий вопрос
            <span>
              <ArrowRight />
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

export default TestModule;
