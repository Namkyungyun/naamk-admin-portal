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
  const [fetchedInit, setFetchedInit] = useState(false);

  /// userdatail data
  const initUserData = {
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
  const [userData, setUserData] = useState(null);

  /// penalty data
  const penaltyTableHeader = [
    { variableName: "id", variableLabel: "구분" },
    { variableName: "createdAt", variableLabel: "처리일시" },
    { variableName: "createdBy", variableLabel: "처리자" },
    { variableName: "penaltyStatus", variableLabel: "제재 상태" },
    { variableName: "description", variableLabel: "제재사유" },
    {
      variableName: "isExistReport",
      variableLabel: "신고보기",
      url: "linkedId",
      onButton: (url) => window.open("/users", "_blank"), // TODO 사용자 신고관리 상세
    },
    { variableName: "linkedId", variableLabel: "", hidden: true },
  ];
  const [penaltyTableBody, setPenaltyTableBody] = useState([]);

  /// penalty update popup
  const updatePenaltyForm = {
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

    setUserData(userDetailData);
    setPenaltyTableBody(penaltyHistData);

    updatePenaltyForm.name = userDetailData?.name;
    setUpdatePenaltyData(updatePenaltyForm);

    setFetchedInit(true);
    setLoading(false);
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

    fetchUpdate();
  };

  const onCancelUpdatePenaltyStatus = () => {
    setShowPenaltyPopup(false);
    setUptablePenalty(false);

    updatePenaltyForm.name = userData?.name;
    setUpdatePenaltyData(updatePenaltyForm);
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
            user={userData ?? initUserData}
            isFetched={fetchedInit}
            onPenaltyUpdate={() => setShowPenaltyPopup(true)}
          />
        </div>

        <div className="flex flex-col h-full mt-4">
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
                    headers={penaltyTableHeader}
                    body={penaltyTableBody}
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
            initData={updatePenaltyData}
            readOnly={false}
            penaltyStatusList={userData?.penaltyStatusList}
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

      <>{contextHolder}</>
    </>
  );
}
