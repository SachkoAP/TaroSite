import styles from "./AuthorizationPage.module.scss";
import { Link, Outlet, useNavigate } from "react-router-dom";
import like from "./../../images/like.svg";
import { useState } from "react";
function AuthorizationPage() {
  const regObj = {
    phone: "",
    name: "",
  };
  const [regData, setRegData] = useState(regObj);
  const navigate = useNavigate();

  return (
    <div className={styles.AuthorizationPage}>
      <div className={styles.container}>
        <img className={styles.like1} src={like} alt="0" />
        {/* <h1>Вход</h1> */}
        <h1>
          {" "}
          <span
            onClick={() => {
              navigate("../RegistrationPage");
            }}
          >
            Регистрация <span className={styles.spanslash}>/</span>
          </span>{" "}
          <span> Вход</span>
        </h1>
        {/* <div className={styles.reg}>
          <Link to="../RegistrationPage">
            <span>Регистрация</span>
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

export default AuthorizationPage;
