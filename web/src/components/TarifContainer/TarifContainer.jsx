import { useSelector } from "react-redux";
import { apiPay } from "../../api/ApiRequest";
import styles from "./TarifContainer.module.scss";
import { useNavigate } from "react-router-dom";

function TarifContainer(props) {
  const store = useSelector((state) => state.isUserSlice);
  const navigate = useNavigate();
  const funPay = () => {
    if (store.id) {
      const data = {
        tariff: props.number + 1,
      };
      apiPay(data).then((res) => {
        console.log("pay", res);
        if (res?.status === 200) {
          console.log("pay", res.data, data);
          window.location.href = res.data?.redirectUrl;
        }
      });
    } else {
      navigate("../../AuthorizationPage");
    }
  };

  return (
    <div className={styles.TarifContainer}>
      <h3>{props.title}</h3>
      {props.title === "STANDART" && !props.discount && (
        <div className={styles.predlo}>Лучшее предло-жение</div>
      )}
      {props.discount && (
        <div
          className={styles.predlo}
          style={{ fontSize: "32px", fontWeight: "700" }}
        >
          -10%
        </div>
      )}
      <div className={styles.boxInner}>
        {props.title === "STANDART" && !props.discount && (
          <img className={styles.like0} src="./img/like.svg" alt="img" />
        )}
        <ul className={styles.info}>
          <li>
            <img className={styles.like1} src="./img/like.svg" alt="0" />
            {props.title === "BASIC" ? "25 видеоуроков" : "31 видеоурок"}
          </li>
          <li>
            <img className={styles.like1} src="./img/like.svg" alt="0" />
            бессрочный доступ к курсу
          </li>
          <li>
            <img className={styles.like1} src="./img/like.svg" alt="0" />
            тесты после каждого блока курса
          </li>
          <li>
            <img className={styles.like1} src="./img/like.svg" alt="0" />
            медитация для подготовки к раскладу
          </li>
          <li>
            <img className={styles.like1} src="./img/like.svg" alt="0" />
            блокнот таролога
          </li>
          {props.title === "STANDART" && (
            <li>
              <img className={styles.like1} src="./img/likeRed.svg" alt="0" />6
              бонусных видеоуроков «Как зарабатывать на картах таро»
            </li>
          )}
          {props.title === "PRO" && (
            <li>
              <img className={styles.like1} src="./img/likeRed.svg" alt="0" />
              бонусный блок «Как зарабатывать на картах Таро»
            </li>
          )}
          {props.countInfo > 4 && (
            <li>
              <img className={styles.like1} src="./img/likeRed.svg" alt="0" />
              наставничество до первой продажи
            </li>
          )}
          {props.countInfo > 5 && (
            <li>
              <img className={styles.like1} src="./img/likeRed.svg" alt="0" />
              личная помощь от практикующего таролога
            </li>
          )}
        </ul>
        <div className={styles.price}>
          <p
            style={
              props.discount
                ? {
                    textDecoration: "line-through",
                    fontSize: "20px",
                    color: "#6D6D6D",
                  }
                : {}
            }
          >
            {props.price}
          </p>
          {props.discount && (
            <div className={styles.pricediscount}>{props.pricediscount}</div>
          )}
        </div>
      </div>
      {props.btn === 1 && (
        <button className={styles.btn1} onClick={funPay}>
          Купить
        </button>
      )}
      {props.btn === 2 && (
        <button className={styles.btn2} onClick={funPay}>
          Купить
        </button>
      )}
    </div>
  );
}

export default TarifContainer;
