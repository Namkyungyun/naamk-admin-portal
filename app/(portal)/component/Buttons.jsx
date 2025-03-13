"use client";

import { SmallIconButton } from "@/app/components/Buttons";

const style = {
  disabled: "text-fg-disabled bg-disabled border border-bd-disabled",
  save: "text-fg-static-light bg-brand-100 border border-bd-disabled",
  update: "text-fg-static-light bg-brand-50 border border-bd-disabled",
  delete: "text-fg-base bg-subtle border border-bd-disabled",
  confirm: "text-fg-static-light bg-brand-100 border border-bd-disabled",
  download: "text-fg-base bg-brand-10 border-bd-interactive-primary",
  cancel: "text-fg-base bg-subtle border border-bd-disabled",
};

export function SaveButton({ disabled, onClick }) {
  return (
    <div className="m-2">
      <SmallIconButton
        disabled={disabled}
        bgClassName={style.save}
        text="저장"
        onClick={onClick}
      />
    </div>
  );
}

export function UpdateButton({ disabled, onClick }) {
  return (
    <div className="m-2">
      <SmallIconButton
        disabled={disabled}
        bgClassName={style.update}
        text="수정"
        onClick={onClick}
      />
    </div>
  );
}

export function DeleteButton({ disabled, onClick }) {
  return (
    <div className="m-2">
      <SmallIconButton
        disabled={disabled}
        bgClassName={style.delete}
        text="삭제"
        onClick={onClick}
      />
    </div>
  );
}

export function ConfirmButton({ disabled, onClick }) {
  return (
    <div className="m-2">
      <SmallIconButton
        disabled={disabled}
        bgClassName={style.confirm}
        text="확인"
        onClick={onClick}
      />
    </div>
  );
}

export function CancelButton({ disabled, onClick }) {
  return (
    <div className="m-2">
      <SmallIconButton
        disabled={disabled}
        bgClassName={style.cancel}
        text="취소"
        onClick={onClick}
      />
    </div>
  );
}

export function DownloadButton({ disabled, prefix = "", onClick }) {
  return (
    <div className="m-2">
      <SmallIconButton
        disabled={disabled}
        bgClassName={style.download}
        text={prefix + "다운로드"}
        onClick={onClick}
      />
    </div>
  );
}
