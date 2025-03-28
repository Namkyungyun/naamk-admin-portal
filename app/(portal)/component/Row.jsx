export function RowFor3Column({ children }) {
  return <div className="grid grid-cols-9 bg-canvas">{children}</div>;
}

export function RowFor2Column({ children }) {
  return <div className="grid grid-cols-6 bg-canvas">{children}</div>;
}

export function RowFor1Column({ children }) {
  return <div className="grid grid-cols-3 bg-canvas">{children}</div>;
}
