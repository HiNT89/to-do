import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Button, Modal } from "@mui/material";
import moment from "moment";
import styles from "./Today.module.scss";
import Detail from "~/components/Detail";
import { userSE, dataTaskSE } from "~/selectors";
import {
  addTaskAC,
  deleteTaskAC,
  getDataTaskAC,
  updateTaskAC,
} from "../Home/action";
import HeaderPage from "~/components/HeaderPage";
import FooterPage from "~/components/FooterPage";
import ContentPage from "~/components/ContentPage";
function Today() {
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
  const [typeShort, setTypeShort] = useState("default");
  const [them, setTheme] = useState({
    colorItem: "",
    colorBg: "",
    colorBgDetail: "",
  });
  // effect
  useEffect(() => {
    dispatch(getDataTaskAC());
    const time = moment().hour();
    if (time > 18) {
    }
  }, []);
  useEffect(() => {
    let newListTask = dataTask.filter((it) => it.type.includes("today"));
    switch (typeShort) {
      case "important":
        {
          const listImportant = [];
          const listNotImportant = [];
          newListTask.forEach((it) => {
            if (it.type.includes("important")) {
              listImportant.push(it);
            } else {
              listNotImportant.push(it);
            }
          });
          newListTask = [...listImportant, ...listNotImportant];
        }
        break;
      case "timeEnd":
        {
          let listTaskTimeEnd = [];
          let listTaskNotTimeEnd = [];
          newListTask.forEach((it) => {
            it.timeEnd ? listTaskTimeEnd.push(it) : listTaskNotTimeEnd.push(it);
          });
          listTaskTimeEnd = listTaskTimeEnd.sort((a, b) => {
            const timeEndA = new Date(a.timeEnd);
            const timeEndB = new Date(b.timeEnd);
            return timeEndA - timeEndB;
          });
          newListTask = [...listTaskTimeEnd, ...listTaskNotTimeEnd];
        }
        break;
      case "timeStart":
        {
          newListTask = newListTask.sort((a, b) => {
            const timeEndA = new Date(a.timeStart);
            const timeEndB = new Date(b.timeStart);
            return timeEndB - timeEndA;
          });
        }
        break;
      case "az":
        {
          newListTask = newListTask.sort((a, b) => {
            const timeEndA = new Date(a.taskName);
            const timeEndB = new Date(b.taskName);
            return timeEndA - timeEndB;
          });
        }
        break;
      default: {
      }
    }
    const listTaskCompleteNew = [];
    const listTaskNotCompleteNew = [];
    newListTask.forEach((it) =>
      it.status ? listTaskCompleteNew.push(it) : listTaskNotCompleteNew.push(it)
    );
    setListTask(newListTask);
    setListComplete(listTaskCompleteNew);
    setListNotComplete(listTaskNotCompleteNew);
  }, [typeShort]);
  useEffect(() => {
    const listTaskToday = dataTask.filter((it) => it.type.includes("today"));
    const listTaskCompleteNew = [];
    const listTaskNotCompleteNew = [];
    listTaskToday.forEach((it) =>
      it.status ? listTaskCompleteNew.push(it) : listTaskNotCompleteNew.push(it)
    );
    setListTask(listTaskToday);
    setListComplete(listTaskCompleteNew);
    setListNotComplete(listTaskNotCompleteNew);
  }, [dataTask]);
  useEffect(() => {
    setIsShowListComplete(listTaskComplete.length);
  }, [listTaskComplete]);
  useEffect(() => {
    setDataDetail(dataTask.filter((it) => it.id === detail.id)[0]);
  }, [listTask]);
  useEffect(() => {
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let dayofweek = d.getDay();
    const dayname = [
      "chủ nhật",
      "thứ 2",
      "thứ 3",
      "thứ 4",
      "thứ 5",
      "thứ 6",
      " thứ 7",
    ];
    setDay(
      dayname[dayofweek] + " , " + day + " tháng " + month + " năm " + year
    );
  }, []);
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
      type: ["today"],
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
  const handleSort = (type) => {
    setTypeShort(type);
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
          typeDetail={"today"}
          settingColor={{
            star: "#6b7380",
          }}
          handleDeleteTask={handleDeleteTask}
        />
      ) : (
        <div
          className={clsx(styles.wrapper)}
          style={{ background: `linear-gradient(#fc00ff, #00dbde)` }}
        >
          <div>
            <HeaderPage
              data={{ titlePage: "ngày của tôi", color: "#fff", day }}
              handleSort={handleSort}
            />
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

export default Today;
