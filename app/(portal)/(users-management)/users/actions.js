import apiClient from '@/app/lib/apiClient';

const api = apiClient();
const prefixUrl = "/user-management"


/// list page
export function fetchUsersSearch() {
  const visiblePageNo =  5;
  const defaultPageOptionIndex = 1;

  const pageOptions = [
    { id: 1, value: 20, label: "20개씩" },
    { id: 2, value: 50, label: "50개씩" },
    { id: 3, value: 100, label: "100개씩" },
  ];

  const defaultPageParam = {
    pageNo: 1,
    pageSize: pageOptions[defaultPageOptionIndex].value,
  };


  const fetchAPI = async () => {
    return await api
      .get(`${prefixUrl}/search-options`)
      .then((response) => {
        const entity = response.data.body.entity;
        console.log("getSearchDatas success", entity);
        
        return entity;
      })
      .catch((e)=> console.log(e));
  };

  return { visiblePageNo, defaultPageParam, defaultPageOptionIndex, pageOptions, fetchAPI };
}

export function fetchUsers() {
  const responseData = (router) => [
    { variableName: "rowNum", variableLabel: "구분" },
    { variableName: "id", variableLabel: "", hidden: true },
    {
      variableName: "name",
      variableLabel: "회원ID",
      url: "id",
      onButton: (url) => router.push(`/users/${url}`),
    },
    { variableName: "nickname", variableLabel: "사용자명" },
    { variableName: "userStatus", variableLabel: "계정 상태" },
    { variableName: "penaltyStatus", variableLabel: "제재 상태" },
    { variableName: "email", variableLabel: "이메일" },
    { variableName: "createdAt", variableLabel: "가입일시" },
  ];

  const fetchAPI = async (data) => {
    return await api
        .post(`${prefixUrl}/users`, data, {
          params: {page: data.pageNo-1, size: data.pageSize}
        })
        .then((response) => {
          const entity = response.data.body.entity;
          console.log("getUsers success", entity);

          return entity;
        })
        .catch((e)=> console.log(e));
  };

  return { responseData, fetchAPI};
}



export function fetchUserSearch() {
  const visiblePageNo =  5;
  const defaultPageOptionIndex = 1;

  const pageOptions = [
    { id: 1, value: 10, label: "10개씩" },
    { id: 2, value: 25, label: "25개씩" },
    { id: 3, value: 50, label: "50개씩" },
  ];

  const defaultPageParam = {
    pageNo: 1,
    pageSize: pageOptions[defaultPageOptionIndex].value,
  };

  return { visiblePageNo, defaultPageParam, defaultPageOptionIndex, pageOptions };
}

export function fetchUser() {
  const responseData =  {
    id: null,
    name: null,
    nickname: null,
    email: null,
    intro: null,
    createdAt: null,
    thumbSUrl: null,
    userStatus: null,
    penaltyStatus: null,
    penaltyStatusList: null,
  };

  const fetchAPI = async (userId) => {
    return await api.get(`${prefixUrl}/users/${userId}`)
      .then((response) => {
        const entity = response.data.body.entity;
        console.log("getUserById success", entity);

        return entity;
      })
      .catch((e) =>  console.log(e));
  }

  return {responseData, fetchAPI};

}


export function fetchPenaltyHist() {
  const responseData =[
    { variableName: "rowNum", variableLabel: "구분" },
    { variableName: "id", variableLabel: "", hidden: true },
    { variableName: "createdAt", variableLabel: "처리일시" },
    { variableName: "createdBy", variableLabel: "처리자" },
    { variableName: "penaltyStatus", variableLabel: "제재 상태" },
    { variableName: "description", variableLabel: "제재사유" },
    {
      variableName: "isExistReport",
      variableLabel: "신고보기",
      url: "linkedId",
      onButton: (url) => window.open(`/user-reports/${url}`, "_blank"), // TODO 사용자 신고관리 상세
    },
    { variableName: "linkedId", variableLabel: "", hidden: true },
  ];

  const fetchAPI = async (userId, data) => {
    return await api.get(`/penalty-hist/user/${userId}`,
      {
        params: {page: data.pageNo-1, size: data.pageSize}
      }
    )
    .then((response) => {
      const entity = response.data.body.entity;
      console.log("getUserPenaltyHist success", entity);

      return entity;
    })
    .catch((e) =>  console.log(e));
  } 

  return {responseData, fetchAPI }
}

export function fetchPenaltyUpdate() {
  const requestData = { isActive: null, description: null, };

  const fetchAPI = async (userId, data) => {
    const penaltyType = 'user';

    return await api.post(`/penalty-hist/${penaltyType}/${userId}`, data, )
      .then((response) => {
        const entity = response.data.body.entity;
        console.log("updatePenaltyStatus success", entity);

        return entity;
      })
      .catch((e) =>  console.log(e));
  };

  return {requestData, fetchAPI };
}