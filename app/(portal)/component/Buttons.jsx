"use client";

import { SmallIconButton } from "@/app/components/Buttons";

const style = {
  disabled: "text-fg-disabled bg-disabled",
  save: "text-fg-static-light bg-success-contrast border border-bd-interactive-primary",
  update:
    "text-fg-static-light bg-info-contrast border border-bd-interactive-primary",
  delete:
    "text-fg-static-light bg-danger-primary border border-bd-interactive-primary",
  confirm: "text-fg-base bg-info border border-bd-interactive-primary",
  download: "text-fg-base bg-warning border border-bd-interactive-primary",
  cancel: "text-fg-base bg-subtle border border-bd-interactive-primary",
};

export function SaveButton({ disabled, onClick }) {
  return (
    <SmallIconButton
      disabled={disabled}
      bgClassName={style.save}
      text="저장"
      onClick={onClick}
    >
      {/* <Add /> */}
    </SmallIconButton>
  );
}

export function UpdateButton({ disabled, onClick }) {
  return (
    <SmallIconButton
      disabled={disabled}
      bgClassName={style.update}
      text="수정"
      onClick={onClick}
    >
      {/* <Add /> */}
    </SmallIconButton>
  );
}

export function DeleteButton({ disabled, onClick }) {
  return (
    <SmallIconButton
      disabled={disabled}
      bgClassName={style.delete}
      text="삭제"
      onClick={onClick}
    >
      {/* <Add /> */}
    </SmallIconButton>
  );
}

export function ConfirmButton({ disabled, onClick }) {
  return (
    <SmallIconButton
      disabled={disabled}
      bgClassName={style.confirm}
      text="확인"
      onClick={onClick}
    >
      {/* <Add /> */}
    </SmallIconButton>
  );
}

export function CancelButton({ disabled, onClick }) {
  return (
    <SmallIconButton
      disabled={disabled}
      bgClassName={style.cancel}
      text="취소"
      onClick={onClick}
    >
      {/* <Add /> */}
    </SmallIconButton>
  );
}

export function DownloadButton({ disabled, text, onClick }) {
  return (
    <SmallIconButton
      disabled={disabled}
      bgClassName={style.download}
      text={text + " 다운로드"}
      onClick={onClick}
    >
      {/* <Add /> */}
    </SmallIconButton>
  );
}
