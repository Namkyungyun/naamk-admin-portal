"use client";
import "@/app/globals.css";
import Link from "next/link";
import { useRouter } from "next/navigation"; // ✅ URL 변경 감지
import { useEffect, useState } from "react";
import apiClient from "@/app/lib/apiClient";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const router = useRouter(); // ✅ 현재 URL 가져오기
  const [menus, setMenus] = useState([]); // data
  const [loading, setLoading] = useState(true); // ✅ API 요청 상태 관리

  const [openMenus, setOpenMenus] = useState([]);
  const [currentMenu, setCurrentMenu] = useState(null);

  // await setMenus([
  //   {
  //     id: 1,
  //     name: "대시보드",
  //     url: "/dashboard",
  //     submenus: [],
  //     parentId: null,
  //   },
  //   {
  //     id: 2,
  //     name: "사용자 관리",
  //     url: null,
  //     submenus: [
  //       { id: 4, name: "사용자 목록", url: "/test", parentId: 2 },
  //       { id: 5, name: "권한 관리", url: "/test1", parentId: 2 },
  //     ],
  //     parentId: null,
  //   },
  //   {
  //     id: 3,
  //     name: "시스템 관리",
  //     url: null,
  //     submenus: [
  //       { id: 6, name: "환경 설정", url: "/test2", parentId: 3 },
  //       { id: 7, name: "로그 관리", url: "/test3", parentId: 3 },
  //     ],
  //     parentId: null,
  //   },
  // ]);

  /// API
  useEffect(() => {
    const menuArr = [
      {
        id: 1,
        name: "대시보드",
        url: "/dashboard",
        submenus: [],
        parentId: null,
      },
      {
        id: 2,
        name: "사용자 관리",
        url: null,
        submenus: [
          { id: 4, name: "사용자 목록", url: "/test", parentId: 2 },
          { id: 5, name: "권한 관리", url: "/test1", parentId: 2 },
        ],
        parentId: null,
      },
      {
        id: 3,
        name: "시스템 관리",
        url: null,
        submenus: [
          { id: 6, name: "환경 설정", url: "/test2", parentId: 3 },
          { id: 7, name: "로그 관리", url: "/test3", parentId: 3 },
        ],
        parentId: null,
      },
    ];

    setMenus(menuArr);
    setLoading(false);
  }, []);

  /// Mount
  useEffect(() => {
    if (!loading && menus.length > 0) {
      const currentPath = window.location.pathname; // 현재 URL 경로 가져오기
      let currentWindowMenu = null;

      for (const menu of menus) {
        if (menu.url == currentPath) {
          currentWindowMenu = menu;
          break;
        }

        for (const submenu of menu.submenus) {
          if (submenu.url == currentPath) {
            currentWindowMenu = submenu;
            break;
          }
        }
      }

      if (currentWindowMenu.parentId != null) {
        onOpenMenu(currentWindowMenu.parentId);
      }
      setCurrentMenu(currentWindowMenu.id);
    }
  }, [router, loading]);

  /// current menu
  const isCurrentMenu = (menuId) => currentMenu === menuId;
  const onClickCurrentMenu = (menuId) => setCurrentMenu(menuId);

  /// func :: open menus
  const isOpen = (menuId) => openMenus.includes(menuId);
  const onOpenMenu = (menuId) => {
    let menu = menus.find((el) => el.id === menuId);

    if (menu.submenus != undefined && menu.submenus.length > 0) {
      let newArr = [...openMenus];

      let contains = openMenus.includes(menuId);
      contains ? newArr.splice(newArr.indexOf(menuId)) : newArr.push(menuId);

      setOpenMenus(newArr);
    } else {
      onClickCurrentMenu(menuId);
    }
  };

  return (
    <>
      {/* 사이드바 */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-content">
          <nav className="sidebar-nav">
            {menus.map((menu) => (
              <div key={menu.id}>
                <button
                  className="sidebar-link flex justify-between items-center w-full"
                  onClick={() => onOpenMenu(menu.id)}
                >
                  {menu.submenus.length > 0 ? (
                    // submenu가 있는 경우 하위 메뉴 열기
                    <span
                      className={`menu-label${isOpen(menu.id) ? "-open" : ""}`}
                    >
                      {menu.name}
                    </span>
                  ) : (
                    // submenu가 없는 경우 해당 메뉴로 이동
                    <Link href="/dashboard">
                      <span
                        className={`submenu-label${
                          isCurrentMenu(menu.id) ? "-open" : ""
                        }`}
                      >
                        {menu.name}
                      </span>
                    </Link>
                  )}

                  {menu.submenus.length > 0 && (
                    <span>{isOpen(menu.id) ? "▲" : "▼"}</span>
                  )}
                </button>

                {/* 하위 메뉴 */}
                {menu.submenus.length > 0 && (
                  <ul
                    className={`submenu ${isOpen(menu.id) ? "open" : "closed"}`}
                  >
                    {menu.submenus.map((submenu, index) => (
                      <button
                        key={index}
                        className="submenu-item flex justify-between items-center w-full"
                        onClick={() => onClickCurrentMenu(submenu.id)}
                      >
                        <Link href="/test">
                          <span
                            className={`submenu-label${
                              isCurrentMenu(submenu.id) ? "-open" : ""
                            }`}
                          >
                            {submenu.name}
                          </span>
                        </Link>
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
