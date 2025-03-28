"use client";

export default function MidPopupModal({
  isOpen,
  title,
  description,
  useCloseBtn = false,
  onClose,
  children,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white w-[440px] max-w-full rounded-lg shadow-lg p-6">
        {/* Title */}
        <div className="justify-between items-center mb-4">
          <div className="flex">
            <h2 className="text-lg font-bold text-black">{title}</h2>
            <button className={`${useCloseBtn ? "hidden" : ""}}`}>x</button>
          </div>
          <p className="text-md text-black my-3 text-center">{description}</p>
        </div>

        {/* Content */}
        <div className="max-h-[60vh] overflow-auto">{children}</div>
      </div>
    </div>
  );
}
