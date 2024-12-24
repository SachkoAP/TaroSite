import styles from "./WhatCourseModule.module.scss";
import ImgHomePage from "./../../../images/HomePiloSeria.png";
import { useEffect, useRef } from "react";
function WhatCourseModule() {
  return (
    <div className={styles.WhatCourseModule} id="imgPilot">
      <div className={styles.container}>
        <h2>
          о чем курс?
          <img className={styles.like1} src="./img/like.svg" alt="0" />
        </h2>
        <div className={styles.containerInner}>
          <div className={styles.blok1}>
            <div className={styles.text}>
              <p>
                Таро — мощный инструмент самопознания и анализа окружающего
                мира. Наш курс научит вас интерпретировать чувства и действия
                людей, открывая новые горизонты.{" "}
              </p>
              <p className={styles.disP}>
                Курс фокусируется на раскладах по отношениям — самой
                востребованной теме в Тарологии. Понимание динамики отношений —
                это ключ к успешной практике, ведь 95% запросов к тарологу
                именно о них. Эта тема не только важна, но и может стать основой
                для Вашего успешного карьерного роста.
              </p>
            </div>
            <div className={styles.imgPilot}>
              <iframe
                width="720"
                height="405"
                src="https://rutube.ru/play/embed/916c8e8f44228ce1682eb6031c96f644"
                frameBorder="0"
                allow="clipboard-write; autoplay"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div className={styles.blok1}>
            <div className={styles.text2}>
              <p>
                Курс фокусируется на раскладах по отношениям — самой
                востребованной теме в Тарологии. Понимание динамики отношений —
                это ключ к успешной практике, ведь 95% запросов к тарологу
                именно о них. Эта тема не только важна, но и может стать основой
                для Вашего успешного карьерного роста.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhatCourseModule;
