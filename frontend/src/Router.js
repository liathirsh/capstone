import LeadershipBoard from "./components/LeadershipBoard";
import PackageList from "./components/PackageList";
import Package from "./components/Package";
import App from "./App";
import FourOhFour from "./pages/404";
import Home from "./pages/Home";
import { Navigate, Router } from "react-router-dom";

export const routes = [
  {
    element: <Home />,
    path: "/",
  },
  {
    element: <PackageList />,
    path: "/packages",
  },
  {
    element: <App />,
    path: "/",
  },
  {
    path: "/404",
    element: <FourOhFour />,
  },
  {
    path: "*",
    element: <Navigate to="/404" replace />,
  },
];

//export default Router;
