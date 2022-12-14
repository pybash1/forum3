import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ErrorPage from "./components/ErrorPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Introduction from "./routes/Introduction";
import Configuration from "./routes/Configuration";
import Components from "./routes/Components";
import Changelog from "./routes/introduction/Changelog";
import Feedback from "./routes/introduction/Feedback";
import Style from "./routes/configuration/Style";
import ForumComponent from "./routes/components/ForumComponent";
import ForumPageComponent from "./routes/components/ForumPageComponent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/introduction",
    element: <Introduction />,
  },
  {
    path: "/introduction/changelog",
    element: <Changelog />,
  },
  {
    path: "/introduction/feedback",
    element: <Feedback />,
  },
  {
    path: "/configuration",
    element: <Configuration />,
  },
  {
    path: "/configuration/style",
    element: <Style />,
  },
  {
    path: "/components",
    element: <Components />,
  },
  {
    path: "/components/forum",
    element: <ForumComponent />,
  },
  {
    path: "/components/forum-page",
    element: <ForumPageComponent />,
  },
])

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
