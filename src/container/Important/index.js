import clsx from "clsx";
import styles from "./Important.module.scss";
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
function Important() {
  const user = useSelector(userSE);
  const dispatch = useDispatch();
  const dataTask = useSelector(dataTaskSE);
  const [day, setDay] = useState("");
  const [indexItem, setIndexItem] = useState();
  const [listTask, setListTask] = useState([]);

  const [dataDetail, setDataDetail] = useState();
  const [detail, setDetail] = useState({
    isOpen: false,
    id: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const [taskNameModal, setTaskNameModal] = useState("");

  // effect
  useEffect(() => {
    dispatch(getDataTaskAC());
  }, []);
  useEffect(() => {
    const listTaskImportant = dataTask.filter(
      (it) => it.type.includes("important") && !it.status
    );
    setListTask(listTaskImportant);
  }, [dataTask]);

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
      type: ["important"],
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
  const handleToggleShowComplete = () => {};
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
          typeDetail={"important"}
          settingColor={{
            star: "#a62b5d",
          }}
          handleDeleteTask={handleDeleteTask}
        />
      ) : (
        <div className={clsx(styles.wrapper)}>
          <div>
            <HeaderPage data={{ titlePage: "quan trọng", color: "#923f61" }} />
            <ContentPage
              listTaskComplete={[]}
              listTaskNotComplete={listTask}
              handleUpdateTask={handleUpdateTask}
              handleOnImportant={handleOnImportant}
              handleOnClickItem={handleOnClickItem}
              isShowListComplete={false}
              handleToggleShowComplete={handleToggleShowComplete}
              color={"#923f61"}
            />
            <FooterPage
              handleOnClick={() => setOpenModal(true)}
              colorText={"#923f61"}
            />
            <Modal
              open={openModal}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <div className={clsx(styles.box_modal)}>
                <div className={clsx(styles.box_modal_top)}>
                  <div className={clsx(styles.left)}>
                    <i className={"fa-regular fa-circle"}></i>
                  </div>
                  <input
                    type="text"
                    className={clsx(styles.box_modal_input)}
                    placeholder="thêm tác vụ"
                    autoFocus={true}
                    value={taskNameModal}
                    onChange={(e) => setTaskNameModal(e.target.value)}
                  />
                </div>

                <div className={clsx(styles.box_modal_btns)}>
                  <Button
                    className={clsx(styles.box_modal_btn)}
                    onClick={handleClose}
                  >
                    hủy
                  </Button>
                  <Button
                    className={clsx(styles.box_modal_btn)}
                    onClick={handleAddTask}
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

export default Important;
