import { useEffect, useRef, useState } from "react";
import styles from "./VideoPlayer.module.scss";
import { LionPlayer } from "lion-player";
import "lion-player/dist/lion-skin.min.css";

function VideoPlayer(props) {
  const server = process.env.REACT_APP_API_URL;
  const [permission, setPermission] = useState("720");
  const [permissionShow, setPermissionShow] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);
  const hoverTimerRef = useRef(null); // Создаем ссылку для таймера
  console.log("props.activVideo?.m3u8", props.activVideo?.m3u8);
  const SOURCES = [
    {
      src: `${server}/uploads/${props.activVideo?.m3u8}`,
      type: "application/x-mpegURL",
    },
  ];

  useEffect(() => {
    let elem = null;
    if (videoRef) {
      elem = videoRef?.current;
    }
    console.log("videoRef", elem);
  }, [videoRef, props.activVideo]);

  const liClick = (value) => {
    setPermission(value);
    setPermissionShow(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    // Сбрасываем таймер при наведении
    clearTimeout(hoverTimerRef.current);
  };

  const handleMouseMove = () => {
    // Сбрасываем таймер при движении мыши
    setIsHovered(true);
    clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      setIsHovered(false);
      setPermissionShow(false);
    }, 2500); // Установить таймер на 1 секунду
  };

  const handleMouseLeave = () => {
    // Очищаем таймер при уходе мыши
    clearTimeout(hoverTimerRef.current);
    setIsHovered(false);
    setPermissionShow(false);
  };

  useEffect(() => {
    // При размонтировании компонента очищаем таймер
    return () => {
      clearTimeout(hoverTimerRef.current);
    };
  }, []);

  const playerRef = useRef(null);
  const getTimeCode = () => {
    const timeStop =
      playerRef.current?.children[1]?.children[5]?.children[2]?.children[1]?.innerText?.split(
        ":"
      )[0];
    const videoLen = props.videoLength;
    const req = ((timeStop / videoLen) * 100).toFixed(0);
    // console.log("currentTime", timeStop, videoLen, req);
    return req;
  };

  useEffect(() => {
    console.log("time", getTimeCode());
  }, []);

  return (
    <div className={styles.VideoPlayer}>
      <div className={styles.videoBlock} ref={playerRef}>
        {/* <button onClick={getTimeCode}> кнопка </button> */}
        <LionPlayer
          sources={SOURCES}
          autoplay={false}
          poster={`${server}/uploads/${props.activVideo?.preview}`}
          key={props.activVideo?.url720}
          playbackRateControl
          playbackRates={[0.5, 1, 1.5, 2]}
        />

        <div
          className={
            isHovered
              ? `${styles.permission} ${styles.permissionShow}`
              : styles.permission
          }
        >
          {!permissionShow && (
            <p
              onClick={() => setPermissionShow(!permissionShow)}
              onMouseEnter={handleMouseEnter} // Обработчик наведения
              onMouseMove={handleMouseMove} // Обработчик движения мыши
              onMouseLeave={handleMouseLeave} // Обработчик ухода мыши
            >
              {permission}
            </p>
          )}
          {permissionShow && (
            <ul
              onMouseEnter={handleMouseEnter} // Обработчик наведения
              onMouseMove={handleMouseMove} // Обработчик движения мыши
              onMouseLeave={handleMouseLeave} // Обработчик ухода мыши
            >
              <li onClick={() => liClick("480")}>480px</li>
              <li onClick={() => liClick("720")}>720px</li>
              <li onClick={() => liClick("1080")}>1080px</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
