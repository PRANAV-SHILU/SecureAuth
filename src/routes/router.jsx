import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../Layout/AppLayout.jsx";
import NotFoundPage from "../pages/PageNotFound.jsx";

import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Edit from "../pages/Edit.jsx";

import { registerAction } from "../actions/registerAction";
import { loginAction } from "../actions/loginAction";
import { logoutAction } from "../actions/logoutAction";

import { requireAuth } from "../loaders/requireAuth";
import { checkCurrentUser } from "../loaders/checkCurrentUser";

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
      {
        path: "dashboard",
        Component: Dashboard,
        loader: requireAuth,
        action: logoutAction,
      },
      { path: "edit/:userID", Component: Edit, loader: requireAuth },
    ],
  },
  { path: "*", Component: NotFoundPage },
]);

export default router;
