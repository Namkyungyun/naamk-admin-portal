"use client";

import { useState } from "react";

export default function TabComponent({ tabs }) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const activeContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <>
      {/* 탭 헤더 (고정) */}
      <div className="flex border-b border-gray-500">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 text-sm font-bold border-t border-l border-r border-gray-500
                ${
                  isActive
                    ? "bg-white text-black border-b-white -mb-px"
                    : "bg-gray-100 text-gray-600"
                }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 탭 내용 (스크롤 대상) */}
      <div className="flex-1 overflow-y-auto p-2 border-b border-l border-r border-bd-muted bg-white text-black">
        {activeContent}
      </div>
    </>
  );
}
