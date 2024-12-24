import { Link } from "react-router-dom";
import styles from "./HeadModule.module.scss";

function HeadModule(props) {
  const scrollToElement = () => {
    props.targetElementRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className={styles.HeadModule}>
      <div className={styles.containerTitle}>
        <div className={styles.title}>
          <p>
            <img className={styles.like1} src="./img/like.svg" alt="0" />
            отношения
          </p>
          <p>
            <img className={styles.like2} src="./img/like.svg" alt="0" />
            На таро
          </p>
        </div>
        <div className={styles.titleInfo}>
          Научись смотреть на отношения <br /> через карты и начни зарабатывать
          на этом
        </div>
        <div className={styles.but}>
          <button onClick={scrollToElement}>КУПИТЬ</button>
          <a href="#imgPilot">
            <button>
              <img className={styles.like3} src="./img/like.svg" alt="0" /> ДЕМО
              УРОК
            </button>
          </a>
        </div>
      </div>
      <div className={styles.imgContainer}>
        <img className={styles.like4} src="./img/like.svg" alt="0" />

        <div className={styles.girlFoto}>
          <img src="./img/girl2.png" alt="a" />
        </div>
      </div>
    </div>
  );
}

export default HeadModule;
