import clsx from "clsx";
import styles from "./Item.module.scss";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { handleShowTimeEnd } from "~/funtion";
function Item({
  handleUpdateTask,
  handleOnImportant,
  data,
  isShowInfoBottom,
  onClick,
  settingColor,
}) {
  const [settingCSS, setSettingCSS] = useState({});
  const { id, taskName, timeEnd } = data;
  const [showTimeEnd, setShowTimeEnd] = useState(timeEnd);
  const [colorTimeEnd, setColorTimeEnd] = useState(false);
  useEffect(() => {
    const textDecorationLine = data.status ? `line-through` : `none`;
    setSettingCSS({
      textDecorationLine,
    });
  }, [data.status]);

  useEffect(() => {
    if (timeEnd) {
      setShowTimeEnd(handleShowTimeEnd(timeEnd));
    } else {
      setShowTimeEnd("");
    }
    const timeEndFormat = new Date(data.timeEnd);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    setColorTimeEnd(timeEndFormat < yesterday);
  }, [data]);
  return (
    <div className={clsx(styles.wrapper)}>
      <div className={clsx(styles.left)}>
        <Button
          style={{ color: `${settingColor.star}`, minWidth: "0px" }}
          onClick={() => handleUpdateTask({ ...data, status: !data.status })}
        >
          {data.status ? (
            <FontAwesomeIcon icon="fa-solid fa-circle-check" />
          ) : (
            <FontAwesomeIcon icon="fa-regular fa-circle" />
          )}
        </Button>
      </div>

      <div className={clsx(styles.info)} onClick={() => onClick(id)}>
        <h3
          className={clsx(styles.info_name)}
          style={{ textDecorationLine: `${settingCSS.textDecorationLine}` }}
        >
          {taskName}
        </h3>
        {isShowInfoBottom ? (
          <div className={clsx(styles.info_bottom)}>
            <span className={clsx(styles.info_type)}>tác vụ</span>
            {timeEnd ? (
              <span
                className={clsx(styles.info_time)}
                style={{ color: colorTimeEnd ? "#a2365c" : "#000" }}
              >
                <span> - </span>
                <i className="fa-regular fa-calendar"></i>
                <span>{showTimeEnd}</span>
              </span>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
      </div>
      <div className={clsx(styles.right)}>
        <Button
          style={{ color: `${settingColor.star}` }}
          onClick={() => handleOnImportant(data)}
        >
          {data.type.includes("important") ? (
            <FontAwesomeIcon icon="fa-solid fa-star" />
          ) : (
            <FontAwesomeIcon icon="fa-regular fa-star" />
          )}
        </Button>
      </div>
    </div>
  );
}

export default Item;
