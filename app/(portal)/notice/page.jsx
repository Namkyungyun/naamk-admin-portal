"use client";
import { CancelButton, SaveButton } from "../component/Buttons";
import DefaultEditor from "@/app/components/editor/Editor";

export default function EditorPage() {
  return (
    <section className="border text-black p-6 rounded-lg flex-grow w-full my-10">
      {/* title  */}
      <div>
        <label className="text-lg font-bold"> Title </label>
        <input
          className="rounded-lg border border-bd-muted w-full py-2 px-2"
          id="title"
          type="string"
        />
      </div>
      <div className="py-3" />
      {/* content */}
      <div>
        <label className="text-lg font-bold">Content</label>
        <DefaultEditor className="rounded-lg border border-bd-muted px-2 py-8" />
      </div>

      {/* buttons */}
      <div className="flex justify-end">
        <CancelButton />
        <SaveButton />
      </div>
    </section>
  );
}
