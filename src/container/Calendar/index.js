import clsx from "clsx";
import styles from "./Calendar.module.scss";
import { useEffect, useState } from "react";
import { Button, Modal } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import "./style.css";
import HeaderPage from "~/components/HeaderPage";
import FooterPage from "~/components/FooterPage";
import ContentPage from "~/components/ContentPage";
function Calendar() {
  const user = useSelector(userSE);
  const dispatch = useDispatch();
  const dataTask = useSelector(dataTaskSE);
  const [day, setDay] = useState("");
  const [indexItem, setIndexItem] = useState();
  const [listTask, setListTask] = useState([]);
  const [typeCalendar, setTypeCalendar] = useState("tất cả đã được kế hoạch");
  const [showOption, setShowOption] = useState(false);
  const [dataDetail, setDataDetail] = useState();
  const [detail, setDetail] = useState({
    isOpen: false,
    id: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const [taskNameModal, setTaskNameModal] = useState("");
  const [valueModal, setValueModal] = useState({
    taskNameModal: "",
    dateModal: new Date(),
  });
  // effect
  useEffect(() => {
    dispatch(getDataTaskAC());
  }, []);
  useEffect(() => {
    const listTaskCalendar = dataTask.filter(
      (it) => it.type.includes("calendar") && !it.status
    );
    setListTask(listTaskCalendar);
  }, [dataTask]);

  useEffect(() => {
    setDataDetail(dataTask.filter((it) => it.id === detail.id)[0]);
  }, [listTask]);
  useEffect(() => {
    let newListTask = dataTask.filter(
      (it) => it.type.includes("calendar") && !it.status
    );
    switch (typeCalendar) {
      case "ngày mai":
        {
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          newListTask = newListTask.filter((it) => {
            const timeEndFormat = new Date(it.timeEnd).toDateString();
            return timeEndFormat === tomorrow.toDateString();
          });
        }
        break;
      case "hôm nay":
        {
          const today = new Date().toDateString();
          newListTask = newListTask.filter((it) => {
            const timeEndFormat = new Date(it.timeEnd).toDateString();
            return timeEndFormat === today;
          });
        }
        break;
      case "quá hạn":
        {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          newListTask = newListTask.filter((it) => {
            const timeEndFormat = new Date(it.timeEnd);
            return timeEndFormat < yesterday;
          });
        }
        break;
      default: {
      }
    }
    setListTask(newListTask);
  }, [typeCalendar]);
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
      taskName: valueModal.taskNameModal,
      timeStart: moment().format(),
      timeEnd: valueModal.dateModal,
      type: ["calendar"],
      status: false,
      note: "",
    };
    dispatch(
      addTaskAC({
        email: user.email,
        data,
      })
    );
    setValueModal({ taskNameModal: "", dateModal: new Date() });
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
          typeDetail={"calendar"}
          settingColor={{
            star: "#287d71",
          }}
          handleDeleteTask={handleDeleteTask}
        />
      ) : (
        <div className={clsx(styles.wrapper)}>
          <div>
            <HeaderPage
              data={{ titlePage: "đã lập kế hoạch", color: "#287d71" }}
            />
            <div className={styles.content}>
              <div
                className={styles.type}
                style={{ zIndex: showOption ? "5" : "0" }}
              >
                <Button
                  className={styles.type_title}
                  onClick={() => setShowOption(!showOption)}
                >
                  <FontAwesomeIcon icon="fa-solid fa-list-ul" />
                  {typeCalendar}
                </Button>
                <div
                  className={clsx(
                    styles.type_list,
                    showOption ? "active" : "close"
                  )}
                  style={{ display: showOption ? "flex" : "none" }}
                >
                  <Button
                    className={styles.type_item}
                    onClick={() => {
                      setShowOption(!showOption);
                      setTypeCalendar("tất cả đã được kế hoạch");
                    }}
                  >
                    tất cả đã được kế hoạch
                  </Button>
                  <Button
                    className={styles.type_item}
                    onClick={() => {
                      setShowOption(!showOption);
                      setTypeCalendar("ngày mai");
                    }}
                  >
                    ngày mai
                  </Button>
                  <Button
                    className={styles.type_item}
                    onClick={() => {
                      setShowOption(!showOption);
                      setTypeCalendar("hôm nay");
                    }}
                  >
                    hôm nay
                  </Button>
                  <Button
                    className={styles.type_item}
                    onClick={() => {
                      setShowOption(!showOption);
                      setTypeCalendar("quá hạn");
                    }}
                  >
                    quá hạn
                  </Button>
                </div>
              </div>
              <ContentPage
                listTaskComplete={[]}
                listTaskNotComplete={listTask}
                handleUpdateTask={handleUpdateTask}
                handleOnImportant={handleOnImportant}
                handleOnClickItem={handleOnClickItem}
                isShowListComplete={false}
                handleToggleShowComplete={handleToggleShowComplete}
                color={"#287d71"}
                heightCustom={true}
              />
            </div>

            <FooterPage
              handleOnClick={() => setOpenModal(true)}
              colorText={"#287d71"}
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
                    value={valueModal.taskNameModal}
                    onChange={(e) =>
                      setValueModal({
                        ...valueModal,
                        taskNameModal: e.target.value,
                      })
                    }
                  />
                </div>
                <div className={clsx(styles.date_input)}>
                  <label>ngày đến hạn :</label>
                  <input
                    type="date"
                    value={valueModal.dateModal}
                    onChange={(e) =>
                      setValueModal({
                        ...valueModal,
                        dateModal: e.target.value,
                      })
                    }
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

export default Calendar;
