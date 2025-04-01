"use client";

import LoadingDot from "@/app/components/LoadingDot";

export default function Loading({ isLoading }) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center">
      <div className="center-box z-50">
        <LoadingDot loading={true} />
      </div>
    </div>
  );
}
