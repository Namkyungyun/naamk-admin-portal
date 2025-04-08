import apiClient from '@/app/lib/apiClient';

const api = apiClient();
const prefixUrl = "/post-management"

/// list page
export function fetchPostsSearch() {
  const visiblePageNo =  5;
  const defaultPageOptionIndex = 1;

  const pageOptions = [
    { id: 1, value: 20, label: "10개씩" },
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

export function fetchPosts() {
  const responseData = (router) => [
    { name: "rowNum", label: "구분" },
    { name: "createdAt", label: "등록 일시" },
    { name: "userName", label: "작성자ID" },
    { name: "channelName", label: "채널ID" },
    { name: "type", label: "글 타입" },
    {
      name: "content",
      label: "본문 내용",
      url: "id",
      onButton: (url) => router.push(`/posts/${url}`),
    },
    { name: "id", label: "게시글 ID" },
    { name: "penaltyStatus", label: "제재 상태" },
  ];

  const fetchAPI = async (data) => { 
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

    return {responseData, fetchAPI};
}

export function fetchPostSearch() {
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

export function fetchPost() {
  const responseData = {
    postId: null,
    createdAt: null,
    content: null,
    postStatus: null,
    channelPenaltyStatus: null,
    penalty: null,
    penaltyStatus: null,
    channelName: null,
    channelNickName: null,
    userId: null,
    userName: null,
    popScore: null,
    replyCount: null,
    likeCount: null,
    thumbs: [],
  };

  const fetchAPI = async(postId) => {
    return await api.get(`${prefixUrl}/posts/${postId}`)
      .then((response) => {
        const entity = response.data.body.entity;
        console.log("getPostById success", entity);

        return entity;
      })
      .catch((e) =>  console.log(e));
  }

  return {responseData, fetchAPI};
}

export function fetchPenaltyHist() {
  const responseData = [
    { name: "rowNum", label: "구분" },
    { name: "id", label: "", hidden: true },
    { name: "createdAt", label: "처리 일시" },
    { name: "createdBy", label: "처리자" },
    { name: "penaltyStatus", label: "처리 상태" },
    { name: "description", label: "제재사유" },
    {
      name: "isExistReport",
      label: "신고보기",
      url: "linkedId",
      onButton: (url) => window.open(`/post-reports/${url}`, "_blank"), // TODO 사용자 신고관리 상세
    },
    { name: "linkedId", label: "", hidden: true },
  ];
  
  const fetchAPI = async(postId, data) => {
    const penaltyType = 'post';
    return await api.get(`/penalty-hist/${penaltyType}/${postId}`,{
      params: {page: data.pageNo-1, size: data.pageSize}
    })
      .then((response) => {
        const entity = response.data.body.entity;
        console.log("getPostPenaltyHist success", entity);
  
        return entity;
      })
      .catch((e) =>  console.log(e));
  };

  return {responseData, fetchAPI};
}

export function fetchPenaltyUpdate() {
  const requestData = {
    isActive: null,
    description: null,
  };

  const fetchAPI = async(postId, data) => {
    return await api.post(`/penalty-hist/post/${postId}`, data, )
    .then((response) => {
      const entity = response.data.body.entity;
      console.log("updatePenaltyStatus success", entity);

      return entity;
    })
    .catch((e) =>  console.log(e));
  }

  return {requestData, fetchAPI};
}
