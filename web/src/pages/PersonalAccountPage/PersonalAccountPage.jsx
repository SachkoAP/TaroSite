import styles from "./PersonalAccountPage.module.scss";

function PersonalAccountPage() {
  return (
    <div className={styles.PersonalAccountPage}>
      <div className={styles.header}>
        <div className={styles.foto}>
          <img src="./img/accauntFoto.svg" />
        </div>
        <div className={styles.name}>
          <p>Анастасия</p>
          <span>+7 (972) 735-09-11</span>
        </div>
      </div>
      <div className={styles.tarif}>
        <button>STANDART</button>
      </div>
    </div>
  );
}

export default PersonalAccountPage;
