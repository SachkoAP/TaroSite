
import vkIcon from "./../../images/vk.svg";
import instaIcon from "./../../images/insta.svg";
import waIcon from "./../../images/wa.svg";
import styles from "./Footer.module.scss";

function Footer() {
  return (
    <div className={styles.Footer}>
      <footer>
        <div>
          <div className={styles.contaktsInner}>
            <div className={styles.contakts}>
                <a target="_blank" href="https://www.instagram.com/nataro.site?igsh=MXdqYWg3MXA1YTRubg%3D%3D&utm_source=qr"><img src={instaIcon} alt="insta" /></a>
                <a target="_blank" href="https://t.me/+79186604929"><img src={vkIcon} alt="vk" /></a>
                <a target="_blank" href="https://wa.me/qr/ZU5POVIJYOLKP1"><img src={waIcon} alt="wa" /></a>
              </div>
              <div className={styles.FooterInfo}>
                  <a href="./files/Политика_конфиденциальности.pdf"><p>Политика конфиденциальности</p></a>
                  <a href="./files/Офферта.pdf" target="_blank" ><p>Договор оферты</p></a>
              </div>
              <div className={styles.FooterInfoCenter}> 
                <p>ИНН 615433139050</p>
                <p>ОГРНИП 324619600181176</p>
                <p>© 2024 Tarot. Все права защищены</p>
              </div>
              
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
