import "@/app/components/editor/styles.scss";
import { useRef, useEffect } from "react";

export default function UrlPopup({ onConfirm, onCancel }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div>
      <input
        ref={inputRef}
        id="url-input"
        type="text"
        placeholder="https://example.com"
        className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onConfirm(e.target.value);
          }
          if (e.key === "Escape") {
            onCancel();
          }
        }}
      />
      <div className="flex justify-end gap-2">
        <div className="flex justify-end mt-2 gap-2">
          <button
            className="text-sm px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => onCancel()}
          >
            취소
          </button>
          <button
            className="text-sm px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => onConfirm(inputRef.current.value)}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

{
  /* // <div className="dropdown-warpper"> */
}
//   <label
//     htmlFor="url-input"
//     className="block text-sm font-medium text-gray-700 mb-1"
//   >
//     링크 URL
//   </label>
//   <input
//     ref={inputRef}
//     id="url-input"
//     type="text"
//     placeholder="https://example.com"
//     className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
//     onKeyDown={(e) => {
//       if (e.key === "Enter") {
//         onConfirm(e.target.value);
//       }
//       if (e.key === "Escape") {
//         onCancel();
//       }
//     }}
//   />
//   <div className="flex justify-end mt-2 gap-2">
//     <button
//       className="text-sm px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
//       onClick={onCancel}
//     >
//       취소
//     </button>
//     <button
//       className="text-sm px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
//       onClick={() => onConfirm(inputRef.current.value)}
//     >
//       확인
//     </button>
//   </div>
// </div>
