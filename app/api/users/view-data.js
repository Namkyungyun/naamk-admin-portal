export function userListData() {
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
        {
          name: "name",
          label: "회원ID",
          url: "id",
          onButton: (url) => router.push(`/users/${url}`),
        },
        { name: "nickname", label: "사용자명" },
        { name: "userStatus", label: "계정 상태" },
        { name: "penaltyStatus", label: "제재 상태" },
        { name: "email", label: "이메일" },
        { name: "createdAt", label: "가입일시" },
      ];

    return { 
        visiblePageNo, 
        defaultPageParam, 
        defaultPageOptionIndex, 
        pageOptions,
        tableData,
    };
}
