"use client";
import { useEffect, useState } from "react";

import { MDColumn } from "@/app/(portal)/component/Column";
import { RowFor2Column } from "@/app/(portal)/component/Row";
import { SelectBox } from "@/app/(portal)/component/SelectBox";
import { LimitedLengthTextArea } from "@/app/(portal)/component/TextArea";
import { CancelButton, SaveButton } from "@/app/(portal)/component/Buttons";
import OpenInNew from "@mui/icons-material/OpenInNew";

export default function UserPenaltyDetailGrid({
  loading,
  fetched,
  reportedUser,
  penaltyForm,
  onUpdate,
  onCancel,
}) {
  const [validDescription, setValidDescription] = useState(false);
  const [validStatus, setValidStatus] = useState(false);
  const [updatablePenalty, setUptablePenalty] = useState(false);
  const [penaltyFormData, setPenaltyFormData] = useState({});
  const [penaltyFormReset, setPenaltyFormReset] = useState(false);

  const onValidateForm = (isValid) => {
    setUptablePenalty(isValid);
  };

  const onValidateDescription = (obj) => {
    const valid = obj.result;
    const text = obj.text;

    penaltyFormData.description = text;
    setValidDescription(valid);
  };

  const onValidateStatus = (value) => {
    if (reportedUser.penalty == null) {
      // 최초
      setValidStatus(value == false);
    } else if (reportedUser.penalty == false) {
      // 차단
      setValidStatus(value == true);
    } else {
      // 정상
      setValidStatus(value == false);
    }

    penaltyFormData.isActive = value;
  };

  const onUpdatePenaltyStatus = () => {
    const test = penaltyFormData;
    if (onUpdate) {
      onUpdate(penaltyFormData);
    }
  };

  const onCancelUpdatePenaltyStatus = () => {
    setUptablePenalty(false);

    // reset
    setPenaltyFormReset(true);
    setTimeout(() => {
      setPenaltyFormReset(false);
    }, "500");

    if (onCancel) {
      onCancel("success", "(TP)신고 처리취소");
    }
  };

  /// init
  useEffect(() => {
    setPenaltyFormData(penaltyForm);
  }, []);

  /// rebuild
  useEffect(() => {
    onValidateForm(validDescription && validStatus);
  }, [validDescription, validStatus]);

  return (
    <>
      <section className="border border-bd-muted p-1 flex-grow w-full my-1 text-black">
        <RowFor2Column>
          <MDColumn title="신고일시">{reportedUser.latestCreatedAt}</MDColumn>
          <MDColumn title="처리일시">{reportedUser.penaltyCreatedAt}</MDColumn>
        </RowFor2Column>

        <RowFor2Column>
          <MDColumn title="대상자ID">
            {reportedUser.reportedUserName != null ? (
              <div className="flex justify-between">
                <button
                  onClick={() =>
                    window.open(
                      `/users/${reportedUser.reportedUserId}`,
                      "_blank"
                    )
                  }
                >
                  <span className="underline">
                    {reportedUser.reportedUserName}
                  </span>
                </button>

                <button
                  className="text-sm text-gray-600 underline"
                  onClick={() =>
                    window.open(reportedUser.reportedUserProfileUrl, "_blank")
                  }
                >
                  <span className="mr-1">프로필 보러가기</span>
                  <OpenInNew style={{ fontSize: 16 }} />
                </button>
              </div>
            ) : null}
            {/* {reportedUser.reportedUserName} */}
          </MDColumn>
          <MDColumn title="처리자ID">{reportedUser.penaltyCreatedBy}</MDColumn>
        </RowFor2Column>

        <RowFor2Column>
          <MDColumn title="계정 상태">{reportedUser.userStatus}</MDColumn>
          <MDColumn title="처리 상태*">
            <SelectBox
              isFetched={fetched}
              isReset={penaltyFormReset}
              disabled={
                reportedUser.penalty != null && reportedUser.report == false
              }
              useAllOption={false}
              useDefault={
                reportedUser.penalty != null && reportedUser.report == false
              }
              defaultIndex={reportedUser?.penaltyStatusList.findIndex(
                (el) => el.label === reportedUser.penaltyStatus
              )}
              optionData={reportedUser.penaltyStatusList}
              onChange={onValidateStatus}
            />
          </MDColumn>
        </RowFor2Column>

        <RowFor2Column>
          <MDColumn></MDColumn>
          <MDColumn title="제재 사유*">
            <LimitedLengthTextArea
              isReset={penaltyFormReset}
              isLoading={loading}
              disabled={reportedUser.penaltyDescription != null}
              readOnly={reportedUser.penaltyDescription != null}
              isRequired={false}
              minLength={1}
              placeholder={"(필수) 사유를 작성해 주세요."}
              value={reportedUser.penaltyDescription}
              onChange={onValidateDescription}
            />
          </MDColumn>
        </RowFor2Column>
      </section>
      <div className="flex justify-end">
        <CancelButton
          disabled={!updatablePenalty}
          onClick={onCancelUpdatePenaltyStatus}
        />
        <SaveButton
          disabled={!updatablePenalty}
          onClick={onUpdatePenaltyStatus}
        />
      </div>
    </>
  );
}
