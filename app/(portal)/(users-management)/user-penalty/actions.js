import apiClient from '@/app/lib/apiClient';

const api = apiClient();
const prefixUrl = "/user-management"

export async function getSearchDatas() {
  console.log("getSearchDatas");

  return await api
    .get(`${prefixUrl}/users/search`)
    .then((response) => {
      const entity = response.data.body.entity;
      console.log("getSearchDatas success", entity);
      
      return entity;
    })
    .catch((e)=> console.log(e));
}

export async function getUsers(searchData, pageable) {
    console.log("getUsers : searchData >>>>>> " + searchData);

  return await api
    .post(`${prefixUrl}/users`, searchData, {
        params: pageable
    })
    .then((response) => {
      console.log(response);
      const entity = response.data.body.entity;
      console.log("getUsers success", entity);

      return entity;
    })
    .catch((e)=> console.log(e));

}

export async function getUserById(userId) {
  console.log("getUserById : userId >>>>>> " + userId);

  return await api.get(`${prefixUrl}/users/${userId}`)
    .then((response) => {
      const entity = response.data.body.entity;
      console.log("getUserById success", entity);

      return entity;
    })
    .catch((e) =>  console.log(e));
}

export async function getUserPenaltyHist(userId) {
  console.log("getUserPenaltyHist : userId >>>>>> " + userId);

  return await api.get(`/penalty-hist/users/${userId}`)
    .then((response) => {
      const entity = response.data.body.entity;
      console.log("getUserPenaltyHist success", entity);

      return entity;
    })
    .catch((e) =>  console.log(e));
}

export async function updateUserPenaltyStatus(userId, data) {
  console.log("updateUserPenaltyStatus :", userId, data);

  return await api.post(`/penalty-hist/users/${userId}`, data, )
    .then((response) => {
      const entity = response.data.body.entity;
      console.log("getUserPenaltyHist success", entity);

      return entity;
    })
    .catch((e) =>  console.log(e));
}