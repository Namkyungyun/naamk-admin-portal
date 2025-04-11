export function postListData() {
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
      { name: "createdAt", label: "등록 일시", widthKey: 'w-[30px]'},
      { name: "userName", label: "작성자ID", widthKey: 'w-[20px]'},
      { name: "channelName", label: "채널ID", widthKey: 'w-[20px]'},
      { name: "type", label: "글타입", widthKey: 'w-[10px]'},
      {
        name: "content",
        label: "본문 내용",
        url: "id",
        widthKey: 'w-[40px]',
        onButton: (url) => router.push(`/posts/${url}`),
      },
      { name: "id", label: "게시글ID", widthKey: 'w-[5px]'  },
      { name: "penaltyStatus", label: "제재 상태", widthKey: 'w-[10px]' },
      ];

    return { 
        visiblePageNo, 
        defaultPageParam, 
        defaultPageOptionIndex, 
        pageOptions,
        tableData,
    };
}
