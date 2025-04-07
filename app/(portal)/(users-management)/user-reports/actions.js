import apiClient from '@/app/lib/apiClient';

const api = apiClient();
const prefixUrl = "/user-reports"

export async function getSearchDatas() {
  console.log("getSearchDatas");

  return await api
    .get(`${prefixUrl}/search-options`)
    .then((response) => {
      const entity = response.data.body.entity;
      console.log("getSearchDatas success", entity);
      
      return entity;
    })
    .catch((e)=> console.log(e));
}

export async function getUsers(searchData) {
    console.log("getUsers : searchData >>>>>> " + searchData);

  return await api
    .post(`${prefixUrl}/users`, searchData, {
        params: {page: searchData.pageNo-1, size: searchData.pageSize}
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

export async function getUserReportHist(userId, data) {
  console.log("getUserReportHist : userId >>>>>> " + data);

  return await api.get(`${prefixUrl}/users/${userId}/report-hist`,
    {
      params: {page: data.pageNo-1, size: data.pageSize}
    }
  )
    .then((response) => {
      const entity = response.data.body.entity;
      console.log("getUserReportHist success", entity);

      return entity;
    })
    .catch((e) =>  console.log(e));
}

export async function updatePenaltyStatus(userId, data) {
  console.log("updateUserPenaltyStatus :", userId, data);

  return await api.post(`/penalty-hist/users/${userId}`, data, )
    .then((response) => {
      const entity = response.data.body.entity;
      console.log("getUserPenaltyHist success", entity);

      return entity;
    })
    .catch((e) =>  console.log(e));
}