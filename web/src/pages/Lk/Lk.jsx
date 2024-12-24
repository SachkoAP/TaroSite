import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import LkHeader from "../../components/LkHeader/LkHeader";
import styles from "./Lk.module.scss";
import { useSelector } from "react-redux";
function Lk() {
  const store = useSelector((state) => state.isUserSlice);
  return (
    <div className={styles.Lk}>
      <LkHeader
        imgHuman="./img/A.svg"
        name={store.name || "User"}
        number={
          store.phone
            ? `+7 (${store.phone.slice(0, 3)}) ${store.phone.slice(
                3,
                6
              )}-${store.phone.slice(6, 10)}`
            : "+7 (***) ***-**-**"
        }
      />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Lk;
