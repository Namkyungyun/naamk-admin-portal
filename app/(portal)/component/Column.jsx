export function FullColumn({ title, children }) {
  return (
    <div className="flex col-span-6 grid grid-cols-6 border border-bd-subtle">
      <div className="col-span-1 bg-disabled text-center">
        <label className="text-black text-sm font-semibold leading-9">
          {title}
        </label>
      </div>
      <div className="mx-1 col-span-5 content-center">{children}</div>
    </div>
  );
}

export function MDColumn({ title, children }) {
  return (
    <div className="flex col-span-3 grid grid-cols-3 border border-bd-subtle">
      <div className="col-span-1 bg-disabled text-center">
        <label className="text-black text-sm font-semibold leading-9">
          {title}
        </label>
      </div>

      <div className="mx-1 col-span-2 content-center">{children}</div>
    </div>
  );
}
