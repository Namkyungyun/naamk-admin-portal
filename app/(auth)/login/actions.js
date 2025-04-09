'use server';

import {login} from '@/app/lib/me';

export async function tryLogin(prevState, formData) {
  const username = formData.get("username");
  const password = formData.get("password");

  try {
      const data = await login({username: username, password: password});

      if (data == null) {
        return { error: '입력한 정보가 맞지 않습니다. 확인 후 다시 입력해 주세요.' };
      }
      
      return { success: true , expiredAt: data.expiredAt }

  } catch (err) {
    // console.log(err);
    return { error: '서버 오류가 발생했습니다. 다시 시도해 주세요.' };
  }
}