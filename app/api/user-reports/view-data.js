export function userReportListData() {
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

    const tableData = (router) => [
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

    return { 
        visiblePageNo, 
        defaultPageParam, 
        defaultPageOptionIndex, 
        pageOptions,
        tableData,
    };
}
