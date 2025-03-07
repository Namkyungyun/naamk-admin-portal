"use client";
import "@/app/globals.css";

const Test = () => {
  return (
    <div>
      {/* 제목 & 설명 영역 */}
      <section className="bg-blue-900 text-white p-6 rounded-lg w-full">
        제목이랑 설명이 들어갈 영역
      </section>

      {/* 검색 영역 */}
      <section className="bg-blue-900 text-white p-6 rounded-lg w-full">
        검색 영역
      </section>

      {/* 표 영역 */}
      <section className="bg-blue-900 text-white p-6 rounded-lg flex-grow w-full">
        표
      </section>

      {/* 페이지네이션 영역 */}
      <section className="bg-blue-900 text-white p-6 rounded-lg w-full">
        페이지네이션이 들어갈 페이지 영역 (ex. &lt; 1 2 3 4 5 ... &gt;)
      </section>
    </div>
  );
};

export default Test;
