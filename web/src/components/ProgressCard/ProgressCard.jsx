import styles from "./ProgressCard.module.scss";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addIdSelectBlock,
  addIdSelectCours,
  addselectBlock,
} from "../../store/action/courses.slice";
import { apiGetProgress, apiGetProgressBlock } from "../../api/ApiRequest";
function ProgressCard(props) {
  const navigete = useNavigate();
  // const store = useSelector((state) => state.isTestSlice);
  const [progress, setProgress] = useState(0);

  const dispatch = useDispatch();

  // console.log("isTestSlice", store)
  const goVideo = () => {
    // dispatch(addselectBlock({ select: props?.item?.index }));
    dispatch(addselectBlock({ select: 1 }));
    dispatch(addIdSelectBlock({ id: props?.item?.id }));
    navigete("/CoursVideo");
  };

  const goTest = () => {
    navigete("/TestCours");
    dispatch(addselectBlock({ select: props?.item?.index }));
  };

  useEffect(() => {
    apiGetProgress(props?.item?.testId).then((req) => {
      if (req?.status === 200) {
        setProgress(req.data);
      }
    });
  }, []);

  return (
    <div className={styles.ProgressCard}>
      <div className={styles.left}>
        <div className={styles.left_left}>
          <img src={props.item.img || "../img/carts.png"} alt="L" />
          <div className={styles.box}>
            <span>Блок {props.item.number || props.item.index}</span>
            <p>{props.item.name}</p>
            <button className={styles.btnPk} onClick={() => goVideo()}>
              К видео
            </button>
          </div>
        </div>

        <div className={styles.progressBar}>
          <div className={styles.progressBar_bg}>
            <div
              style={{ width: `${progress?.progress ? "50%" : "0"}` }}
              className={styles.progressBar_inner}
            ></div>
          </div>
          <p>{progress?.progress ? 50 : 0}%</p>
        </div>
        <button className={styles.btnPhone} onClick={() => goVideo()}>
          К видео
        </button>
        <div className={styles.rigthPfone}>
          <p>
            {props.item.status || 0} <span>{props.item.statusProgress}%</span>
          </p>
        </div>
      </div>

      <div className={styles.rigth} onClick={() => goTest()}>
        <p>{props.item.status || "Тест"}</p>
        <span>{progress?.progress || 0}%</span>
      </div>
    </div>
  );
}

export default ProgressCard;
