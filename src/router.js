import { createBrowserRouter } from "react-router-dom";
import NavMenu from "./components/NavMenu";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Companies from "./pages/Companies";
import DragAndDrop from "./pages/DragAndDrop";
import ShowMoreText from "./pages/ShowMoreText";

//Guest User Routes
export const router = createBrowserRouter([
  {
    path: "/",
    element: <NavMenu />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
]);

//Authenticated User Routes
export const routerAuth = createBrowserRouter([
  {
    path: "/",
    element: <NavMenu />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Companies />,
      },
      {
        path: "dragdrop",
        element: <DragAndDrop />,
      },
      {
        path: "showmoretext",
        element: <ShowMoreText />,
      },
    ],
  },
]);
