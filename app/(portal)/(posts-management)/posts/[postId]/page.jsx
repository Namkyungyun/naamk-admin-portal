"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useToastMessage } from "@/app/provider/MessageProvider";

import PageSubTitle from "@/app/(portal)/component/PageSubTitle";
import SectionTitle from "@/app/(portal)/component/SectionTitle";
import PostDetailGrid from "../component/DetailGrid";
import {
  ListCount,
  ListTable,
  Pagination,
} from "@/app/(portal)/component/ListTable";
import MidPopupModal from "@/app/(portal)/component/MDPopupModal";
import PostPenaltyPopupGrid from "../component/PenaltyPopupGrid";
import { CancelButton, SaveButton } from "@/app/(portal)/component/Buttons";
import Loading from "@/app/(portal)/component/Loading";

import {
  postDetailSearchAPI,
  postDetailAPI,
  postPenaltyHistAPI,
  postPenaltyUpdateAPI,
} from "../actions";

export default function PostDetailPage() {
  const { postId } = useParams();
  const { showPenaltyMessage, showMessage } = useToastMessage();

  const searchOptions = postDetailSearchAPI();
  const post = postDetailAPI();
  const penaltyHist = postPenaltyHistAPI();
  const penaltyUpdate = postPenaltyUpdateAPI();

  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [fetchedInit, setFetchedInit] = useState(false);

  // post detail data
  const initPostDetailData = post.responseData;
  const [detailData, setDetailData] = useState(null);

  /// penalty history list
  const penaltyHistTableHeader = penaltyHist.responseData;
  const [penaltyHistTableBody, setPenaltyHistTableBody] = useState([]);

  /// pagination data
  const [totalPageNo, setTotalPageNo] = useState(0);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [reqSearchData, setReqSearchData] = useState(
    searchOptions.defaultPageParam
  );

  /// penalty update popup
  const [showPenaltyPopup, setShowPenaltyPopup] = useState(false);
  const [updatablePenalty, setUptablePenalty] = useState(false);
  const [updatePenaltyData, setUpdatePenaltyData] = useState({});

  /// API [ postDetailData, penaltyHistData ]
  const fetchInit = async () => {
    setLoading(true);

    const [postDetailData, penaltyHistData] = await Promise.all([
      post.fetchAPI(postId),
      penaltyHist.fetchAPI(postId, reqSearchData),
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
      penaltyUpdate.fetchAPI(postId, updatePenaltyData)
    );
    const result = updated.linkedId != null;

    setLoading(false);
    showPenaltyMessage(result);

    if (result) {
      setShowPenaltyPopup(false);
      setRefresh(true);
    }
  };

  /// penalty ( 팝업 때메 )
  const setPenaltyData = (data) => {
    if (data) {
      penaltyUpdate.requestData.label = data.penaltyStatus;
      penaltyUpdate.requestData.isActive = data.penalty;
    } else {
      penaltyUpdate.requestData.label = detailData.penaltyStatus;
      penaltyUpdate.requestData.isActive = detailData.penalty;
    }

    setUpdatePenaltyData({ ...penaltyUpdate.requestData });
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
      setRefresh(true);
    }
  };

  const onPageItemCountChange = (count) => {
    setReqSearchData((prev) => ({
      ...prev,
      pageNo: 1,
      pageSize: count,
    }));

    if (fetchedInit) {
      setRefresh(true);
    }
  };

  /// init render
  useEffect(() => {
    fetchInit();
  }, []);

  /// rebuild render
  useEffect(() => {
    if (refresh) {
      fetchInit();
      setRefresh(false);
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
            optionData={searchOptions.pageOptions}
            defaultIndex={searchOptions.defaultPageOptionIndex}
            onChange={onPageItemCountChange}
          />
        </div>

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
                maxVisible={searchOptions.visiblePageNo}
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
    </>
  );
}
