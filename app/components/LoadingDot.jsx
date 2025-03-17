export default function LoadingDot({ loading }) {
  if (!loading) return null;

  return (
    <div className="h-20 flex items-center justify-center">
      <Dot className="delay7" />
      <Dot className="delay14" />
      <Dot className="delay21" />
    </div>
  );
}

const Dot = ({ className }) => (
  <span
    className={`rounded-full bg-primary-400 w-4 h-4 m-[2px] animate-loading delay7 ${className}`}
  ></span>
);
