import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./CoursHeaderTest.module.scss";
import { useDispatch } from 'react-redux';
import { prevQuestion } from '../../store/test/test.slice';
import { useSelector } from 'react-redux';

function CoursHeaderTest(props) {
  const navigate = useNavigate();
  const store = useSelector((state) => state.isTestSlice);
  const dispatch = useDispatch();
  const goBack = () =>{
    if (store.selectedQestion == 1) {
      navigate("/CoursVideo")
    }else{
      dispatch(prevQuestion())
    }
  }
  return (
    <div className={styles.CoursHeader}>
      <header>
        <div className={styles.headerLogo}>
          {props?.imgBack && 
          <div className={styles.arrowBack}>
            <img onClick={()=> goBack()} src="./img/back.svg" alt="Назад" />
          </div>
          }
          <div className={styles.headerLogoBlock}>
          <img style={{pointerEvents: "none"}} src={props?.img} alt="Логотип" />
          </div>
        </div>
        <div className={styles.blockTestNumber}>
          <p>Тест на знание {props?.title} блока</p>
        </div>
      </header>
    </div>
  );
}

export default CoursHeaderTest;
