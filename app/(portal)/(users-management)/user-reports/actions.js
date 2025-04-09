import globalAxios from '@/app/lib/api';

const api = globalAxios();
const prefixUrl = "/user-reports"

/// list page
export function userReportListSearchAPI() {
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

export function userReportListAPI() {
  const responseData = (router) => [
    { name: "rowNum", label: "구분" },
    { name: "id", label: "", hidden: true },
    { name: "latestCreatedAt", label: "최근신고일시" },
    { name: "reportedUserId", label: "", hidden: true },
    {
      name: "reportedUserName",
      label: "대상자ID",
      url: "reportedUserId",
      onButton: (url) => router.push(`/user-reports/${url}`),
    },
    { name: "reportCount", label: "신고 건수" },
    { name: "reportStatus", label: "신고 상태" },
    { name: "penaltyStatus", label: "처리 상태" },
    { name: "penaltyCreatedAt", label: "처리일시" },
    { name: "penaltyCreatedBy", label: "처리자" },
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


/// detail page
export function userReportDetailSearchAPI() {
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

export function userReportDetailAPI () {
  const responseData = {
    id: null,
    reportedUserId: null,
    reportedUserName: null,
    latestCreatedAt: null,
    userStatus: null,
    penalty: null, // 처리상태 value (true, false, null)
    penaltyStatus: null,
    penaltyDescription: null, // 제재사유
    penaltyCreatedAt: null,
    penaltyCreatedBy: null,
    penaltyStatusList: [],
  };

  const fetchAPI = async (userId) => {
    const url = `${prefixUrl}/users/${userId}`;

    return await api.get(url)
    .then((response) => {
      const entity = response.data.body.entity;
      return entity;
    })
    .catch((e) =>  console.log(e));
  }

  return {responseData, fetchAPI};
}

export function userReportHistAPI() {
  const responseData = [
    { name: "rowNum", label: "구분" },
    { name: "id", label: "", hidden: true },
    { name: "reportCreatedAt", label: "신고일시" },
    { name: "reportCreatedBy", label: "신고자" },
    { name: "reportStatus", label: "신고 상태" },
    { name: "penaltyStatus", label: "처리 상태" },
  ];

  const fetchAPI = async (userId, data) => {
    const url =`${prefixUrl}/${userId}/report-hist`;

    return await api.get(url,
      {
        params: {page: data.pageNo-1, size: data.pageSize}
      }
    )
      .then((response) => {
        const entity = response.data.body.entity;
        return entity;
      })
      .catch((e) =>  console.log(e));
  };

  return {responseData, fetchAPI};

}

export function userPenaltyUpdateAPI() {
  const requestData = { isActive: null, description: null, };

  const fetchAPI = async (userId, data) => {
    const penaltyType = 'user';
    const url = `/penalty-hist/${penaltyType}/${userId}`;

    return await api.post(url, data, )
      .then((response) => {
        const entity = response.data.body.entity;
        return entity;
      })
      .catch((e) =>  console.log(e));
  };

  return {requestData, fetchAPI };
}
