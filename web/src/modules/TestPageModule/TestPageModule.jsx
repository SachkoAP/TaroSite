import { useSelector } from "react-redux";
import CoursHeaderTest from "../../components/CoursHeaderTest/CoursHeaderTest";
import TestModule from "../TestModule/TestModule";
import styles from "./TestPageModule.module.scss";
// import { useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { apiTest } from "../../store/test/test.slice";
import Footer from "../../components/Footer/Footer";
function TestPageModule() {
  const store = useSelector((state) => state?.coursesSlice.selectBlock);
  console.log("store", store);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(apiTest());
  // }, []);
  return (
    <div className={styles.TestPageModule}>
      <CoursHeaderTest img="./img/LogoTest.svg" title={store} imgBack={true} />
      <TestModule />
      <Footer />
    </div>
  );
}

export default TestPageModule;
