import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import styles from "./TestRez.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { apiTest, setcompleteTest } from "../../store/test/test.slice";
import { apiGetBlock, apiGetProgress, apiGetTest, apiTestAndVideo } from "../../api/ApiRequest";
import { addSelectTest, addselectBlock, nextSelectBlock, updateNumberSelectBlock } from "../../store/action/courses.slice";

function TestRez(props) {
  const store = useSelector((state) => state);
  const TestRez = {
    rez: "",
  };
  const [progress, setProgress] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const OpenTest = () => {
    navigate("/TestCours");
    apiGetTest(store.coursesSlice?.idSelectTest).then((res) => {
      if (res?.status === 200) {
        dispatch(apiTest({ dataTest: res?.data }));
      }
    });
  };
  
  const nextBlock = () => {
    if(store.coursesSlice?.numberSeleccttBlock < 8){
    apiGetBlock(store.coursesSlice?.idSelectCours).then((res) => {
      if (res?.status === 200) {
        let numberOld = store.coursesSlice?.numberSeleccttBlock
        let IdNextBlock = 0;
        if(numberOld === 7){
          dispatch(addselectBlock({ select: numberOld+1, id: res?.data[numberOld].id }));
          dispatch(updateNumberSelectBlock(numberOld+1))
          IdNextBlock = res?.data[numberOld].id
        }else{
          dispatch(addselectBlock({ select: numberOld+1, id: res?.data[numberOld+1].id }));
          dispatch(updateNumberSelectBlock(numberOld+1))
          IdNextBlock = res?.data[numberOld+1].id
        }
        apiTestAndVideo(IdNextBlock).then((res) => {
          dispatch(addSelectTest({id :res?.data?.test?.id}))
          WhatProgress(res?.data?.test?.id)
        });
      }
    })
  }
  navigate("/CoursVideo");
};

const WhatProgress = (id) => {
  apiGetProgress(id).then((req) => {
    if (req?.status === 200) {
      setProgress(req?.data?.progress);
    }
  });
}

useEffect(() => {
  WhatProgress(store.coursesSlice?.idSelectTest)
}, []);

  return (
    <div className={styles.TestRez}>
      <div className={styles.TestRezInner}>
        {progress === null || progress === undefined ? (
          <div className={styles.TestRezNot}>
            <div className={styles.TestRezInfo}>
              <p>Пройди тест</p>
              <p>Проверь насколько хорошо ты усвоил материал</p>
              <img onClick={OpenTest} src="./img/back.svg" />
            </div>
          </div>
        ) : (
          <div className={styles.TestRezGood} style={{ marginRight: store.coursesSlice?.numberSeleccttBlock === 8 && "0px" }}>
            <div className={styles.TestRezInfo}>
              <p>Тест пройден</p>
              <p></p>
              <p>{progress}%</p>
              <div className={styles.TestRezInfoBtn}>
                <div className={styles.TestRezInfoBtnInfo}>
                    <p>Перепройти тест </p>
                    <img onClick={OpenTest} src="./img/back.svg" />
                  </div>
              </div>
            </div>
          </div>
        )}
        {store.coursesSlice?.numberSeleccttBlock < 8 && (
          <div className={styles.GoNextBlock}>
          <div className={styles.GoNextBlockFlex}>
            <div className={styles.GoNextBlockInner} onClick={nextBlock}>
              <p>Перейти к следующему блоку</p>
            </div>
          </div>
        </div>
        )}
       
      </div>
    </div>
  );
}

export default TestRez;
