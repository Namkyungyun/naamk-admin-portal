"use client";
import Link from "next/link";
import { useRouter } from "next/navigation"; // ✅ URL 변경 감지
import { useEffect, useState } from "react";
import { useUser } from "@/app/provider/UserProvider";
import { useToastMessage } from "@/app/provider/MessageProvider";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const router = useRouter(); // ✅ 현재 URL 가져오기
  const { menuInfo } = useUser();
  const [menus, setMenus] = useState([]); // data
  const { showMessage } = useToastMessage();

  const [openMenus, setOpenMenus] = useState([]);
  const [currentMenu, setCurrentMenu] = useState(null);

  const defaultMenu = [
    {
      id: 0,
      name: "대시보드",
      url: "/dashboard",
      submenus: [],
      parentId: null,
    },
  ];

  useEffect(() => {
    if (Array.isArray(menuInfo) && menuInfo.length > 0) {
      setMenus([...defaultMenu, ...menuInfo]);
    }
  }, [menuInfo]);

  useEffect(() => {
    if (menus.length > 0) {
      handleCurrentMenu();
    }
  }, [menus]);

  /// current menu
  const isCurrentMenu = (menuId) => currentMenu === menuId;
  const onClickCurrentMenu = (menuId) => setCurrentMenu(menuId);

  /// func :: open menus
  const isOpen = (menuId) => openMenus.includes(menuId);
  const onOpenMenu = (menuId) => {
    let menu = menus.find((el) => el.id === menuId);

    if (menu.submenus != undefined && menu?.submenus?.length > 0) {
      let newArr = [...openMenus];

      let contains = openMenus.includes(menuId);
      contains ? newArr.splice(newArr.indexOf(menuId)) : newArr.push(menuId);

      setOpenMenus(newArr);
    } else {
      onClickCurrentMenu(menuId);
    }
  };

  /// 활성메뉴 표시
  const handleCurrentMenu = (path = window.location.pathname) => {
    let matchedMenu = null;

    for (const menu of menus) {
      if (menu.url === path) {
        matchedMenu = menu;
        break;
      }

      for (const submenu of menu.submenus ?? []) {
        if (submenu.url === path || path.startsWith(submenu.url)) {
          matchedMenu = submenu;
          break;
        }
      }

      if (matchedMenu) break;
    }

    if (!matchedMenu) {
      router.replace("/dashboard");
      showMessage({
        type: "error",
        content: "접근할 수 없는 페이지입니다.",
      });

      setTimeout(() => {
        handleCurrentMenu("/dashboard"); // 이동 후 다시 매칭 시도
      }, 100);
      return;
    }

    if (matchedMenu.parentId != null) {
      onOpenMenu(matchedMenu.parentId);
    }
    setCurrentMenu(matchedMenu.id);
  };

  return (
    <>
      {/* 사이드바 */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-content">
          <nav className="sidebar-nav">
            {menus != null &&
              menus?.map((menu) => (
                <div key={menu.id}>
                  <button
                    className="sidebar-link flex justify-between items-center w-full"
                    onClick={() => onOpenMenu(menu.id)}
                  >
                    {menu?.submenus?.length > 0 ? (
                      // submenu가 있는 경우 하위 메뉴 열기
                      <span
                        className={`menu-label${
                          isOpen(menu.id) ? "-open" : ""
                        }`}
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

                    {menu?.submenus?.length > 0 && (
                      <span className="w-10">
                        {isOpen(menu.id) ? "▲" : "▼"}
                      </span>
                    )}
                  </button>

                  {/* 하위 메뉴 */}
                  {menu?.submenus?.length > 0 && (
                    <ul
                      className={`submenu ${
                        isOpen(menu.id) ? "open" : "closed"
                      }`}
                    >
                      {menu.submenus.map((submenu, index) => (
                        <button
                          key={index}
                          className="submenu-item flex justify-between items-center w-full"
                          onClick={() => onClickCurrentMenu(submenu.id)}
                        >
                          <Link href={submenu.url}>
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
