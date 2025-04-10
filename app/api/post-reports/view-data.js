export function postReportListData() {
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

    return { 
        visiblePageNo, 
        defaultPageParam, 
        defaultPageOptionIndex, 
        pageOptions,
        tableData,
    };
}
