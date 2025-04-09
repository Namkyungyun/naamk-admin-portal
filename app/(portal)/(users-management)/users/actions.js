import globalAxios from '@/app/api/api';

const api = globalAxios();
const prefixUrl = "/users"


/// list page
export function userListSearchAPI() {
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
    const url = `${prefixUrl}/search-options`;

    return await api.get(url)
      .then((response) => {
        const entity = response.data.body.entity;
        return entity;
      })
      .catch((e)=> console.log(e));
  };

  return { visiblePageNo, defaultPageParam, defaultPageOptionIndex, pageOptions, fetchAPI };
}

export function UserListAPI() {
  const responseData = (router) => [
    { name: "rowNum", label: "구분" },
    { name: "id", label: "", hidden: true },
    {
      name: "name",
      label: "회원ID",
      url: "id",
      onButton: (url) => router.push(`/users/${url}`),
    },
    { name: "nickname", label: "사용자명" },
    { name: "userStatus", label: "계정 상태" },
    { name: "penaltyStatus", label: "제재 상태" },
    { name: "email", label: "이메일" },
    { name: "createdAt", label: "가입일시" },
  ];

  const fetchAPI = async (data) => {
    const url = `${prefixUrl}/list`;

    return await api.post(url, data, {
          params: {page: data.pageNo-1, size: data.pageSize}
        })
        .then((response) => {
          const entity = response.data.body.entity;
          return entity;
        })
        .catch((e)=> console.log(e));
  };

  return { responseData, fetchAPI};
}



export function userDetailSearchAPI() {
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

export function userDetailAPI() {
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
    const url = `${prefixUrl}/${userId}`;

    return await api.get(url)
      .then((response) => {
        const entity = response.data.body.entity;
        return entity;
      })
      .catch((e) =>  console.log(e));
  }

  return {responseData, fetchAPI};

}


export function userPenaltyHistAPI() {
  const responseData =[
    { name: "rowNum", label: "구분" },
    { name: "id", label: "", hidden: true },
    { name: "createdAt", label: "처리일시" },
    { name: "createdBy", label: "처리자" },
    { name: "penaltyStatus", label: "제재 상태" },
    { name: "description", label: "제재사유" },
    {
      name: "isExistReport",
      label: "신고보기",
      url: "linkedId",
      onButton: (url) => window.open(`/user-reports/${url}`, "_blank"), // TODO 사용자 신고관리 상세
    },
    { name: "linkedId", label: "", hidden: true },
  ];

  const fetchAPI = async (userId, data) => {
    const url = `/penalty-hist/user/${userId}`;

    return await api.get(url, { params: {page: data.pageNo-1, size: data.pageSize} })
    .then((response) => {
      const entity = response.data.body.entity;
      console.log("getUserPenaltyHist success", entity);

      return entity;
    })
    .catch((e) =>  console.log(e));
  } 

  return {responseData, fetchAPI }
}

export function userPenaltyUpdateAPI() {
  const requestData = { isActive: null, description: null, };

  const fetchAPI = async (userId, data) => {
    const penaltyType = 'user';
    const url = `/penalty-hist/${penaltyType}/${userId}`;

    return await api.post(url, data, )
      .then((response) => {
        const entity = response.data.body.entity;
        console.log("updatePenaltyStatus success", entity);

        return entity;
      })
      .catch((e) =>  console.log(e));
  };

  return {requestData, fetchAPI };
}