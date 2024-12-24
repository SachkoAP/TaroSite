import { useEffect, useState } from "react";
import MyCourseCard from "../../../components/MyCourseCard/MyCourseCard";
import styles from "./MyCourseLkModule.module.scss";
import { apiGetMyCours } from "../../../api/ApiRequest";
import { Link} from "react-router-dom";

function MyCourseLkModule() {
  const [data, setData] = useState([]);

  useEffect(() => {
    apiGetMyCours().then((response) => {
      if (response.status === 200) {
        setData(response.data);
        console.log("курс", response.data);
      }
    });
  }, []);

  // const data = [
  //   {
  //     imgLink: "./img/pilot2.png",
  //     name: "Отношения на таро",
  //     tarif: "Standart",
  //     coutBlock: 6,
  //     proggressBar: "90",
  //   },
  //   {
  //     imgLink: "./img/pilot2.png",
  //     name: "Отношение на таро",
  //     tarif: "Standart",
  //     coutBlock: 6,
  //     proggressBar: "90",
  //   },
  // ];
  return (
    <div className={styles.MyCourseLkModule}>
      <h1>Мои курсы</h1>
      <div className={styles.myCourses}>
        {data.map((item, index) => (
          <MyCourseCard key={index} {...item} />
        ))}
        {
          data.length === 0 ? (
            <div className={styles.noCourse}>
              <div className={styles.noCourseInner}>
                <p>У вас отсутствуют курсы!</p>
                <Link to="/">
                  <button>Купить курс</button>
                </Link>
              </div>
            </div>
          ) : null
        }
      </div>
    </div>
  );
}

export default MyCourseLkModule;
