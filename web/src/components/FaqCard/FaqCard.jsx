import { useState } from "react";
import styles from "./FaqCard.module.scss";

function FaqCard(props) {
  const [textOpen, setTextOpen] = useState(false);

  return (
    <div className={styles.FaqCard}>
      <div className={styles.index}>
        <span>{props.item.index}</span>
      </div>
      <div className={styles.box}>
        <div
          className={styles.imgBox}
          onClick={() => {
            setTextOpen(!textOpen);
          }}
        >
          <img src={!textOpen ? "./img/+.svg" : "./img/-.svg"} alt="img" />
        </div>

        <h3>{props.item.title}</h3>
        {textOpen && <p>{props.item.text}</p>}
      </div>
    </div>
  );
}

export default FaqCard;
