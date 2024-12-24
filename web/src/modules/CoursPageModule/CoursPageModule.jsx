import CoursHeader from "../../components/CoursHeader/CoursHeader";
import Footer from "../../components/Footer/Footer";
import styles from "./CoursPageModule.module.scss";
function CoursPageModule({ children }) {
    return ( 
        <div className={styles.CoursPageModule}>
            <div>
            <CoursHeader img="./img/Logo.svg"/>
            <main className={styles.CoursPageModule}>
                    {children}
                </main>
            <Footer/>
        </div>
        </div>
     );
}

export default CoursPageModule;