import React from "react";
import styles from "./MyCourseCard.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addIdSelectCours,
  setSelectCourse,
} from "../../store/action/courses.slice";

function MyCourseCard(props) {
  const storeUser = useSelector((state) => state.isUserSlice);
  const server = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const dispach = useDispatch();
  const store = useSelector((state) => state.coursesSlice);
  const funSelectCurs = () => {
    navigate("ProgressLKModule");
    dispach(setSelectCourse({ id: props.id }));
    dispach(addIdSelectCours({ id: props?.id }));
  };

  const goCours = () => {
    navigate("/Cours");
    dispach(addIdSelectCours({ id: props.id }));
  };
  return (
    <div className={styles.MyCourseCard}>
      <div className={styles.MyCourseCardInner}>
        <img src={`${server}/uploads/${props?.photo}`} alt="Title" />
        <h3>{props?.name}</h3>
        <p>
          <span className={styles.tarif}>
            Тариф:<span className={styles.tarifSpan}> {storeUser?.tariff}</span>
          </span>
        </p>
        <p className={styles.coutBlock}>6 блоков</p>
        <div className={styles.proggressBar}>
          <div className={styles.proggressBarInner}>
            <div
              className={styles.proggressBarInnerInner}
              style={{ width: `${props?.proggressBar || 0}%` }}
            ></div>
          </div>
          <p>{props?.proggressBar || 0}%</p>
        </div>

        <button onClick={funSelectCurs}>Мой прогресс</button>
        <button onClick={goCours} className={styles.btnVideo}>
          Просмотреть курс
        </button>
      </div>
    </div>
  );
}

export default MyCourseCard;
