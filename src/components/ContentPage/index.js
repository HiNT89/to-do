import clsx from "clsx";
import styles from "./ContentPage.module.scss";
import Item from "~/components/Item";
import "./style.css";
import { Button } from "@mui/material";
function ContentPage({
  listTaskNotComplete,
  listTaskComplete,
  handleUpdateTask,
  handleOnImportant,
  handleOnClickItem,
  isShowListComplete,
  handleToggleShowComplete,
  color,
  heightCustom,
}) {
  return (
    <div
      className={clsx(styles.content)}
      style={{ height: heightCustom ? "calc(100vh - 236px)" : "calc(100vh - 200px)" }}
    >
      <div className={clsx(styles.content_notComplete)}>
        {listTaskNotComplete.map((it, index) => (
          <Item
            key={index}
            handleUpdateTask={handleUpdateTask}
            handleOnImportant={handleOnImportant}
            data={it}
            isShowInfoBottom={true}
            onClick={handleOnClickItem}
            settingColor={{
              star: color,
            }}
          />
        ))}
      </div>
      {listTaskComplete.length ? (
        <div className={clsx(styles.content_complete)}>
          <Button
            className={clsx(
              isShowListComplete
                ? styles.content_complete_btn
                : styles.content_complete_btn_NA
            )}
            onClick={handleToggleShowComplete}
          >
            {isShowListComplete ? (
              <span className="btn_show">
                <i className="fa-solid fa-chevron-down "></i>
              </span>
            ) : (
              <span className="btn_show_NA">
                <i className="fa-solid fa-chevron-down "></i>
              </span>
            )}
            <span>đã hoàn thành</span>
          </Button>
          {isShowListComplete
            ? listTaskComplete.map((it, index) => (
                <Item
                  key={index}
                  handleUpdateTask={handleUpdateTask}
                  handleOnImportant={handleOnImportant}
                  data={it}
                  isShowInfoBottom={true}
                  onClick={handleOnClickItem}
                  settingColor={{
                    star: color,
                  }}
                />
              ))
            : ""}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default ContentPage;
