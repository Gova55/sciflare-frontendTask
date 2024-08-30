import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App";
import "@mantine/notifications/styles.css";
import Login from "./pages/Login";
import User from "./pages/user";
import Admin from "./pages/admin";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Login />} />
      <Route path="/User" element={<User />} />
      <Route path="/Admin" element={<Admin />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<RouterProvider router={router} />);
