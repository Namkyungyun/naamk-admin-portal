export function RowFor3Column({ children }) {
  return <div className="grid grid-cols-9 bg-canvas">{children}</div>;
}

export function RowFor2Column({ children }) {
  reutrn(<div className="grid grid-cols-6 bg-canvas">{children}</div>);
}
