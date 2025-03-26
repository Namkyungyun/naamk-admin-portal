import { SmallIconButton } from "@/app/components/Buttons";

const style = {
  primary: "text-fg-static-light bg-brand-100 border border-bd-disabled",
  secondary: "text-fg-static-light bg-brand-50 border border-bd-disabled",
  tertiary: "text-fg-base bg-brand-10 border border-bd-disabled",
  quarternary: "text-fg-base bg-subtle border border-bd-disabled",
  disabled: "text-fg-disabled bg-disabled border border-bd-disabled",
  black: "text-fg-static-light bg-black border border-bd-disabled",
};

export function PrimaryButton({ label, disabled, onClick }) {
  return (
    <div className="m-2">
      <SmallIconButton
        disabled={disabled}
        bgClassName={style.primary}
        text={label}
        onClick={onClick}
      />
    </div>
  );
}

export function SecondaryButton({ label, disabled, onClick }) {
  return (
    <div className="m-2">
      <SmallIconButton
        disabled={disabled}
        bgClassName={style.secondary}
        text={label}
        onClick={onClick}
      />
    </div>
  );
}

export function TertiaryButton({ label, disabled, onClick }) {
  return (
    <div className="m-2">
      <SmallIconButton
        disabled={disabled}
        bgClassName={style.tertiary}
        text={label}
        onClick={onClick}
      />
    </div>
  );
}

export function QuaternaryButton({ label, disabled, onClick }) {
  return (
    <div className="m-2">
      <SmallIconButton
        disabled={disabled}
        bgClassName={style.quarternary}
        text={label}
        onClick={onClick}
      />
    </div>
  );
}

export function BlackButton({ label, disabled, onClick }) {
  return (
    <div className="m-2">
      <SmallIconButton
        disabled={disabled}
        bgClassName={style.black}
        text={label}
        onClick={onClick}
      />
    </div>
  );
}

export function SaveButton({ disabled, onClick }) {
  return <PrimaryButton label={"저장"} disabled={disabled} onClick={onClick} />;
}

export function UpdateButton({ disabled, onClick }) {
  return (
    <SecondaryButton label={"수정"} disabled={disabled} onClick={onClick} />
  );
}

export function DeleteButton({ disabled, onClick }) {
  return (
    <QuaternaryButton label={"삭제"} disabled={disabled} onClick={onClick} />
  );
}

export function ConfirmButton({ disabled, onClick }) {
  return <PrimaryButton label={"확인"} disabled={disabled} onClick={onClick} />;
}

export function CancelButton({ disabled, onClick }) {
  return (
    <QuaternaryButton label={"취소"} disabled={disabled} onClick={onClick} />
  );
}

export function SearchButton({ disabled, onClick }) {
  return <BlackButton label={"검색"} disabled={disabled} onClick={onClick} />;
}

export function ResetButton({ disabled, onClick }) {
  return <BlackButton label={"초기화"} disabled={disabled} onClick={onClick} />;
}

export function DownloadButton({ disabled, prefix = "", onClick }) {
  return (
    <TertiaryButton
      label={prefix + "다운로드"}
      disabled={disabled}
      onClick={onClick}
    />
  );
}
