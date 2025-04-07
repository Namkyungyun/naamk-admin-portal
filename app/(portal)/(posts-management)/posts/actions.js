import apiClient from '@/app/lib/apiClient';

const api = apiClient();
const prefixUrl = "/post-management"

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


export async function getPosts(searchData) {
    console.log("getPosts : searchData >>>>>> ", searchData);

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

export async function getPostById(postId) {
  console.log("getPostById : postId >>>>>> ", postId);

  return await api.get(`${prefixUrl}/posts/${postId}`)
    .then((response) => {
      const entity = response.data.body.entity;
      console.log("getPostById success", entity);

      return entity;
    })
    .catch((e) =>  console.log(e));
}


export async function getPostPenaltyHist(postId, searchData) {
  return await api.get(`/penalty-hist/post/${postId}`,{
    params: {page: searchData.pageNo-1, size: searchData.pageSize}
  })
    .then((response) => {
      const entity = response.data.body.entity;
      console.log("getPostPenaltyHist success", entity);

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