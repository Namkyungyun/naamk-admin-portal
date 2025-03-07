"use client";
import "@/app/globals.css";
import { useEffect, useState } from "react";
import apiClient from "@/app/lib/apiClient";

const Sidebar = ({ isHidden, toggleSidebar }) => {
  // const [menus, setMenus] = useState([]);
  const [openMenu, setOpenMenu] = useState(null);

  // useEffect(() => {
  //   apiClient
  //     .get("/menu")
  //     .then((response) => setMenus(response.data))
  //     .catch(console.error);
  // }, []);

  const [menus, setMenus] = useState([
    { id: 1, name: "대시보드", submenus: [] },
    { id: 2, name: "사용자 관리", submenus: ["사용자 목록", "권한 관리"] },
    { id: 3, name: "시스템 관리", submenus: ["환경 설정", "로그 관리"] },
  ]);

  return (
    <div>
      <aside className={`sidebar ${isHidden ? "hidden" : ""}`}>
        <div className="sidebar-toggle" onClick={toggleSidebar}></div>
        <ul>
          {menus.map((menu) => (
            <li key={menu.id} className="menu-item">
              <button
                onClick={(e) => {
                  e.stopPropagation(); // 클릭 이벤트 전파 차단
                  setOpenMenu(openMenu === menu.id ? null : menu.id);
                }}
              >
                {menu.name}
              </button>
              {menu.submenus.length > 0 && (
                <ul className={`submenu ${openMenu === menu.id ? "open" : ""}`}>
                  {menu.submenus.map((submenu, index) => (
                    <li key={index} className="submenu-item">
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // 부모의 이벤트 실행 방지
                          alert(submenu); // 정상적으로 alert 표시
                        }}
                      >
                        {submenu}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
