import { useState } from "react";
import styles from "./FaqQuestionsModule.module.scss";

function FaqQuestionsModule() {
  const [telefon, setTelefon] = useState("");

  const changeTelefon = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, ""); // Оставляем только цифры
    // Форматирование номера телефона
    if (value.length <= 10) {
      if (value.length > 0 && value.length <= 3) {
        value = `(${value.slice(0, 3)}`;
      } else if (value.length > 3 && value.length <= 6) {
        value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}`;
      } else if (value.length > 6 && value.length <= 10) {
        value = `(${value.slice(0, 3)}) ${value.slice(3, 6)} - ${value.slice(
          6,
          10
        )}`;
      }
      setTelefon(value);
    }
  };

  return (
    <div className={styles.FaqQuestionsModule}>
      <div className={styles.title}>
        <h2>ОСТАЛИСЬ ВОПРОСЫ?</h2>
        <img src="./img/like.svg" alt="img" />
      </div>
      <div className={styles.container}>
        <div className={styles.left}>
          <p>
            Напишите нам в Телеграм
            <span>
              {" "}
              или оставьте свой номер и мы с вами свяжемся в ближайшее время
            </span>
          </p>
          <button onClick={() => window.open("https://t.me/+79186604929")}>
            написать в телеграм
          </button>
        </div>

        <div className={styles.rigth}>
          <p className={styles.textSvaz}>
            или оставьте свой номер и мы с вами свяжемся в ближайшее время
          </p>

          <div className={styles.tel}>
            <img src="../img/flag.svg" alt="flag" />
            <p>+7 </p>
            <input type="tel" onChange={changeTelefon} value={telefon} />
          </div>

          <button>продолжить</button>
        </div>
      </div>
    </div>
  );
}

export default FaqQuestionsModule;
