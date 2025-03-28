import apiClient from '@/app/lib/apiClient';

const api = apiClient();
const prefixUrl = "/user-management"

export async function getSearchDatas() {
   return await api
      .get(`${prefixUrl}/users/search`)
      .then((response) => {
        const entity = response.data.body.entity;
        console.log(entity)
        return entity;
      })
      .catch((e)=> console.log(e));
}

export async function getUsers(searchData, pageable) {
    console.log(searchData);
    return await api
    .post(`${prefixUrl}/users`, searchData, {
        params: pageable
    })
    .then((response) => {
      const entity = response.data.body.entity;
      console.log(entity)
      return entity;
    })
    .catch((e)=> console.log(e));

}