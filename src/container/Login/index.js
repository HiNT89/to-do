import clsx from "clsx";
import styles from "./Login.module.scss";
import bg from "~/assets/imgs/bg_login.jpg";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginAC } from "./action";
import { loginSE, userSE, dataTaskSE } from "~/selectors";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDataTaskAC } from "../Home/action";
function Login() {
  const dispatch = useDispatch();
  const login = useSelector(loginSE);
  const user = useSelector(userSE);
  const dataTask = useSelector(dataTaskSE);

  const navigate = useNavigate();
  useEffect(() => {
    if (login) {
      dispatch(getDataTaskAC(user.email));
      navigate("/");
    }
  }, [login]);
  const handleLogin = () => {
    dispatch(loginAC());
  };
  return (
    <div className={clsx(styles.wrapper)}>
      <h1 className={clsx(styles.title)}>chào mừng bạn đến to do app </h1>
      <img src={bg} className={clsx(styles.img)} />
      <Button className={clsx(styles.btn)} onClick={handleLogin}>
        <i className="fa-brands fa-google"></i>
        <span>đăng nhập bằng gmail</span>
      </Button>
    </div>
  );
}

export default Login;
