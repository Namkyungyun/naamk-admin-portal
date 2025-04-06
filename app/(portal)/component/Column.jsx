export function FullColumn({ height, title, isFull = false, children }) {
  return (
    <div
      className={`${height ? height : "h-10"}  flex col-span-6 grid grid-cols-6`}
    >
      <div
        className={`col-span-1 ${title ? "bg-disabled" : ""} flex items-center justify-center text-center`}
      >
        <label className="text-black text-sm font-semibold whitespace-pre-line leading-none">
          {title}
        </label>
      </div>
      <div
        className={`col-span-5 break-words overflow-y-auto content-center ${isFull ? "mx-1" : "mx-2"}`}
      >
        {children}
      </div>
    </div>
  );
}

export function MDColumn({
  borderTop,
  height,
  title,
  isFull = false,
  children,
}) {
  return (
    <div
      className={`${height ? height : "h-10"} ${borderTop ? "border-t border-bd-disabled" : ""} flex col-span-3 grid grid-cols-3`}
    >
      <div
        className={`col-span-1 ${title ? "bg-disabled" : ""} flex items-center justify-center text-center`}
      >
        <label className="text-black text-sm font-semibold whitespace-pre-line leading-none">
          {title}
        </label>
      </div>

      <div
        className={`col-span-2 break-words overflow-y-auto content-center ${isFull ? "mx-1" : "mx-2"}`}
      >
        {children}
      </div>
    </div>
  );
}
