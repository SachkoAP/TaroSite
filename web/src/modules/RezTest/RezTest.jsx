import { useSelector } from "react-redux";
import styles from "./RezTest.module.scss";
import { useDispatch } from "react-redux";
import {
  apiTest,
  resetcompleteTest,
  setcompleteTest,
} from "../../store/test/test.slice";
import { ReactComponent as ArrowRight } from "./../../images/arrowRight.svg";
import { useNavigate } from "react-router-dom";
import { nextSelectBlock } from "../../store/action/courses.slice";
import CoursHeaderTest from "../../components/CoursHeaderTest/CoursHeaderTest";
import Footer from "../../components/Footer/Footer";
import { useEffect, useState } from "react";
import { apiGetProgress, apiGetTest } from "../../api/ApiRequest";

function RezTest() {
  const store = useSelector((state) => state.coursesSlice.selectBlock);
  const storeBasic = useSelector((state) => state);
  const storeData = useSelector((state) => state);
  const [RezTest, setRezTest] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const goVizible = () => {
    dispatch(nextSelectBlock());
    dispatch(setcompleteTest(false));
    navigate("/CoursVideo");
  };

  useEffect(() => {
    console.log("store", storeData.coursesSlice.idSelectTest);
    const dataIdtEST = storeData.coursesSlice.idSelectTest;
    apiGetProgress(dataIdtEST).then((req) => {
      if (req?.status === 200) {
        console.log("прогресс", req.data);
        setRezTest(req?.data?.progress || 0);
      }
    });
  }, []);

  const funResetTest = () => {
    // dispatch(setcompleteTest(false));
    apiGetTest(storeBasic.coursesSlice.idSelectTest).then((res) => {
      if (res?.status === 200) {
        console.log("test", res?.data);
        dispatch(apiTest({ dataTest: res?.data }));
      }
    });
  };

  return (
    <div className={styles.RezTest}>
      <CoursHeaderTest img="./img/LogoTest.svg" title={store} imgBack={true} />
      <div className={styles.RezTestInner}>
        <div>
          <p className={styles.title}>Твой результат:</p>
          <div className={styles.CircleBlock}>
            <div className={styles.Circle}>
              <p>{RezTest}%</p>
            </div>
          </div>

          <div className={styles.ButtonBlock}>
            <button onClick={funResetTest}>Перепройти тест</button>
            <button onClick={() => goVizible()}>
              Продолжить просмотр
              <span>
                <ArrowRight />
              </span>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default RezTest;
