import {
  Link,
  Navigate,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import styles from "./RegStep2.module.scss";
import { useEffect, useState } from "react";
import { apiLogin, apiRegister } from "../../../api/ApiRequest";
function RegStep2(props) {
  const { regData, setRegData } = useOutletContext();
  console.log("regData", regData);
  const navigete = useNavigate();
  const [regType, setRegType] = useState(false);

  const [telefon, setTelefon] = useState("");
  useEffect(() => {
    console.log("telefon", telefon);
  }, [telefon]);
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

  const funClickType = (type) => {
    setRegType(type);
  };

  //! отправляем запрос на регистрацию
  const funClikNext = () => {
    //! для входа
    if (props.type) {
      if (regType) {
        console.log("регистрация по вк");
      } else {
        const tel = `${telefon.replace(/\D/g, "")}`;
        regData.phone = tel;
        setRegData({ ...regData, phone: tel });

        apiLogin({ phone: tel }).then((req) => {
          if (req?.status === 200) {
            console.log("Введите код");
          }
        });
      }
    } else {
      //! для регистрации
      if (regType) {
        console.log("регистрация по вк");
      } else {
        regData.phone = `${telefon.replace(/\D/g, "")}`;

        apiRegister(regData).then((req) => {
          if (req?.status === 200) {
            console.log("Введите код");
          }
        });
      }
    }
  };

  return (
    <div className={styles.RegStep2}>
      <div className={styles.box}>
        <h2>{props.type ? "Шаг 1" : "Шаг 2"}</h2>
        {/* <p>Выберете способ {props.title}</p> */}
        <p>Введите номер телефона:</p>
        <div className={styles.inputs}>
          {/* <div className={styles.regNane}>
            <p
              onClick={() => funClickType(false)}
              className={!regType ? styles.active : ""}
            >
              Номер телефона
            </p>
            <p
              onClick={() => funClickType(true)}
              className={regType ? styles.active : ""}
            >
              Социальные сети
            </p>
          </div> */}
          {!regType && (
            <div className={styles.tel}>
              <img src="../img/flag.svg" alt="flag" />
              <p>+7 </p>
              <input type="tel" onChange={changeTelefon} value={telefon} />
            </div>
          )}
        </div>
        {!regType ? (
          <div>
            <p className={styles.textBottom}>
              Для подтверждения мы совершим звонок-сброс на указанный номер
              телефона
            </p>
            <div className={styles.button}>
              <Link to="../Step3">
                <button onClick={funClikNext}>Продолжить</button>
              </Link>
            </div>
          </div>
        ) : (
          <div className={styles.sety}>
            <img src="../img/insta.svg" alt="insta" />
            <img src="../img/vk.svg" alt="vk" />
            <img src="../img/wa.svg" alt="wa" />
          </div>
        )}
        {/* <Link to={props.type ? "../../" : "../Step1"}> */}
        <button
          className={styles.btnBack}
          onClick={
            props.type ? () => navigete("../../") : () => navigete("../Step1")
          }
        >
          <img src="../img/arrow.svg" alt="<" />
        </button>
        {/* </Link> */}
      </div>
    </div>
  );
}

export default RegStep2;
