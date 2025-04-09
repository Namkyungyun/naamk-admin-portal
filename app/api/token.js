import { cookies } from 'next/headers';

export async function getAccessToken(){ 
  const cookiesStore = await cookies();
  // console.log(cookiesStore.get('accessToken')?.value);

  return cookiesStore.get('accessToken')?.value;
}

export async function clearAccessToken() {
  const cookiesStore = await cookies();
  cookiesStore.delete('accessToken');
}

export async function setAccessToken(accessToken) {
    const cookiesStore = await cookies();

    cookiesStore.set('accessToken', accessToken, {
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 8,
    });
}