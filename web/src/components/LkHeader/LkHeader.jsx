import { useNavigate } from "react-router-dom";
import styles from "./LkHeader.module.scss";
import back from "./../../images/back.svg";
function LkHeader(props) {
  const navigate = useNavigate();

  const goBack = () => {
    if(document.location.pathname === "/Lk/ProgressLKModule"){
      navigate("/Lk")
    }else{
      navigate("/")
    }
  }
  return (
    <div className={styles.CoursHeader}>
      <header>
        <div className={styles.headerLogo}>
          <div className={styles.arrowBack}>
            <img onClick={() => goBack()} src={back} alt="Назад" />
          </div>
          <div className={styles.headerLogoImgBlock}>
            {/* <img src={props?.imgHuman} alt="logo" /> */}
            <div className={styles.humanAva}>{[...props?.name][0] || "U"}</div>

            <div className={styles.headerLogoTextBlock}>
              <p>{props?.name}</p>
              <p>{props?.number}</p>
            </div>
          </div>
        </div>
        <div className={styles.line}></div>
      </header>
    </div>
  );
}

export default LkHeader;
