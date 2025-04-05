"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

import { message } from "antd";
import PageSubTitle from "@/app/(portal)/component/PageSubTitle";
import SectionTitle from "@/app/(portal)/component/SectionTitle";
import UserDetailGrid from "../component/DetailGrid";
import TabComponent from "@/app/(portal)/component/Tab";
import { ListTable } from "@/app/(portal)/component/ListTable";
import MidPopupModal from "@/app/(portal)/component/MDPopupModal";
import { CancelButton, SaveButton } from "@/app/(portal)/component/Buttons";
import UserPenaltyPopupGrid from "../component/PenaltyPopupGrid";
import Loading from "@/app/(portal)/component/Loading";

import {
  getUserById,
  getUserPenaltyHist,
  updateUserPenaltyStatus,
} from "../actions";

export default function UserDetailPage() {
  const { userId } = useParams();
  const [messageApi, contextHolder] = message.useMessage();

  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  /// userdatail data
  const initUserDetailData = {
    id: null,
    name: null,
    nickname: null,
    email: null,
    intro: null,
    createdAt: null,
    thumbSUrl: null,
    userStatus: null,
    penaltyStatus: null,
    penaltyStatusList: null,
  };
  const [detailData, setDetailData] = useState(null);

  /// penalty data
  const penaltyHistTableHeader = [
    { variableName: "rowNum", variableLabel: "구분" },
    { variableName: "id", variableLabel: "", hidden: true },
    { variableName: "createdAt", variableLabel: "처리일시" },
    { variableName: "createdBy", variableLabel: "처리자" },
    { variableName: "penaltyStatus", variableLabel: "제재 상태" },
    { variableName: "description", variableLabel: "제재사유" },
    {
      variableName: "isExistReport",
      variableLabel: "신고보기",
      url: "linkedId",
      onButton: (url) => window.open(`/user-reports/${url}`, "_blank"), // TODO 사용자 신고관리 상세
    },
    { variableName: "linkedId", variableLabel: "", hidden: true },
  ];
  const [penaltyHistTableBody, setPenaltyHistTableBody] = useState([]);

  /// penalty update popup
  const penaltyForm = {
    name: null,
    type: "user",
    isActive: null,
    description: null,
  };
  const [showPenaltyPopup, setShowPenaltyPopup] = useState(false);
  const [updatablePenalty, setUptablePenalty] = useState(false);
  const [updatePenaltyData, setUpdatePenaltyData] = useState({});

  const fetchInit = async () => {
    setLoading(true);

    const [userDetailData, penaltyHistData] = await Promise.all([
      getUserById(userId),
      getUserPenaltyHist(userId),
    ]);

    setDetailData(userDetailData);
    setPenaltyHistTableBody(penaltyHistData);
    setPenaltyData(userDetailData);

    setLoading(false);
  };

  const fetchUpdate = async () => {
    setLoading(true);
    const updated = await Promise.resolve(
      updateUserPenaltyStatus(userId, updatePenaltyData)
    );
    setLoading(false);

    const result = updated.id != null;
    const type = result ? "success" : "error";
    const message = result ? "저장되었습니다." : "저장되지 않았습니다.";
    onMessage(type, message);

    if (result) {
      setShowPenaltyPopup(false);
      onRefresh();
    }
  };

  /// penalty ( 팝업 때메 )
  const setPenaltyData = (data) => {
    if (data) {
      penaltyForm.name = data.name;
      penaltyForm.label = data.penaltyStatus;
      penaltyForm.isActive = data.penalty;
    } else {
      penaltyForm.name = detailData.name;
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

  /// init
  useEffect(() => {
    /// UserDetail API fetch
    fetchInit();
  }, []);

  /// rebuild
  useEffect(() => {
    if (refresh) {
      fetchInit();
    }
  }, [refresh]);

  return (
    <>
      <div className="flex flex-col h-full">
        <div>
          {/* 상단 화면명 */}
          <PageSubTitle
            beforePages={["회원관리"]}
            currentPage="회원정보 상세"
          />
          <SectionTitle title="기본정보" />
          <UserDetailGrid
            user={detailData ?? initUserDetailData}
            updatable={loading}
            onPenaltyUpdate={() => setShowPenaltyPopup(true)}
          />
        </div>

        <div className="flex flex-col h-full mt-4 overflow-hidden">
          <TabComponent
            tabs={[
              {
                id: 1,
                label: "자산정보",
                content: (
                  <div className="flex justify-center h-30 items-center text-gray-400">
                    재화정책 정리 후 작성예정
                  </div>
                ),
              },
              {
                id: 2,
                label: "제재이력",
                content: (
                  <ListTable
                    headers={penaltyHistTableHeader}
                    body={penaltyHistTableBody}
                  />
                ),
              },
            ]}
          />
        </div>
      </div>
      <MidPopupModal
        isOpen={showPenaltyPopup}
        title="제재상태 변경하기"
        description={`해당 회원의 제재 상태를 변경 하려면 \n 아래 항목을 작성하세요.`}
      >
        <div>
          <UserPenaltyPopupGrid
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
