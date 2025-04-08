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
    try {
      const response =  await api.get(`${prefixUrl}/search-options`);
      
      const entity = response.data.body.entity;
      if (!entity) {
        throw new Error("No Entity data");
      }
  
      return entity;

    } catch(e) {
      throw e;
    }
  };

  return { visiblePageNo, defaultPageParam, 
    defaultPageOptionIndex, pageOptions, fetchAPI };
}

export function fetchPostReports() {
  const responseData = (router) =>[
    { name: "rowNum", label: "구분", widthKey: 'w-[10px]' },
    { name: "id", label: "신고SEQ", hidden: true},
    { name: "latestCreatedAt", label: "최근 신고 일시", widthKey: 'w-[30px]' },
    {
      name: "reportedPostId",
      label: "게시글ID",
      widthKey: 'w-[10px]',
      url: "reportedPostId",
      onButton: (url) => router.push(`/post-reports/${url}`),
    },
    { name: "reportedUserName", label: "작성자ID", widthKey: 'w-[10px]'  },
    { name: "reportedChannelName", label: "채널ID", widthKey: 'w-[10px]' },
    { name: "reportCount", label: "신고 건수",widthKey: 'w-[10px]'  },
    { name: "reportStatus", label: "신고 상태",widthKey: 'w-[20px]'  },
    { name: "penaltyStatus", label: "처리 상태",widthKey: 'w-[10px]'  },
    { name: "penaltyCreatedAt", label: "처리일시",widthKey: 'w-[30px]' },
    { name: "penaltyCreatedBy", label: "처리자",widthKey: 'w-[20px]' },
  ];

  const fetchAPI = async(data) => {
    try {
      const response = await api.post(`${prefixUrl}/posts`, data, {
            params: {page: data.pageNo-1, size: data.pageSize}
        });

      const entity = response.data.body.entity;
      if (!entity) {
        throw new Error("No Entity data");
      }

      return response.data.body.entity
    } catch(e) {
      throw e;
    }
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
  { name: "rowNum", label: "구분" },
  { name: "id", label: "", hidden: true },
  { name: "reportCreatedAt", label: "신고일시" },
  { name: "reportCreatedBy", label: "신고자" },
  { name: "reportStatus", label: "신고 상태" },
  { name: "penaltyStatus", label: "처리 상태" },
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

