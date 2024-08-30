import { Menu, Tooltip, Avatar, rem } from "@mantine/core";
import { NavLink, useLocation } from "react-router-dom";
import { IconBuilding, IconLogout, IconUserCircle } from "@tabler/icons-react";

function Navbar() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const handleLogout = () => {
    window.location.href = "/";
  };

  const location = useLocation();

  return (
    <div className="bg-indigo-400 fixed  w-20 flex min-h-screen">
      <div className="flex flex-col space-y-5 text-center m-3">
        <div className="flex flex-row">
          <div className="text-2xl text-white italic">Task</div>
        </div>
        <div className="flex flex-col space-y-4 items-center">
          {isAdmin && (
            <NavLink
              to={"/Admin"}
              className={
                location.pathname == "/Admin"
                  ? "px-2 rounded-md pt-2 bg-white bg-opacity-30 "
                  : "px-2 rounded-md pt-2 hover:bg-slate-300 bg-opacity-30"
              }
            >
              <IconBuilding
                size={35}
                strokeWidth={1.5}
                color="white"
                className=""
              />
            </NavLink>
          )}

          {!isAdmin && (
            <NavLink
              to={"/User"}
              className={
                location.pathname == "/User"
                  ? "px-2 rounded-md pt-2 bg-white bg-opacity-30 "
                  : "px-2 rounded-md pt-2  hover:bg-slate-300 bg-opacity-30"
              }
            >
              <IconUserCircle size={32} strokeWidth={1} color="white" />
            </NavLink>
          )}
        </div>
      </div>
      <div className="text-center absolute bottom-10 left-0 w-24 m-3">
        <Menu shadow="md" position="right" offset={14} width={200}>
          <Menu.Target>
            <Tooltip
              label={localStorage.getItem("firstName")}
              position="top"
              offset={14}
              color="dark"
            >
              <Avatar
                color="white"
                size={"lg"}
                style={{
                  borderColor: "white",
                  borderWidth: "2px",
                  borderStyle: "solid",
                }}
              >
                {localStorage.getItem("firstName")?.charAt(0)}
              </Avatar>
            </Tooltip>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              leftSection={
                <IconLogout
                  color="white"
                  style={{ width: rem(25), height: rem(20) }}
                />
              }
              onClick={handleLogout}
              style={{
                backgroundColor: "#fc0324",
                color: "white",
                fontSize: 16,
              }}
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </div>
  );
}

export default Navbar;
