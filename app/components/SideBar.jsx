"use client";
import "@/app/globals.css";
import { useEffect, useState } from "react";
import apiClient from "@/app/lib/apiClient";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  // const [menus, setMenus] = useState([]);
  const [openMenu, setOpenMenu] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  // useEffect(() => {
  //   apiClient
  //     .get("/menu")
  //     .then((response) => setMenus(response.data))
  //     .catch(console.error);
  // }, []);

  const [menus, setMenus] = useState([
    { id: 1, name: "대시보드", submenus: [] },
    {
      id: 2,
      name: "사용자 관리",
      submenus: [
        { id: 4, name: "사용자 목록" },
        { id: 5, name: "권한 관리" },
      ],
    },
    {
      id: 3,
      name: "시스템 관리",
      submenus: [
        { id: 6, name: "환경 설정" },
        { id: 7, name: "로그 관리" },
      ],
    },
  ]);

  return (
    <>
      {/* 사이드바 */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-content">
          <h2 className="sidebar-title">Admin</h2>
          <nav className="sidebar-nav">
            {menus.map((menu) => (
              <div key={menu.id}>
                <button
                  className="sidebar-link flex justify-between items-center w-full"
                  onClick={() => {
                    setOpenMenu(openMenu === menu.id ? null : menu.id);
                    if (menu.submenus.length == 0) {
                      setOpenSubMenu(null);
                    }
                  }}
                >
                  {/* {menu.name} */}
                  <span
                    className={`menu-label${
                      openMenu === menu.id ? "-open" : ""
                    }`}
                  >
                    {menu.name}
                  </span>
                  {menu.submenus.length > 0 && (
                    <span>{openMenu === menu.id ? "▲" : "▼"}</span>
                  )}
                </button>
                {/* 하위 메뉴 */}
                {menu.submenus.length > 0 && (
                  <ul
                    className={`submenu ${
                      openMenu === menu.id ? "open" : "closed"
                    }`}
                  >
                    {menu.submenus.map((submenu, index) => (
                      <button
                        key={index}
                        className="submenu-item flex justify-between items-center w-full"
                        onClick={() =>
                          setOpenSubMenu(
                            openSubMenu === submenu.id ? null : submenu.id
                          )
                        }
                      >
                        <span
                          className={`submenu-label${
                            openSubMenu === submenu.id ? "-open" : ""
                          }`}
                        >
                          {submenu.name}
                        </span>
                      </button>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* 사이드바 토글 버튼 */}
      <button
        className={`sidebar-toggle-button ${
          isSidebarOpen ? "toggle-open" : "toggle-closed"
        }`}
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? "◀" : "▶"}
      </button>
    </>
  );
};

export default Sidebar;
