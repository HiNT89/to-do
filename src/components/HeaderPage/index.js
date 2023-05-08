import clsx from "clsx";
import styles from "./HeadePage.module.scss";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
function HeaderPage({ data, handleSort }) {
  const { titlePage, color, day } = data;
  const [showSort, setShowSort] = useState("none");
  const handleOpenSort = (e) => {
    setShowSort("none");
    e.stopPropagation();
  };
  return (
    <div className={clsx(styles.wrapper)}>
      <div className={clsx(styles.header)}>
        <Link to="/" style={{ color: `${color}` }}>
          <i className="fa-solid fa-chevron-left"></i>
          <span>danh sách</span>
        </Link>
        <Button
          className={clsx(styles.header_sort)}
          onClick={() => setShowSort("flex")}
          style={{ color: `${color}` }}
        >
          <i className="fa-solid fa-ellipsis"></i>
          <div
            className={clsx(styles.header_sort_list)}
            style={{ display: `${showSort}` }}
          >
            <div
              className={clsx(styles.header_sort_item)}
              onClick={(e) => {
                handleOpenSort(e);
                handleSort("important");
              }}
            >
              <i className="fa-regular fa-star"></i>
              tầm quan trọng
            </div>
            <div
              className={clsx(styles.header_sort_item)}
              onClick={(e) => {
                handleOpenSort(e);
                handleSort("az");
              }}
            >
              <i className="fa-solid fa-arrow-down-a-z"></i>theo A - Z
            </div>
            <div
              className={clsx(styles.header_sort_item)}
              onClick={(e) => {
                handleOpenSort(e);
                handleSort("timeEnd");
              }}
            >
              <i className="fa-regular fa-calendar"></i> ngày đến hạn
            </div>
            <div
              className={clsx(styles.header_sort_item)}
              onClick={(e) => {
                handleOpenSort(e);
                handleSort("timeStart");
              }}
            >
              <i className="fa-solid fa-calendar-plus"></i>ngày tạo
            </div>
          </div>
        </Button>
      </div>
      <div className={clsx(styles.content_top)} style={{ color: `${color}` }}>
        <h1>{titlePage}</h1>
        {day ? <span>{day}</span> : ""}
      </div>
    </div>
  );
}

export default HeaderPage;
