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
    console.log("getPostReports : searchData >>>>>> ", searchData);

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