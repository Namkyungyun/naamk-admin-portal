const style = {
  disabled: "text-fg-disabled bg-disabled",
};

export function SmallButton({
  className = "",
  bgClassName = "bg-primary border border-primary text-black disabled:bg-disabled",
  type = "button",
  text,
  btnRef,
  children,
  ...props
}) {
  return (
    <button
      className={`rounded-lg text-sm font-semibold px-5 py-2 disabled:bg-disabled disabled:text-fg-disabled disabled:cursor-not-allowed ${className} ${bgClassName}`}
      ref={btnRef}
      type={type}
      {...props}
    >
      {children}
      {text}
    </button>
  );
}
export function SmallBorderButton({
  className = "",
  bgClassName = "bg-gray-900 text-white border-gray disabled:border-disabled",
  iconClassName = "",
  ...props
}) {
  return (
    <SmallButton
      className={className}
      bgClassName={`border ${bgClassName} ${iconClassName}`}
      {...props}
    />
  );
}
export function SmallIconButton({ className, children, ...rest }) {
  return (
    <SmallButton
      className={`px-3 py-2 flex gap-1 items-center justify-center self-center rounded-lg ${className}`}
      {...rest}
    >
      {children}
    </SmallButton>
  );
}

export function SmallBorderIconButton({ children, ...rest }) {
  return (
    <SmallBorderButton
      iconClassName="flex items-center justify-center gap-2 md:flex-none"
      {...rest}
    >
      {children}
    </SmallBorderButton>
  );
}

export default function LargeButton({
  className = "",
  bgClassName = "bg-primary text-black disabled:bg-gray-700",
  type = "button",
  text,
  btnRef,
  children,
  ...props
}) {
  return (
    <button
      className={`rounded-lg px-4 py-3 text-base font-semibold disabled:text-gray disabled:cursor-not-allowed ${bgClassName} ${className}`}
      ref={btnRef}
      type={type}
      {...props}
    >
      {children}
      {text}
    </button>
  );
}

export function LargeBorderButton({
  className = "",
  iconClassName = "",
  bgClassName = "bg-gray-900 disabled:bd-disabled text-white border-gray",
  ...props
}) {
  return (
    <LargeButton
      className={`${className} ${iconClassName}`}
      bgClassName={`border ${bgClassName}`}
      {...props}
    />
  );
}

export function LargePrimaryBorderButton({
  className = "",
  bgClassName = "bg-gray-900 disabled:bd-disabled text-primary border-primary",
  ...props
}) {
  return (
    <LargeButton
      className={className}
      bgClassName={`border ${bgClassName}`}
      {...props}
    />
  );
}

export function LargeBorderIconButton({ text, children, ...rest }) {
  return (
    <LargeBorderButton
      iconClassName="flex items-center justify-center gap-2 md:flex-none"
      text={text}
      {...rest}
    >
      {children}
    </LargeBorderButton>
  );
}
