import { createBrowserRouter } from "react-router";
import { MainPage, FavPage, FilmPage } from "../pages";
import { BasicLayout } from "./BasicLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <BasicLayout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: "fav", element: <FavPage /> },
      { path: "film/:id", element: <FilmPage /> },
    ],
  },
]);
