import FaqCard from "../../../components/FaqCard/FaqCard";
import { faqData } from "./FaqData";
import styles from "./FaqModule.module.scss";

function FaqModule() {
  return (
    <div className={styles.FaqModule}>
      <div className={styles.left}>
        <img className={styles.like1} src="./img/like.svg" alt="img" />
        <h2>ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ (faq)</h2>
        {/* <img src="./img/carts.png" alt="img" /> */}
      </div>
      <div className={styles.rigth}>
        {faqData.map((item) => (
          <FaqCard key={item.index} item={item} />
        ))}
      </div>
    </div>
  );
}

export default FaqModule;
