import styles from "./RegistrationPage.module.scss";
import { Link, Outlet, useNavigate } from "react-router-dom";
import like from "./../../images/like.svg";
import { useState } from "react";
function RegistrationPage() {
  const regObj = {
    phone: "",
    name: "",
  };
  const [regData, setRegData] = useState(regObj);
  const navigate = useNavigate();
  return (
    <div className={styles.RegistrationPage}>
      <div className={styles.container}>
        <img className={styles.like1} src={like} alt="0" />
        <h1>
          {" "}
          <span>Регистрация</span>{" "}
          <span
            onClick={() => {
              navigate("../AuthorizationPage");
            }}
          >
            <span className={styles.spanslash}>/</span> Вход
          </span>
        </h1>
        {/* <div className={styles.reg}>
          <Link to="../AuthorizationPage">
            <span>Вход</span>
          </Link>
        </div> */}
        <img className={styles.like2} src={like} alt="0" />
        <div className={styles.regBody}>
          <Outlet context={{ regData, setRegData }} />
        </div>
      </div>
    </div>
  );
}

export default RegistrationPage;
