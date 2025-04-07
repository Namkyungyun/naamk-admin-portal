import apiClient from '@/app/lib/apiClient';

const api = apiClient();
const prefixUrl = "/post-reports"

export async function getSearchDatas() {
  return await api
    .get(`${prefixUrl}/search-options`)
    .then((response) => {
      const entity = response.data.body.entity;
      console.log("getSearchDatas success", entity);
      
      return entity;
    })
    .catch((e)=> console.log(e));
}

export async function getPostReports(searchData) {
  return await api
    .post(`${prefixUrl}/posts`, searchData, {
        params: {page: searchData.pageNo-1, size: searchData.pageSize}
    })
    .then((response) => {
      const entity = response.data.body.entity;
      console.log("getPosts success", entity);

      return entity;
    })
    .catch((e)=> console.log(e));
}

export async function getPostReportById(postId) {
  console.log("getPostReportById : postId >>>>>> ", postId);

  return await api.get(`${prefixUrl}/posts/${postId}`)
    .then((response) => {
      const entity = response.data.body.entity;
      console.log("getPostReportById success", entity);

      return entity;
    })
    .catch((e) =>  console.log(e));
}

export async function getPostReportHist(postId, data) {
  return await api.get(`${prefixUrl}/posts/${postId}/report-hist`,
    {
      params: {page: data.pageNo-1, size: data.pageSize}
    }
  )
    .then((response) => {
      const entity = response.data.body.entity;
      console.log("getPostReportHist success", entity);

      return entity;
    })
    .catch((e) =>  console.log(e));
}

export async function updatePenaltyStatus(postId, data) {
  return await api.post(`/penalty-hist/post/${postId}`, data, )
    .then((response) => {
      const entity = response.data.body.entity;
      console.log("updatePenaltyStatus success", entity);

      return entity;
    })
    .catch((e) =>  console.log(e));
}