"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

import PageSubTitle from "@/app/(portal)/component/PageSubTitle";
import SectionTitle from "@/app/(portal)/component/SectionTitle";
import UserDetailGrid from "../component/DetailGrid";
import TabComponent from "@/app/(portal)/component/Tab";
import { ListTable } from "@/app/(portal)/component/ListTable";
import { getUserById, getUserPenaltyHist } from "../actions";
import MidPopupModal from "@/app/(portal)/component/MDPopupModal";
import { CancelButton, SaveButton } from "@/app/(portal)/component/Buttons";
import UserPenaltyPopupGrid from "../component/PenaltyPopupGrid";

export default function UserDetailPage() {
  const { userId } = useParams(); // ✅ 여기서 직접 접근 가능

  const [loading, setLoading] = useState(false);
  const [fetchedInit, setFetchedInit] = useState(false);

  /// userdatail data
  const [userData, setUserData] = useState({
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
  });

  /// penalty data
  const penaltyTableHeader = [
    { variableName: "id", variableLabel: "구분" },
    { variableName: "name", variableLabel: "처리일시" },
    { variableName: "nickname", variableLabel: "처리자" },
    { variableName: "userStatus", variableLabel: "제재 상태" },
    { variableName: "penaltyStatus", variableLabel: "제재사유" },
    { variableName: "email", variableLabel: "신고보기" },
  ];
  const [penaltyTableBody, setPenaltyTableBody] = useState([]);

  /// penalty update popup
  const updatePenaltyForm = {
    name: null,
    type: "user",
    isActive: false,
    reason: null,
  };
  const [showPenaltyPopup, setShowPenaltyPopup] = useState(false);
  const [updatablePenalty, setUptablePenalty] = useState(false);
  const [updatePenaltyData, setUpdatePenaltyData] = useState({});

  const onValidatePenaltyStatus = (obj) => {
    const valid = obj.valid;
    setUptablePenalty(valid);

    if (valid) {
      const data = obj.data;
      setUpdatePenaltyData(data);
    }
  };

  const onUpdatePenaltyStatus = (data) => {
    console.log(data);
  };

  const onCancelUpdatePenaltyStatus = () => {
    setShowPenaltyPopup(false);
    setUptablePenalty(false);

    updatePenaltyForm.name = userData.name;
    setUpdatePenaltyData(updatePenaltyForm);
  };

  /// init
  useEffect(() => {
    /// UserDetail API fetch
    const fetchInit = async () => {
      setLoading(true);

      const [userDetailData, penaltyHistData] = await Promise.all([
        getUserById(userId),
        getUserPenaltyHist(userId),
      ]);

      setUserData(userDetailData);
      setPenaltyTableBody(penaltyHistData);

      updatePenaltyForm.name = userDetailData.name;
      setUpdatePenaltyData(updatePenaltyForm);

      setFetchedInit(true);
      setLoading(false);
    };

    fetchInit();
  }, []);

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
            user={userData}
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
                    buttons={{
                      name: (url) => {
                        router.push(`/users/${url}`);
                      },
                    }}
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
            penaltyStatusList={userData.penaltyStatusList}
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
    </>
  );
}
