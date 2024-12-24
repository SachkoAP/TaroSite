import { Link, useNavigate } from "react-router-dom";
import styles from "./CardCursBlock.module.scss";
import { useDispatch } from "react-redux";
import { addSelectTest, addselectBlock, updateNumberSelectBlock } from "../../store/action/courses.slice";
import { apiTestAndVideo } from "../../api/ApiRequest";

function CardCursBlock(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cursClick = () => {
    dispatch(addselectBlock({ select: props.numberBloock, id: props.id}));
    dispatch(updateNumberSelectBlock(props.numberBloock))
    apiTestAndVideo(props.id).then((res) => {
      dispatch(addSelectTest({id :res.data.test.id}))
      navigate("/CoursVideo");
    })
  };
  return (
    <div className={styles.CardCursBlock}>
      <div className={styles.CardCursBlockInner}>
        <div className={styles.CardCursBlockInfo}>
          <p>Блок {props.numberBloock}</p>
          <p> {props.nameBlock}</p>
            <img onClick={cursClick} src="./img/back.svg" alt="" />
        </div>
      </div>
    </div>
  );
}

export default CardCursBlock;
