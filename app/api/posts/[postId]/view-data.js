export function postDetailData() {
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

    const detailData = {
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

      const histTableData = [
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

      const penaltyReqData = { isActive: null, description: null, };

      return {
        visiblePageNo, 
        defaultPageParam, 
        defaultPageOptionIndex, 
        pageOptions,
        detailData,
        histTableData,
        penaltyReqData,
      };
    
}