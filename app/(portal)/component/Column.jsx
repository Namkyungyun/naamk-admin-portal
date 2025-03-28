export function FullColumn({ title, isFull = false, children }) {
  return (
    <div className="flex col-span-6 grid grid-cols-6 border border-bd-subtle">
      <div className="col-span-1 bg-muted text-center content-center">
        <label className="text-black text-sm font-semibold leading-9">
          {title}
        </label>
      </div>
      <div
        className={`col-span-5 break-words content-center ${isFull ? "mx-1" : "mx-2"}`}
      >
        {children}
      </div>
    </div>
  );
}

export function MDColumn({ title, isFull = false, children }) {
  return (
    <div className="flex col-span-3 grid grid-cols-3 border border-bd-subtle">
      <div className="col-span-1 bg-disabled text-center content-center">
        <label className="text-black text-sm font-semibold leading-9">
          {title}
        </label>
      </div>

      <div
        className={`col-span-2 break-words content-center ${isFull ? "mx-1" : "mx-2"}`}
      >
        {children}
      </div>
    </div>
  );
}
