import apiClient from '@/app/lib/apiClient';

const api = apiClient();
const prefixUrl = "/post-reports"

/// list page
export function fetchPostReportsSearch() {
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

export function fetchPostReports() {
  const responseData = (router) =>[
    { variableName: "rowNum", variableLabel: "구분" },
    { variableName: "id", variableLabel: "신고SEQ", hidden: true },
    { variableName: "latestCreatedAt", variableLabel: "최근 신고 일시" },
    {
      variableName: "reportedPostId",
      variableLabel: "게시글ID",
      url: "reportedPostId",
      onButton: (url) => router.push(`/post-reports/${url}`),
    },
    { variableName: "reportedUserName", variableLabel: "작성자ID" },
    { variableName: "reportedChannelName", variableLabel: "채널ID" },
    { variableName: "reportCount", variableLabel: "신고 건수" },
    { variableName: "reportStatus", variableLabel: "신고 상태" },
    { variableName: "penaltyStatus", variableLabel: "처리 상태" },
    { variableName: "penaltyCreatedAt", variableLabel: "처리일시" },
    { variableName: "penaltyCreatedBy", variableLabel: "처리자" },
  ];

  const fetchAPI = async(data) => {
    return await api
    .post(`${prefixUrl}/posts`, data, {
        params: {page: data.pageNo-1, size: data.pageSize}
    })
    .then((response) => {
      const entity = response.data.body.entity;
      console.log("getPosts success", entity);

      return entity;
    })
    .catch((e)=> console.log(e));
  }

  return {responseData, fetchAPI }
}

/// detail page
export function fetchPostReportSearch() {
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


  return { visiblePageNo, defaultPageParam, defaultPageOptionIndex, pageOptions };
}

export function fetchPostReport() {
  const responseData = {
    id: null, // 신고SEQ
    report: null, // 신고상태 valu (true, false)
    latestCreatedAt: null, // 최근처리일시
    reportedUserId: null, // (hidden) 작성자SEQ
    reportedUserName: null, // 작성자ID
    reportedChannelId: null, //채널ID
    reportedChannelName: null, //채널ID
    reportedPostId: null, // 게시글 ID
    reportedPostContent: null, // 개시글 내용
    reportedPostActive: null, // 게시글 상태 boolean
    reportedPostStatus: null, // 게시글 상태 string
    penalty: null, // 처리상태 value (true, false, null)
    penaltyStatus: null, // 처리상태*
    penaltyDescription: null, // 제재사유
    penaltyCreatedBy: null, // 처리자
    penaltyCreatedAt: null, // 처리일시
    penaltyStatusList: [], // 처리상태값
  };

  const fetchAPI = async(postId) => {
    return await api.get(`${prefixUrl}/posts/${postId}`)
      .then((response) => {
        const entity = response.data.body.entity;
        console.log("getPostReportById success", entity);

        return entity;
      })
      .catch((e) =>  console.log(e));
  };

  return {responseData, fetchAPI };
}

export function fetchPostReportHist() {
  const responseData = [
  { variableName: "rowNum", variableLabel: "구분" },
  { variableName: "id", variableLabel: "", hidden: true },
  { variableName: "reportCreatedAt", variableLabel: "신고일시" },
  { variableName: "reportCreatedBy", variableLabel: "신고자" },
  { variableName: "reportStatus", variableLabel: "신고 상태" },
  { variableName: "penaltyStatus", variableLabel: "처리 상태" },
];

  const fetchAPI = async(postId, data) => {
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

  return {responseData, fetchAPI};
}

export function fetchPenaltyUpdate() {
  const requestData = {};

  const fetchAPI = async(postId, data) => {
    const penaltyType = 'post';
    return await api.post(`/penalty-hist/${penaltyType}/${postId}`, data, )
      .then((response) => {
        const entity = response.data.body.entity;
        console.log("updatePenaltyStatus success", entity);

        return entity;
      })
      .catch((e) =>  console.log(e));
  }

  return {requestData, fetchAPI };
}

