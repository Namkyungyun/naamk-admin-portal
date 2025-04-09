import { cookies } from 'next/headers';
import globalAxios from './api';

export async function getAccessToken(){ 
  const cookiesStore = await cookies();
  // console.log(cookiesStore.get('accessToken')?.value);

  return cookiesStore.get('accessToken')?.value;
}

export async function clearAccessToken() {
  const cookiesStore = await cookies();
  cookiesStore.delete('accessToken');
}


export async function login({username, password}) {
  const api = globalAxios();
  const res = await api.post('/login', { username, password });
  const data = res.data.body.entity;
  
  if (!data?.accessToken) {
    return null;
  }

  const cookiesStore = await cookies();

  cookiesStore.set('accessToken', data.accessToken, {
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 8,
  });

  
  return data;
}

export async function logout() {
  const accessToken = await getAccessToken();
  await clearAccessToken();
  
  const api = globalAxios(accessToken);
  await api.get("/logout");
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
