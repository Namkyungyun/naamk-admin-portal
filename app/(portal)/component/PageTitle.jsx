"use client";

export default function PageTitle({ beforePages = [], currentPage }) {
  return (
    <>
      <section className="p-3 flex-grow w-full">
        <div className="flex">
          {beforePages.length > 0
            ? beforePages.map((page, index) => (
                <p
                  key={index}
                  className="text-gray-400 text-xl font-bold mr-1" // 여기도 색상 수정 필요!
                >
                  {`${page} >`}
                </p>
              ))
            : null}

          <p className="text-black text-xl font-bold">{currentPage}</p>
        </div>
      </section>
    </>
  );
}
