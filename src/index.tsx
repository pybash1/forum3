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
import { Forum } from "./lib";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/introduction",
    element: <Introduction />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/introduction/changelog",
    element: <Changelog />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/introduction/feedback",
    element: <Feedback />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/configuration",
    element: <Configuration />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/configuration/style",
    element: <Style />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/components",
    element: <Components />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/components/forum",
    element: <ForumComponent />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/components/forum-page",
    element: <ForumPageComponent />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/demo",
    element: (
      <div className="h-screen w-screen bg-gray-700">
        <Forum
          context="forum3"
          closedText="Dark Mode"
          headerText="Demo Forum"
          dark
        />
        <Forum
          context="forum3"
          closedText="Light Mode"
          headerText="Demo Forum"
          position="bottom-left"
        />
        <Forum
          context="forum3"
          closedText="Dark Mode"
          headerText="Demo Forum"
          dark
          position="top-right"
        />
        <Forum
          context="forum3"
          closedText="Light Mode"
          headerText="Demo Forum"
          position="top-left"
        />
      </div>
    ),
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
