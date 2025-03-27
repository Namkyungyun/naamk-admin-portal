"use client";

import { MDColumn } from "@/app/(portal)/component/Column";
import { RowFor2Column } from "@/app/(portal)/component/Row";

export default function UserDetailGrid({ user }) {
  return (
    <section className="border border-bd-muted p-1 flex-grow w-full my-1">
      <RowFor2Column className>
        <MDColumn title="회원ID">값</MDColumn>
        <MDColumn title="가입일시">값</MDColumn>
      </RowFor2Column>
      <RowFor2Column>
        <MDColumn title="계정 상태">값</MDColumn>
        <MDColumn title="제재 상태">값</MDColumn>
      </RowFor2Column>
      <RowFor2Column>
        <MDColumn title="사용자명">값</MDColumn>
        <MDColumn title="이메일">값</MDColumn>
      </RowFor2Column>
      <RowFor2Column>
        <MDColumn title="소개글">d</MDColumn>
        <MDColumn title="프로필 사진">
          <img className="p-5" src="/default-placeholder.png" />
        </MDColumn>
      </RowFor2Column>
    </section>
  );
}
