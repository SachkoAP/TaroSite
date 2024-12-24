import { useEffect, useState } from "react";
import ProgressCard from "../../../components/ProgressCard/ProgressCard";
import styles from "./ProgressLKModule.module.scss";
import { apiGetBlock, apiGetProgress } from "../../../api/ApiRequest";
import { useSelector } from "react-redux";

// const cardData = [
//   {
//     index: "1",
//     title: "Правила расклада",
//     progress: "100",
//     status: "Тест пройден",
//     statusProgress: "85",
//     img: "../img/carts.png",
//   },
//   {
//     index: "2",
//     title: "Старшие арканы",
//     progress: "82",
//     status: "Пройти тест",
//     statusProgress: "0",
//     img: "../img/carts.png",
//   },
//   {
//     index: "3",
//     title: "Младшие арканы",
//     progress: "12",
//     status: "Пройти тест",
//     statusProgress: "0",
//     img: "../img/carts.png",
//   },
// ];

function ProgressLKModule() {
  const store = useSelector((state) => state.coursesSlice);
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    const id = store.selectCourse;
    apiGetBlock(id).then((req) => {
      if (req?.status === 200) {
        console.log("блок", req.data);
        setCardData(req.data);
      }
    });
  }, []);

  return (
    <div className={styles.ProgressLKModule}>
      <p>Отношения на таро / Мой прогресс</p>
      <div className={styles.container}>
        {cardData.map((item, ind) => (
          <div className={styles.items} key={ind}>
            <ProgressCard item={item} key={ind} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProgressLKModule;
