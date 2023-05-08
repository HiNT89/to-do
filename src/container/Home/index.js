import clsx from "clsx";
import styles from "./Home.module.scss";
import listNav from "./listNav";
import { Button, Avatar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { userSE, loginSE, dataTaskSE } from "~/selectors";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import defaultIMG from "~/assets/imgs/hint.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logoutAC } from "../Login/action";
function Home() {
  const user = useSelector(userSE);
  const isLogin = useSelector(loginSE);
  const dataTask = useSelector(dataTaskSE);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // state
  const [countTask, setCountTask] = useState({
    today: "",
    calendar: "",
    important: "",
    all: "",
  });
  // effect
  useEffect(() => {
    if (!isLogin) navigate("/login");
  }, [isLogin]);
  useEffect(() => {
    let today = 0;
    let calendar = 0;
    let important = 0;
    let all = dataTask.length;

    dataTask.forEach((element) => {
      today += element.type.includes("today") ? 1 : 0;
      calendar += element.type.includes("calendar") ? 1 : 0;
      important +=
        element.type.includes("important") && !element.status ? 1 : 0;
    });
    setCountTask({
      today,
      calendar,
      important,
      all,
    });
  }, [dataTask]);
  return (
    <div className={clsx(styles.wrapper)}>
      <div className={clsx(styles.header)}>
        <Avatar
          alt={(user.displayName || "a").toUpperCase()}
          src={user.photoURL || defaultIMG}
          className={clsx(styles.avatar)}
        />
        <span className={clsx(styles.name)}>{user.displayName}</span>
        <Button
          className={clsx(styles.btn)}
          onClick={() => dispatch(logoutAC())}
        >
          <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" />
        </Button>
      </div>
      <div className={clsx(styles.content)}>
        {listNav.map((it) => {
          const { id, icon, color, name, type, path } = it;
          return (
            <Link to={path} key={id} className={clsx(styles.item)}>
              <i style={{ color: `${color}` }} className={icon}></i>
              <span className={clsx(styles.item_name)}>{name}</span>
              <span className={clsx(styles.item_count)}>{countTask[type]}</span>
            </Link>
          );
        })}
      </div>
      {/* <FooterPage /> */}
      <div className={clsx(styles.footer)}>
        <span>Cover by HiNT</span>
      </div>
    </div>
  );
}

export default Home;
