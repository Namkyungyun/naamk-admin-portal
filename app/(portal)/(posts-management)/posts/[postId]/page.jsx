"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

import { message } from "antd";
import PageSubTitle from "@/app/(portal)/component/PageSubTitle";
import SectionTitle from "@/app/(portal)/component/SectionTitle";
import PostDetailGrid from "../component/DetailGrid";
import {
  ListCount,
  ListTable,
  Pagination,
} from "@/app/(portal)/component/ListTable";
import MidPopupModal from "@/app/(portal)/component/MDPopupModal";
// 팝업
import { CancelButton, SaveButton } from "@/app/(portal)/component/Buttons";
import Loading from "@/app/(portal)/component/Loading";
import PostPenaltyPopupGrid from "../component/PenaltyPopupGrid";

import {
  getPostById,
  getPostPenaltyHist,
  updatePenaltyStatus,
} from "../actions";

export default function PostDetailPage() {
  const { postId } = useParams();
  const [messageApi, contextHolder] = message.useMessage();

  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [fetchedInit, setFetchedInit] = useState(false);

  // post detail data
  const initPostDetailData = {
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
  const [detailData, setDetailData] = useState(null);

  /// penalty history list
  const penaltyHistTableHeader = [
    { variableName: "rowNum", variableLabel: "구분" },
    { variableName: "id", variableLabel: "", hidden: true },
    { variableName: "createdAt", variableLabel: "처리 일시" },
    { variableName: "createdBy", variableLabel: "처리자" },
    { variableName: "penaltyStatus", variableLabel: "처리 상태" },
    { variableName: "description", variableLabel: "제재사유" },
    {
      variableName: "isExistReport",
      variableLabel: "신고보기",
      url: "linkedId",
      onButton: (url) => window.open(`/post-reports/${url}`, "_blank"), // TODO 사용자 신고관리 상세
    },
    { variableName: "linkedId", variableLabel: "", hidden: true },
  ];
  const [penaltyHistTableBody, setPenaltyHistTableBody] = useState([]);

  /// pagination data
  const visiblePageCount = 5;
  const [totalPageNo, setTotalPageNo] = useState(0);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [reqSearchData, setReqSearchData] = useState({
    pageNo: 1,
    pageSize: 10,
  });
  const pageItemCountOptions = [
    { id: 1, value: 10, label: "10개씩" },
    { id: 2, value: 25, label: "25개씩" },
    { id: 3, value: 50, label: "50개씩" },
  ];

  /// penalty update popup
  const penaltyForm = {
    type: "post",
    isActive: null,
    description: null,
  };
  const [showPenaltyPopup, setShowPenaltyPopup] = useState(false);
  const [updatablePenalty, setUptablePenalty] = useState(false);
  const [updatePenaltyData, setUpdatePenaltyData] = useState({});

  /// API [ postDetailData, penaltyHistData ]
  const fetchInit = async () => {
    setLoading(true);

    const [postDetailData, penaltyHistData] = await Promise.all([
      getPostById(postId),
      getPostPenaltyHist(postId, reqSearchData),
    ]);

    // detail
    if (postDetailData) {
      setDetailData(postDetailData);
      setPenaltyData(postDetailData);
    }

    // history
    if (penaltyHistData) {
      setPenaltyHistTableBody(penaltyHistData.content);
      setTotalPageNo(penaltyHistData.totalPages);
      setTotalItemCount(penaltyHistData.totalElements);
    }

    setFetchedInit(true);
    setLoading(false);
  };

  /// API [ penalty ]
  const fetchUpdate = async () => {
    setLoading(true);

    const updated = await Promise.resolve(
      updatePenaltyStatus(postId, updatePenaltyData)
    );

    setLoading(false);

    const result = updated?.linkedId != null;
    const type = result ? "success" : "error";
    const message = result ? "(TP)신고 처리완료" : "(TP)신고 처리실패";
    onMessage(type, message);

    if (result) {
      setShowPenaltyPopup(false);
      onRefresh();
    }
  };

  /// penalty ( 팝업 때메 )
  const setPenaltyData = (data) => {
    if (data) {
      penaltyForm.label = data.penaltyStatus;
      penaltyForm.isActive = data.penalty;
    } else {
      penaltyForm.label = detailData.penaltyStatus;
      penaltyForm.isActive = detailData.penalty;
    }

    setUpdatePenaltyData({ ...penaltyForm });
  };

  const onValidatePenaltyStatus = (obj) => {
    const valid = obj.valid;
    setUptablePenalty(valid);

    if (valid) {
      const data = obj.data;
      setUpdatePenaltyData(data);
    }
  };

  const onUpdatePenaltyStatus = () => {
    fetchUpdate();
  };

  const onCancelUpdatePenaltyStatus = () => {
    setShowPenaltyPopup(false);
    setUptablePenalty(false);

    setPenaltyData();
  };

  /// page
  const onPageChange = (page) => {
    setReqSearchData((prev) => ({
      ...prev,
      pageNo: page >= totalPageNo ? totalPageNo : page,
    }));

    if (fetchedInit) {
      onRefresh();
    }
  };

  const onPageItemCountChange = (count) => {
    setReqSearchData((prev) => ({
      ...prev,
      pageNo: 1,
      pageSize: count,
    }));

    if (fetchedInit) {
      onRefresh();
    }
  };

  ////
  const onMessage = (type, message) => {
    // type : error , success
    messageApi.open({
      type: type,
      content: message,
      duration: 5,
    });
  };

  const onRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, "500");
  };

  /// init render
  useEffect(() => {
    fetchInit();
  }, []);

  /// rebuild render
  useEffect(() => {
    if (refresh) {
      fetchInit();
    }
  }, [refresh, reqSearchData]);

  return (
    <>
      <div className="flex flex-col h-full">
        <div>
          {/* 상단 화면명 */}
          <PageSubTitle
            beforePages={["게시글 관리"]}
            currentPage="게시글 정보 상세"
          />
          <SectionTitle title="게시글 기본정보" />
          <PostDetailGrid
            detailData={detailData ?? initPostDetailData}
            updatable={loading}
            onPenaltyUpdate={() => setShowPenaltyPopup(true)}
          />
        </div>

        <div className="mt-4 mb-1 mr-1 flex items-center justify-between text-black">
          <SectionTitle title="제재 처리 이력" />
          <ListCount
            title="총"
            disabled={loading}
            totalItemCount={totalItemCount}
            optionData={pageItemCountOptions}
            defaultIndex={0}
            onChange={onPageItemCountChange}
          />
        </div>

        {/* 아래 div태그에 마진 bottom 을 주고 싶어  */}
        <div className="flex flex-col h-full">
          {/* 테이블 */}
          <div className="px-1 mb-4 h-full">
            <ListTable
              headers={penaltyHistTableHeader}
              body={penaltyHistTableBody}
            />
          </div>
          <div className="h-12 flex items-center justify-center text-black gap-2 mb-4">
            {!loading && penaltyHistTableBody.length !== 0 ? (
              <Pagination
                currentPage={reqSearchData.pageNo}
                totalPages={totalPageNo}
                onPageChange={onPageChange}
                maxVisible={visiblePageCount}
              />
            ) : null}
          </div>
        </div>
      </div>

      <MidPopupModal
        isOpen={showPenaltyPopup}
        title="제재상태 변경하기"
        description={`해당 포스트의 제재 상태를 변경 하려면 \n 아래 항목을 작성하세요.`}
      >
        <div>
          <PostPenaltyPopupGrid
            name={detailData?.postId}
            penaltyForm={updatePenaltyData}
            originOption={detailData?.penalty}
            readOnly={loading}
            useDefaultOption={penaltyHistTableBody.length > 0}
            defaultIndex={detailData?.penaltyStatusList.findIndex(
              (el) => el.label === detailData.penaltyStatus
            )}
            penaltyStatusList={detailData?.penaltyStatusList}
            onValidate={onValidatePenaltyStatus}
          />
        </div>
        <div className="flex justify-center">
          <CancelButton onClick={onCancelUpdatePenaltyStatus} />
          <SaveButton
            disabled={!updatablePenalty}
            onClick={onUpdatePenaltyStatus}
          />
        </div>
      </MidPopupModal>

      {/* loading  */}
      <Loading isLoading={loading} />

      <>{contextHolder}</>
    </>
  );
}
