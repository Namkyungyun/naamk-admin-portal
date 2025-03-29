"use client";
import { useEffect, useState } from "react";
import { MDColumn } from "@/app/(portal)/component/Column";
import { RowFor1Column } from "@/app/(portal)/component/Row";
import { SelectBox } from "@/app/(portal)/component/SelectBox";
import { LimitedLengthTextArea } from "@/app/(portal)/component/TextArea";

export default function UserPenaltyPopupGrid({
  initData,
  readOnly = false,
  penaltyStatusList,
  onValidate,
}) {
  const [validDescription, setValidDescription] = useState(false);
  const [validStatus, setValidStatus] = useState(false);
  const [statusIndex, setStatusIndex] = useState(0);

  /// init
  useEffect(() => {
    if (penaltyStatusList) {
      const index = penaltyStatusList.findIndex(
        (el) => el.value === initData.isActive
      );
      setStatusIndex(index);
    }
  }, []);

  /// rebuild
  useEffect(() => {
    onValidateForm(validDescription && validStatus);
  }, [validDescription, validStatus]);

  const onValidateForm = (isValid) => {
    onValidate({
      valid: isValid,
      data: initData,
    });
  };

  const onValidateDescription = (obj) => {
    const valid = obj.result;
    const text = obj.text;

    initData.description = text;
    setValidDescription(valid);
  };

  const onValidateStatus = (value) => {
    initData.isActive = value;
    setValidStatus(true);
  };

  /// init
  useEffect(() => {}, []);

  return (
    <section className="border border-bd-muted p-1 flex-grow w-full my-1 text-black">
      <RowFor1Column>
        <MDColumn title="회원ID">{initData.name}</MDColumn>
      </RowFor1Column>
      <RowFor1Column>
        <MDColumn title="제재 상태*" isFull={true}>
          <SelectBox
            disabled={readOnly}
            useAllOption={false}
            useDefault={readOnly}
            defaultIndex={statusIndex}
            optionData={penaltyStatusList}
            onChange={onValidateStatus}
          />
        </MDColumn>
      </RowFor1Column>
      <RowFor1Column>
        <MDColumn title="제재 사유*" isFull={true}>
          <LimitedLengthTextArea
            readOnly={readOnly}
            disabled={readOnly}
            isRequired={false}
            minLength={1}
            placeholder={"(필수) 사유를 작성해 주세요."}
            value={initData.description}
            onChange={onValidateDescription}
          />
        </MDColumn>
      </RowFor1Column>
    </section>
  );
}
