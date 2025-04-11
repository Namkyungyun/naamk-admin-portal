"use client";
import { useEffect, useState } from "react";

import { MDColumn } from "@/app/(portal)/component/Column";
import { RowFor2Column } from "@/app/(portal)/component/Row";
import { SelectBox } from "@/app/(portal)/component/SelectBox";
import { LimitedLengthTextArea } from "@/app/(portal)/component/TextArea";
import { CancelButton, SaveButton } from "@/app/(portal)/component/Buttons";
import OpenInNew from "@mui/icons-material/OpenInNew";

export default function UserReportDetailGrid({
  loading,
  fetched,
  detailData,
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
    if (detailData.penalty == null) {
      // 최초
      setValidStatus(value == false);
    } else if (detailData.penalty == false) {
      // 차단
      setValidStatus(value == true);
    } else {
      // 정상
      setValidStatus(value == false);
    }

    penaltyFormData.isActive = value;
  };

  const onUpdatePenaltyStatus = () => {
    if (onUpdate) {
      const result = onUpdate(penaltyFormData);
      if (result) {
        setUptablePenalty(false);
      }
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
      onCancel("success", "저장되지 않았습니다.");
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
      <section className="p-1 flex-grow w-full my-1 text-black">
        <RowFor2Column>
          {/* 신고정보 */}
          <div className="flex col-span-3 grid grid-cols-3">
            <MDColumn borderTop={true} title="신고일시">
              {detailData.latestCreatedAt}
            </MDColumn>
            <MDColumn borderTop={true} title="대상자ID">
              {detailData.reportedUserName != null ? (
                <div className="flex justify-between">
                  <button
                    onClick={() =>
                      window.open(
                        `/users/${detailData.reportedUserId}`,
                        "_blank"
                      )
                    }
                  >
                    <span className="underline">
                      {detailData.reportedUserName}
                    </span>
                  </button>

                  <button
                    className="text-sm text-gray-600 underline"
                    onClick={() =>
                      window.open(detailData.reportedUserP, "_blank")
                    }
                  >
                    <span className="mr-1">프로필 보러가기</span>
                    <OpenInNew style={{ fontSize: 16 }} />
                  </button>
                </div>
              ) : null}
            </MDColumn>

            <MDColumn borderTop={true} title="계정 상태">
              {detailData.userStatus}
            </MDColumn>
            <MDColumn borderTop={true} height="h-40" />
          </div>

          {/* 패널티 */}
          <div className="flex col-span-3 grid grid-cols-3">
            <MDColumn borderTop={true} title="처리일시">
              {detailData.penaltyCreatedAt}
            </MDColumn>
            <MDColumn borderTop={true} title="처리자ID">
              {detailData.penaltyCreatedBy}
            </MDColumn>
            <MDColumn borderTop={true} title="처리 상태*">
              <SelectBox
                isFetched={fetched}
                isReset={penaltyFormReset}
                disabled={
                  detailData.penalty != null && detailData.report == false
                }
                useAllOption={false}
                useDefault={
                  detailData.penalty != null && detailData.report == false
                }
                defaultIndex={detailData?.penaltyStatusList.findIndex(
                  (el) => el.label === detailData.penaltyStatus
                )}
                optionData={detailData.penaltyStatusList}
                onChange={onValidateStatus}
              />
            </MDColumn>
            <MDColumn borderTop={true} height="h-40" title="제재 사유*">
              <LimitedLengthTextArea
                isReset={penaltyFormReset}
                isLoading={loading}
                disabled={detailData.penaltyDescription != null}
                readOnly={detailData.penaltyDescription != null}
                isRequired={false}
                minLength={1}
                placeholder={"(필수) 사유를 작성해 주세요."}
                value={detailData.penaltyDescription}
                onChange={onValidateDescription}
              />
            </MDColumn>
          </div>
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
