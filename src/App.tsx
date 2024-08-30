import "./index.css";
import { Outlet } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/core/styles.css";
import { ModalsProvider } from "@mantine/modals";

function App() {
  return (
    <MantineProvider>
       <ModalsProvider>
      <Notifications />
      <Outlet />
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;