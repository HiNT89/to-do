import clsx from "clsx";
import styles from "./Detail.module.scss";
import { Button } from "@mui/material";
import moment from "moment";
import listNav from "~/container/Home/listNav";
import { showTimeStart, handleShowTimeEnd } from "~/funtion";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Detail({
  handleOnImportant,
  data,
  onClickBack,
  handleUpdateTask,
  toggleToday,
  typeDetail,
  settingColor,
  handleDeleteTask,
}) {
  const { id, taskName, timeStart, type, status, note, timeEnd } = data;
  const [settingCSS, setSettingCSS] = useState({});
  const [valueInput, setValueInput] = useState({
    valueTaskName: taskName,
    valueTimeEnd: timeEnd,
  });
  const [showTimeEnd, setShowTimeEnd] = useState(timeEnd);
  const [isShowSubmit, setIsShowSubmit] = useState(false);
  const [noteTask, setNoteTask] = useState(note);
  const [focusDate, setFocusDate] = useState(false);
  useEffect(() => {
    const textDecorationLine = status ? `line-through` : `none`;
    setSettingCSS({
      textDecorationLine,
    });
  }, [status]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      handleUpdateTask({ ...data, note: noteTask });
    }, 3000);
    return () => clearTimeout(timeout);
  }, [noteTask]);
  useEffect(() => {
    setShowTimeEnd(handleShowTimeEnd(timeEnd));
  }, [data]);
  const handleOnChangeInput = (e) => {
    setValueInput({ ...valueInput, valueTaskName: e.target.value });
    setIsShowSubmit(true);
  };
  const handleToggleToday = () => {
    toggleToday(data);
  };
  const navItem = listNav.filter((it) => it.type === typeDetail)[0];
  const handleSubmit = () => {
    let dataNew = {
      ...data,
      taskName: valueInput.valueTaskName,
      timeEnd: valueInput.valueTimeEnd,
    };
    if (valueInput.valueTimeEnd) {
      dataNew = { ...dataNew, type: [...dataNew.type, "calendar"] };
    } else {
      dataNew = {
        ...dataNew,
        type: dataNew.type.filter((it) => it !== "calendar"),
      };
    }
    handleUpdateTask(dataNew);
    setIsShowSubmit(false);
  };
  return (
    <div className={clsx(styles.wrapper)}>
      <div className={clsx(styles.top)}>
        <Button
          className={clsx(styles.btn_back)}
          style={{ color: `${navItem.color}` }}
          onClick={onClickBack}
        >
          <i className="fa-solid fa-chevron-left"></i>
          <span>{navItem.name}</span>
        </Button>
        {isShowSubmit ? (
          <Button
            className={clsx(styles.btn_back)}
            style={{ color: `blue` }}
            onClick={handleSubmit}
          >
            <span>hoàn thành</span>
          </Button>
        ) : (
          ""
        )}
      </div>

      <div className={clsx(styles.wrapperItem)}>
        <div className={clsx(styles.left)}>
          <Button
            style={{ color: `#687582`, minWidth: "0px" }}
            onClick={() => handleUpdateTask({ ...data, status: !status })}
          >
            {status ? (
              <FontAwesomeIcon icon="fa-solid fa-circle-check" />
            ) : (
              <FontAwesomeIcon icon="fa-regular fa-circle" />
            )}
          </Button>
        </div>

        <div className={clsx(styles.info)}>
          <input
            type="text"
            className={clsx(styles.info_name)}
            style={{ textDecorationLine: `${settingCSS.textDecorationLine}` }}
            value={valueInput.valueTaskName}
            onChange={(e) => handleOnChangeInput(e)}
          />
        </div>
        <div className={clsx(styles.right)}>
          <Button
            style={{ color: `${settingColor.star}`, minWidth: "0px" }}
            onClick={() => handleOnImportant(data)}
          >
            {type.includes("important") ? (
              <FontAwesomeIcon icon="fa-solid fa-star" />
            ) : (
              <FontAwesomeIcon icon="fa-regular fa-star" />
            )}
          </Button>
        </div>
      </div>
      <div className={clsx(styles.addToday)}>
        {type.includes("today") ? (
          <Button
            className={clsx(styles.addToday_btn)}
            onClick={handleToggleToday}
          >
            <i className="fa-solid fa-lightbulb"></i>
            <span>đã thêm vào ngày của tôi</span>
          </Button>
        ) : (
          <Button
            className={clsx(styles.addToday_btn_NA)}
            onClick={handleToggleToday}
          >
            <i className="fa-solid fa-lightbulb"></i>
            <span> thêm vào ngày của tôi</span>
          </Button>
        )}
      </div>
      <div className={clsx(styles.addToday)}>
        {timeEnd ? (
          <Button
            className={clsx(styles.addToday_btn)}
            onClick={() =>
              handleUpdateTask({
                ...data,
                taskName: valueInput.valueTaskName,
                timeEnd: "",
              })
            }
          >
            <i className="fa-regular fa-calendar"></i>
            <span> đến hạn vào {showTimeEnd}</span>
          </Button>
        ) : (
          <Button
            className={clsx(styles.addToday_btn_NA)}
            onClick={() => {
              setFocusDate(true);
              setIsShowSubmit(true);
            }}
          >
            <i className="fa-regular fa-calendar"></i>
            {focusDate ? (
              <input
                type="date"
                value={valueInput.valueTimeEnd}
                autoFocus
                onChange={(e) =>
                  setValueInput({ ...valueInput, valueTimeEnd: e.target.value })
                }
              />
            ) : (
              <label for="date">thêm ngày đến hạn</label>
            )}
          </Button>
        )}
      </div>
      <div className={clsx(styles.note)}>
        <textarea
          placeholder="Ghi chú"
          onChange={(e) => setNoteTask(e.target.value)}
        >
          {noteTask}
        </textarea>
      </div>
      <div className={clsx(styles.footer)}>
        <span> {showTimeStart(timeStart)}</span>
        <Button
          style={{ color: `${settingColor.star}` }}
          onClick={handleDeleteTask}
        >
          <i className="fa-solid fa-trash"></i>
        </Button>
      </div>
    </div>
  );
}

export default Detail;
