import Auth from './pages/auth'
import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainWindow from './pages/main_window'

const routes = [
  {
    path: "/",
    element: <MainWindow />
  },
  {
    path: "/chat/:peer_id",
    element: <MainWindow />
  },
  {
    path: "/noauth",
    element: <Auth />
  }
];

const router = createBrowserRouter(routes);

const App: React.FC = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App
