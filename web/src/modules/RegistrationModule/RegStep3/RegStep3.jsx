import { Link, useNavigate, useOutletContext } from "react-router-dom";
import styles from "./RegStep3.module.scss";
import { useEffect, useState } from "react";
import { apiLoginsms, apiRegisterCode } from "../../../api/ApiRequest";
import DataContext from "../../../context";
import React from "react";
import { useSelector } from "react-redux";

function RegStep3(props) {
  const { regData } = useOutletContext();
  const [activeTimer, setActiveTimer] = useState(false);
  const [timer, setTimer] = useState(60);
  const [telefon, setTelefon] = useState("");
  const [textError, setTextError] = useState("");
  const navigate = useNavigate();
  const { context } = React.useContext(DataContext);
  const store = useSelector((state) => state.isUserSlice);

  const changeTelefon = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, ""); // Оставляем только цифры
    // Форматирование номера телефона
    if (value.length <= 4) {
      if (value.length > 0 && value.length <= 2) {
        value = `${value.slice(0, 2)}`;
      } else if (value.length > 2 && value.length <= 4) {
        value = `${value.slice(0, 2)} ${value.slice(2, 4)}`;
      }
      setTelefon(value);
    }
  };

  const funReqestAufth = () => {
    const reqData = {
      phone: regData.phone,
      code: telefon.replace(/\D/g, ""),
    };
    apiRegisterCode(reqData).then((req) => {
      if (req?.status === 200) {
        console.log("авторизован");
        sessionStorage.setItem("auth", JSON.stringify(req.data));
        context.funGetUserData();
      }
    });
  };

  //! перебрасываем в лк если есть данные пользователя
  useEffect(() => {
    if (store.id && store.name && store.phone) {
      navigate("../../Lk");
    }
  }, [store]);

  useEffect(() => {
    let interval;
    if (activeTimer) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setActiveTimer(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeTimer]);

  const funSMS = () => {
    const reqData = {
      phone: regData.phone,
    };
    apiLoginsms(reqData).then((req) => {
      if (req?.status === 200) {
        setTimer(60);
        setActiveTimer(true);
        setTextError("");
      } else {
        setTextError("Пожалуйста повторите регистрацию");
      }
    });
  };

  return (
    <div className={styles.RegStep3}>
      <div className={styles.box}>
        <h2>{props.type ? "Шаг 2" : "Шаг 3"}</h2>
        <p>
          Введите последние 4 цифры входящего номера
          {/* <br /> 4 последние цифры звонившего номера */}
        </p>
        <div className={styles.inputs}>
          <div className={styles.tel}>
            <input
              type="tel"
              onChange={changeTelefon}
              value={telefon}
              placeholder="* * * *"
            />
          </div>
        </div>
        <div>
          <div className={styles.button}>
            <Link to="#">
              <button onClick={funReqestAufth}>Отправить</button>
            </Link>
          </div>
          <p
            className={styles.timer}
            onClick={activeTimer ? undefined : funSMS}
          >
            <span
              style={{
                cursor: activeTimer ? "not-allowed" : "pointer",
                color: activeTimer ? "gray" : "white",
              }}
            >
              Код не пришел {activeTimer ? `(${timer} секунд)` : ""}
            </span>
          </p>
          {textError && <p style={{ color: "#DC2323" }}>{textError}!</p>}
        </div>
        <Link to="../Step2">
          <button className={styles.btnBack}>
            <img src="../img/arrow.svg" alt="<" />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default RegStep3;
