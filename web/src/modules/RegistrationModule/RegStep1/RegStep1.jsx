import { Link, useNavigate, useOutletContext } from "react-router-dom";
import styles from "./RegStep1.module.scss";
import { useState } from "react";

function RegStep1() {
  const [name, setName] = useState("");
  const { regData, setRegData } = useOutletContext();
  console.log("regData", regData);
  const funSetName = (el) => {
    setName(el.target.value);
  };
  // const navigate = useNavigate();
  const funClikNext = () => {
    console.log("name", name);
    // regData.name = name;
    setRegData({ ...regData, name: name });
    // navigate("Step2");
  };

  return (
    <div className={styles.RegStep1}>
      <div className={styles.box}>
        <h2>Шаг 1</h2>
        <p>Как вас зовут?</p>
        <div className={styles.button}>
          <input
            type="text"
            onChange={funSetName}
            value={name}
            placeholder="Введите имя"
          />
          <Link to="Step2">
            <button onClick={funClikNext}>ПРОДОЛЖИТЬ</button>
          </Link>
        </div>
        <Link to="../../">
          <button className={styles.btnBack}>
            <img src="../img/arrow.svg" alt="<" />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default RegStep1;
