'use server';

import globalAxios from './api';
import { getAccessToken, clearAccessToken, setAccessToken } from './token';
import { redirect } from "next/navigation";

export async function login(prevState, formData) {
  const username = formData.get("username");
  const password = formData.get("password");

  const api = globalAxios();
  const res = await api.post('/login', { username, password });
  const data = res.data.body.entity;

  if (data == null) {
    return { error: '입력한 정보가 맞지 않습니다. 확인 후 다시 입력해 주세요.' };
  }

  await setAccessToken(data.accessToken)

  return { success: true , expiredAt: data.expiredAt }
}

export async function logout() {
  const accessToken = await getAccessToken();
  await clearAccessToken();
  
  const api = globalAxios(accessToken);
  await api.get("/logout");

  redirect("/login");
}

export async function forceLogout() {
  await clearAccessToken();
  redirect("/login");
}


export async function getMe() {
 const accessToken = await getAccessToken();
  
  if (!accessToken) {
    throw { resultCode: 401 }
  }

  const api = globalAxios(accessToken);

  try {
    const res = await api.get("/auth/me");

    const entity = res.data.body.entity;
    if (!entity) {
      return new Error("No Entity data")
    }

    return entity;

  } catch(e) {

    throw e;
  }
}

export async function getMenuTree() {
  const accessToken = await getAccessToken();
  
  if (!accessToken) {
    throw { resultCode: 401 }
  }
  
  const api = globalAxios(accessToken);

  try {
    const url = `/menus/display-menutree`;
    const res = await api.get(url);

    const entity = res.data.body.entity;
    if (!entity) {
      return new Error("No Entity data")
    }

    return entity;

  } catch(e) {
    throw e;
  }
}
