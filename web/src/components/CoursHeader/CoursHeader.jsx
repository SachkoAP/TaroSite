import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./CoursHeader.module.scss";
import { useDispatch } from 'react-redux';
import { updateNumberSelectBlock } from '../../store/action/courses.slice';

function CoursHeader(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleBackClick = () => {
    const currentURL = window.location.href;
    const url = currentURL.split("/");
    if(url[url.length - 1] === "Cours"){
      navigate("/Lk");
    }else{
      navigate("/Cours");
      dispatch(updateNumberSelectBlock(1))
    }
  };

  return (
    <div className={styles.CoursHeader}>
      <header>
        <div className={styles.headerLogo}>
            <div className={styles.headerLogoInner}>

        
            <div className={styles.arrowBack} onClick={handleBackClick}>
              <img src="./img/back.svg" alt="Назад"  />
            </div>
            <div>
            <img className={styles.headerLogoImg} style={{pointerEvents: "none"}} src={props.img} alt="Логотип" />
            </div>
          </div>
        </div>
        <div className={styles.line}></div>
      </header>
    </div>
  );
}

export default CoursHeader;
