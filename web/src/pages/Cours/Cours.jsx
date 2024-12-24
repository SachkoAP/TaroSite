import { useEffect, useState } from "react";
import { apiGetBlock, apiGetCours } from "../../api/ApiRequest";
import CoursPageModule from "../../modules/CoursPageModule/CoursPageModule";
import CardCursBlock from "../../ui/CardCursBlock/CardCursBlock";
import styles from "./Cours.module.scss";
import { useSelector } from "react-redux";

function Cours() {
  const store = useSelector((state) => state?.coursesSlice);
  useEffect(() => {
    apiGetBlock(store.idSelectCours).then((req) => {
      if (req?.status === 200) {
        setData(req.data);
      }
    });
  }, []);

  const [data, setData] = useState([]);

  return (
    <div className={styles.Cours}>
      <CoursPageModule>
        <div className={styles.CoursBlockCard}>
          {data.map((item, index) => (
            <CardCursBlock
              key={index}
              numberBloock={index + 1}
              nameBlock={item.name}
              id={item.id}
            />
          ))}
          {/* <CardCursBlock numberBloock={1} nameBlock="Правила расклада" /> */}
          {/* <CardCursBlock numberBloock={2} nameBlock="Старшие арканы" />
          <CardCursBlock numberBloock={3} nameBlock="Младшие арканы" />
          <CardCursBlock numberBloock={4} nameBlock="Рента ком" />
          <CardCursBlock
            numberBloock={5}
            nameBlock="Сочетания карт (триплеты)"
          />
          <CardCursBlock numberBloock={6} nameBlock="Записки таролога" /> */}
          {data.length !== 8 && (
            <div className={styles.CoursBlockCardNotLenghts}>
              <p>Скоро появятся новые блоки</p>
            </div>
          )}
        </div>
      </CoursPageModule>
    </div>
  );
}

export default Cours;
