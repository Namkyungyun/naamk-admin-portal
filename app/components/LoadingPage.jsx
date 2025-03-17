import LoadingDot from "./LoadingDot";

export default function LoadingPage() {
  return (
    <div className="gradient-container">
      <div className="center-box">
        <LoadingDot loading={true} />
      </div>
    </div>
  );
}
