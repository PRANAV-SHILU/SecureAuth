import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../Layout/AppLayout.jsx";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Edit from "../pages/Edit.jsx";
import NotFoundPage from "../pages/PageNotFound.jsx";
import {
  loginAction,
  registerAction,
  logoutAction,
  requireAuth,
  checkCurrentUser,
} from "./actionsLoaders.jsx";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    Component: AppLayout,
    loader: checkCurrentUser,
    children: [
      { index: true, Component: Home },
      { path: "login", Component: Login, action: loginAction },
      { path: "register", Component: Register, action: registerAction },
      {path: "dashboard",Component: Dashboard,loader: requireAuth,action: logoutAction, },
      { path: "edit/:userID", Component: Edit, loader: requireAuth },
    ],
  },
  { path: "*", Component: NotFoundPage },
]);

export default router;
