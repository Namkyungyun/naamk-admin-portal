"use client";

import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // username, loginAt, roles
  const [userInfo, setUserInfo] = useState(null);
  // 메뉴트리
  const [menuInfo, setMenuInfo] = useState(null);

  return (
    <UserContext.Provider
      value={{ userInfo, setUserInfo, menuInfo, setMenuInfo }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export const validMenuAccess = (menuUrl) => {
  const { menuInfo } = useUser();

  if (menuInfo) {
    // menuUrl로 menuInfo menu code찾기
    // code 존재 -> true
    // code 미존재 -> false
  }

  return false;
};
