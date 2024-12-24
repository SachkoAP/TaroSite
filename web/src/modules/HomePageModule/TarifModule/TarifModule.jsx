import { useRef, useState } from "react";
import TarifContainer from "../../../components/TarifContainer/TarifContainer";
import styles from "./TarifModule.module.scss";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import "./tarifStile.css";

function TarifModule(props) {
  // const [selectBlock, setSelectBlock] = useState(0);
  // const [touchStartX, setTouchStartX] = useState(0);
  // const [touchStartY, setTouchStartY] = useState(0);
  const containerRef = useRef(null);

  // const handleTouchStart = (event) => {
  //   setTouchStartX(event.touches[0].clientX);
  //   setTouchStartY(event.touches[0].clientY);
  // };

  // const handleTouchMove = (event) => {
  //   const touchEndX = event.changedTouches[0].clientX;
  //   const touchEndY = event.changedTouches[0].clientY;

  //   const deltaX = touchEndX - touchStartX;
  //   const deltaY = touchEndY - touchStartY;

  //   if (Math.abs(deltaX) > Math.abs(deltaY)) {
  //     if (deltaX > 0) {
  //       let count = selectBlock - 1;
  //       if (count > 2) count = 0;
  //       if (count < 0) count = 2;
  //       setSelectBlock(count);
  //       console.log("right", count);
  //       if (count === 0) {
  //         containerRef.current.scrollLeft = 0;
  //       }
  //       if (count === 1) {
  //         containerRef.current.scrollLeft -= containerRef.current.offsetWidth;
  //       }
  //       if (count === 2) {
  //         containerRef.current.scrollLeft =
  //           containerRef.current.scrollWidth - containerRef.current.clientWidth;
  //       }
  //     } else {
  //       let count = selectBlock + 1;
  //       if (count > 2) count = 0;
  //       if (count < 0) count = 2;
  //       setSelectBlock(count);
  //       console.log("left", count);
  //       if (count === 0) {
  //         containerRef.current.scrollLeft = 0;
  //       }
  //       if (count === 1) {
  //         containerRef.current.scrollLeft +=
  //           containerRef.current.offsetWidth + 2;
  //       }
  //       if (count === 2) {
  //         containerRef.current.scrollLeft =
  //           containerRef.current.scrollWidth - containerRef.current.clientWidth;
  //       }
  //     }
  //   }
  // };

  return (
    <div className={styles.TarifModule} ref={props.targetElementRef}>
      <div
        className={styles.container}
        // onTouchStart={handleTouchStart}
        // onTouchEnd={handleTouchMove}
        // style={{
        //   scrollBehavior: "smooth",
        //   touchAction: "pan-y",
        //   transition: "all 0.15s linear",
        // }}
        ref={containerRef}
      >
        {/* <div className={styles.containerInnerMobile}>
          <AwesomeSlider
            className={styles.awesomeSlider}
            organicArrows={false}
            bullets={true}
            startup={true}
            media={{
              default: {
                slidesToShow: 1,
              },
            }}
          >
            <div className={styles.awsSlide}>
              <TarifContainer
                discount={props.discount}
                title={"BASIC"}
                number={1}
                countInfo={3}
                btn={2}
                price={"5 555 ₽"}
                pricediscount={"4 999 ₽"}
              />
            </div>
            <div className={styles.awsSlide}>
              <TarifContainer
                discount={props.discount}
                title={"STANDART"}
                number={2}
                countInfo={4}
                btn={2}
                price={"15 555 ₽"}
                pricediscount={"13 999 ₽"}
              />
            </div>
            <div className={styles.awsSlide}>
              <TarifContainer
                discount={props.discount}
                title={"PRO"}
                number={3}
                countInfo={6}
                btn={1}
                price={"35 555 ₽"}
                pricediscount={"31 999 ₽"}
              />
            </div>
          </AwesomeSlider>
        </div> */}
        <div className={styles.Flex}>
        <div className={styles.containerInner}>
        
          <TarifContainer
            discount={props.discount}
            title={"BASIC"}
            number={1}
            countInfo={3}
            btn={2}
            price={"5 555 ₽"}
            pricediscount={"4 999 ₽"}
          />
          <TarifContainer
            discount={props.discount}
            title={"STANDART"}
            number={2}
            countInfo={4}
            btn={2}
            price={"15 555 ₽"}
            pricediscount={"13 999 ₽"}
          />
          <TarifContainer
            discount={props.discount}
            title={"PRO"}
            number={3}
            countInfo={6}
            btn={1}
            price={"35 555 ₽"}
            pricediscount={"31 999 ₽"}
          />
        </div>
        </div>
      </div>
      {/* <div className={styles.pointsList}>
        <div
          className={selectBlock === 0 ? styles.pointActive : styles.point}
        ></div>
        <div
          className={selectBlock === 1 ? styles.pointActive : styles.point}
        ></div>
        <div
          className={selectBlock === 2 ? styles.pointActive : styles.point}
        ></div>
      </div> */}
    </div>
  );
}

export default TarifModule;
