import clsx from "clsx";
import styles from "./FooterPage.module.scss";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
function FooterPage({ handleOnClick, colorText }) {
  return (
    <div className={clsx(styles.footer)}>
      <Button
        className={clsx(styles.footer_btn)}
        onClick={handleOnClick}
        style={{ color: `${colorText}` }}
      >
        <i className="fa-solid fa-plus"></i>
        <span>thêm tác vụ</span>
      </Button>
    </div>
  );
}

export default FooterPage;
