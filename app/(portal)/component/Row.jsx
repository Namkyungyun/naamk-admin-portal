export function RowFor3Column({ borderTop, children }) {
  return (
    <div
      className={`grid grid-cols-9 bg-canvas border-l border-r border-b border-bd-disabled ${borderTop ? "border-t" : ""}`}
    >
      {children}
    </div>
  );
}

export function RowFor2Column({ borderTop, children }) {
  return (
    <div
      className={`grid grid-cols-6 bg-canvas border-l border-r border-b border-bd-disabled ${borderTop ? "border-t" : ""}`}
    >
      {children}
    </div>
  );
}

export function RowFor1Column({ borderTop, children }) {
  return (
    <div
      className={`grid grid-cols-3 bg-canvas border-l border-r border-b border-bd-disabled ${borderTop ? "border-t" : ""}`}
    >
      {children}
    </div>
  );
}
