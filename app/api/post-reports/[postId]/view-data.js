export function postReportDetailData() {
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

      const histTableData = [
        { name: "rowNum", label: "구분" },
        { name: "id", label: "", hidden: true },
        { name: "reportCreatedAt", label: "신고일시" },
        { name: "reportCreatedBy", label: "신고자" },
        { name: "reportStatus", label: "신고 상태" },
        { name: "penaltyStatus", label: "처리 상태" },
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