import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import HeadModule from "../../modules/HomePageModule/HeadModule/HeadModule";
import TarifModule from "../../modules/HomePageModule/TarifModule/TarifModule";
import WhatCourseModule from "../../modules/HomePageModule/WhatCourseModule/WhatCourseModule";
import styles from "./HomePage.module.scss";
import FaqModule from "../../modules/HomePageModule/FaqModule/FaqModule";
import FaqQuestionsModule from "../../modules/HomePageModule/FaqQuestionsModule/FaqQuestionsModule";
import { useRef } from "react";
import { useSelector } from "react-redux";

function HomePage() {
  const targetElementRef = useRef(null);
  const discount = false;
  const store = useSelector((state) => state.isUserSlice);
  const naviugation = useNavigate();
  const funAutorization = () => {
    if (store.id && store.name && store.phone) {
      naviugation("/LK");
    } else {
      naviugation("/AuthorizationPage");
    }
  };

  return (
    <div className={styles.HomePage}>
      <div className={styles.menu}>
        <img
          onClick={funAutorization}
          src={store.id ? "./img/acaunt.svg" : "./img/exit.svg"}
          alt="reg"
        />
      </div>
      <HeadModule targetElementRef={targetElementRef} />
      <WhatCourseModule />
      <TarifModule targetElementRef={targetElementRef} discount={discount} />
      <FaqModule />
      <FaqQuestionsModule />
      <Footer />
    </div>
  );
}

export default HomePage;
