"use client";

import { MDColumn } from "@/app/(portal)/component/Column";
import { RowFor2Column } from "@/app/(portal)/component/Row";
import { PenaltyUpdateButton } from "@/app/(portal)/component/Buttons";

export default function UserDetailGrid({ user, updatable, onPenaltyUpdate }) {
  return (
    <section className="p-1 flex-grow w-full my-1 text-black">
      <RowFor2Column borderTop={true}>
        <MDColumn title="회원ID">{user.name}</MDColumn>
        <MDColumn title="가입일시">{user.createdAt}</MDColumn>
      </RowFor2Column>

      <RowFor2Column>
        <MDColumn title="계정 상태">{user.userStatus}</MDColumn>
        <MDColumn title="제재 상태">
          {user.penaltyStatus ? (
            <div className="flex justify-between items-center">
              <span>{user.penaltyStatus}</span>
              <PenaltyUpdateButton
                disabled={updatable}
                onClick={onPenaltyUpdate}
              />
            </div>
          ) : (
            user.penaltyStatus
          )}
        </MDColumn>
      </RowFor2Column>

      <RowFor2Column>
        <MDColumn title="사용자명">{user.nickname}</MDColumn>
        <MDColumn title="이메일">{user.email}</MDColumn>
      </RowFor2Column>

      <RowFor2Column>
        <MDColumn height="h-50" title="소개글">
          {user.intro}
        </MDColumn>
        <MDColumn height="h-50" title="프로필 사진">
          {user.thumbSUrl ? (
            <img className="py-5" src={user.thumbSUrl} />
          ) : null}
        </MDColumn>
      </RowFor2Column>
    </section>
  );
}
