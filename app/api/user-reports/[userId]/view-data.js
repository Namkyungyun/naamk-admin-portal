export function userReportDetailData() {
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