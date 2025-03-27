"use client";

export default function SectionTitle({ title }) {
  return (
    <div className="flex mt-2 mb-1">
      <p className="text-black text-l font-bold">• {title}</p>
    </div>
  );
}
