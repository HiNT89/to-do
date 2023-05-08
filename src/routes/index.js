import configRoutes from "../config";
// Pages
import Home from "../container/Home";
import Today from "~/container/Today";
import Task from "~/container/Task";
import Important from "~/container/Important";
import Login from "~/container/Login";
import Calendar from "~/container/Calendar";
// Public routes
const publicRoutes = [
  { path: configRoutes.home, component: Home },
  { path: configRoutes.today, component: Today },
  { path: configRoutes.task, component: Task },
  { path: configRoutes.important, component: Important },
  { path: configRoutes.calendar, component: Calendar },
  { path: configRoutes.login, component: Login },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
