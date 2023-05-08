import clsx from "clsx";
import styles from "./Task.module.scss";
import { useEffect, useState } from "react";
import { Button, Modal } from "@mui/material";
import Detail from "~/components/Detail";
import moment from "moment";
import { userSE, dataTaskSE } from "~/selectors";
import { useSelector, useDispatch } from "react-redux";

import {
  addTaskAC,
  getDataTaskAC,
  updateTaskAC,
  deleteTaskAC,
} from "../Home/action";
import HeaderPage from "~/components/HeaderPage";
import FooterPage from "~/components/FooterPage";
import ContentPage from "~/components/ContentPage";
function Task() {
  const user = useSelector(userSE);
  const dispatch = useDispatch();
  const dataTask = useSelector(dataTaskSE);
  const [day, setDay] = useState("");
  const [indexItem, setIndexItem] = useState();
  const [listTask, setListTask] = useState([]);
  const [listTaskComplete, setListComplete] = useState([]);
  const [listTaskNotComplete, setListNotComplete] = useState([]);
  const [isShowListComplete, setIsShowListComplete] = useState(
    !!listTaskComplete.length
  );
  const [dataDetail, setDataDetail] = useState();
  const [detail, setDetail] = useState({
    isOpen: false,
    id: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const [taskNameModal, setTaskNameModal] = useState("");
  const [showSort, setShowSort] = useState("none");
  // effect
  useEffect(() => {
    dispatch(getDataTaskAC());
  }, []);
  useEffect(() => {
    const listTaskNew = dataTask;
    const listTaskCompleteNew = [];
    const listTaskNotCompleteNew = [];
    listTaskNew.forEach((it) =>
      it.status ? listTaskCompleteNew.push(it) : listTaskNotCompleteNew.push(it)
    );
    setListTask(listTaskNew);
    setListComplete(listTaskCompleteNew);
    setListNotComplete(listTaskNotCompleteNew);
  }, [dataTask]);
  useEffect(() => {
    setIsShowListComplete(listTaskComplete.length);
  }, [listTaskComplete]);
  useEffect(() => {
    setDataDetail(dataTask.filter((it) => it.id === detail.id)[0]);
  }, [listTask]);
  const handleUpdateTask = (item) => {
    dispatch(
      updateTaskAC({
        id: item.id,
        email: user.email,
        data: item,
      })
    );
  };
  const handleAddTask = () => {
    const data = {
      taskName: taskNameModal,
      timeStart: moment().format(),
      timeEnd: "",
      type: [],
      status: false,
      note: "",
    };
    dispatch(
      addTaskAC({
        email: user.email,
        data,
      })
    );
    setTaskNameModal("");
    setOpenModal(false);
  };
  const handleOnImportant = (item) => {
    const data = item.type.includes("important")
      ? { ...item, type: item.type.filter((it) => it !== "important") }
      : { ...item, type: [...item.type, "important"] };

    dispatch(
      updateTaskAC({
        id: item.id,
        email: user.email,
        data,
      })
    );
  };
  const toggleToday = (item) => {
    const data = item.type.includes("today")
      ? { ...item, type: item.type.filter((it) => it !== "today") }
      : { ...item, type: [...item.type, "today"] };
    dispatch(
      updateTaskAC({
        id: item.id,
        email: user.email,
        data,
      })
    );
  };
  const handleOnClickItem = (id) => {
    setIndexItem(id);
    setDetail({
      isOpen: true,
      id: id,
    });
    setDataDetail(listTask.filter((it) => it.id === id)[0]);
  };
  const handleOnClickBack = () => {
    setDetail({
      isOpen: false,
      id: "",
    });
  };
  const handleClose = () => {
    setOpenModal(false);
  };
  const handleToggleShowComplete = () => {
    setIsShowListComplete(!isShowListComplete);
  };
  const handleDeleteTask = () => {
    dispatch(
      deleteTaskAC({
        email: "2001hieunt89@gmail.com",
        id: detail.id,
      })
    );
    setDetail({
      isOpen: false,
      id: "",
    });
  };
  return (
    <>
      {detail.isOpen ? (
        <Detail
          handleOnImportant={handleOnImportant}
          data={dataDetail}
          onClickBack={handleOnClickBack}
          handleUpdateTask={handleUpdateTask}
          toggleToday={toggleToday}
          typeDetail={"all"}
          settingColor={{
            star: "#5e6ebf",
          }}
          handleDeleteTask={handleDeleteTask}
        />
      ) : (
        <div
          className={clsx(styles.wrapper)}
          style={{ background: `linear-gradient(#43cea2, #185a9d)` }}
        >
          <div>
            <HeaderPage data={{ titlePage: "tác vụ", color: "#fff" }} />
            <ContentPage
              listTaskComplete={listTaskComplete}
              listTaskNotComplete={listTaskNotComplete}
              handleUpdateTask={handleUpdateTask}
              handleOnImportant={handleOnImportant}
              handleOnClickItem={handleOnClickItem}
              isShowListComplete={isShowListComplete}
              handleToggleShowComplete={handleToggleShowComplete}
              color={"#5e6ebf"}
            />
            <FooterPage
              handleOnClick={() => setOpenModal(true)}
              colorText={"#fff"}
            />
            <Modal
              open={openModal}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <div className={clsx(styles.box_modal)}>
                <div className={clsx(styles.box_modal_top)}>
                  <div
                    className={clsx(styles.left)}
                    style={{ color: "#5e6ebf" }}
                  >
                    <i className={"fa-regular fa-circle"}></i>
                  </div>
                  <input
                    type="text"
                    className={clsx(styles.box_modal_input)}
                    placeholder="thêm tác vụ"
                    autoFocus={true}
                    value={taskNameModal}
                    onChange={(e) => setTaskNameModal(e.target.value)}
                    style={{ color: "#5e6ebf" }}
                  />
                </div>
                <div className={clsx(styles.box_modal_btns)}>
                  <Button
                    className={clsx(styles.box_modal_btn)}
                    onClick={handleClose}
                    style={{ background: "#5e6ebf" }}
                  >
                    hủy
                  </Button>
                  <Button
                    className={clsx(styles.box_modal_btn)}
                    onClick={handleAddTask}
                    style={{ background: "#5e6ebf" }}
                  >
                    hoàn thành
                  </Button>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      )}
    </>
  );
}

export default Task;
