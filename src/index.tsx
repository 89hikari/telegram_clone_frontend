import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./pages/auth";
import MainWindow from "./pages/main_window";

const routes = [
  {
    path: "/",
    element: <MainWindow />,
  },
  {
    path: "/chat/:peer_id",
    element: <MainWindow />,
  },
  {
    path: "/noauth",
    element: <Auth />,
  },
];

const router = createBrowserRouter(routes);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
