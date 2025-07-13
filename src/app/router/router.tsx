import { createBrowserRouter } from 'react-router'
import { 
  MainPage,
  FavPage,
  FilmPage
} from "../pages"

export const router = createBrowserRouter([
  {
    path:"/",
    element: <MainPage/>,
  },
  {
    path:"/fav",
    element: <FavPage/>
  },
  {
    path: "/film",
    element: <FilmPage/>
  }
])
