import React, { useRef, useEffect, useState } from "react";
import CoursPageModule from "../../modules/CoursPageModule/CoursPageModule";
import styles from "./CoursVideo.module.scss";
import TestRez from "../../components/TestRez/TestRez";
import { useSelector } from "react-redux";
import { apiGetProgress, apiGetvideoBlock } from "../../api/ApiRequest";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";

function CoursVideo() {
  const server = process.env.REACT_APP_API_URL;
  const store = useSelector((state) => state.coursesSlice);
  const [activVideo, setActivVideo] = useState({});
  const [linkVideo, setLinkVideo] = useState([]);

  useEffect(() => {
    apiGetvideoBlock(store?.idSelectBlock).then((res) => {
      if (res?.status === 200) {
        setLinkVideo(res.data);
      }
    });


  }, [store?.selectBlock, store?.idSelectBlock, store?.idSelectTest]);

  const funSetActiveVideo = (item) => {
    setActivVideo(item);
  };

 
  return (
    <div className={styles.CoursVideo}>
      <CoursPageModule>
        <div className={styles.CoursVideoContainer}>
          <div className={styles.CoursBlockVideo__Inner}>
            <div className={styles.CoursBlockVideo__title}>
              <h2>Материалы по {store.selectBlock} блоку</h2>
            </div>
            {activVideo?.m3u8 && (
              <div className={styles.activeVideo}>
                <VideoPlayer
                  activVideo={activVideo}
                  videoLength={(activVideo?.duration / 60).toFixed(0) || 20}
                />
              </div>
            )}

            <div className={styles.CoursBlockVideo}>
              {linkVideo?.map((item, index) => (
                <div className={styles.CardCursVideoInner} key={index}>
                  <div className={styles.VideoElement}>
                    <div
                      className={styles.playVideo}
                      onClick={() => funSetActiveVideo(item)}
                    >
                      <img
                        src={`${server}/uploads/${item?.preview}`}
                        alt="Play"
                      />
                      <p>{(item?.duration / 60).toFixed(0) || 20} мин</p>
                    </div>
                  </div>
                  <p>{index + 1} серия</p>
                </div>
              ))}
              {linkVideo.length != 8 && (
                <div className={styles.CursVideoNotData}>
                  <p>Скоро появятся новые видео!</p>
                </div>
              )}
            </div>
            <div className={styles.TestRezBlock} style={{ marginLeft: store?.numberSeleccttBlock === 8 && "0px" }}>
              <TestRez/>
            </div>
          </div>
        </div>
      </CoursPageModule>
    </div>
  );
}

export default CoursVideo;
