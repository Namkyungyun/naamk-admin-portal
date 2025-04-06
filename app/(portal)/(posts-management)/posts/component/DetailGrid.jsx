"use client";

import { MDColumn, FullColumn } from "@/app/(portal)/component/Column";
import { RowFor2Column } from "@/app/(portal)/component/Row";
import { PenaltyUpdateButton } from "@/app/(portal)/component/Buttons";

export default function PostDetailGrid({ post, updatable, onPenaltyUpdate }) {
  return (
    <section className="p-1 flex-grow w-full my-1 text-black">
      <RowFor2Column borderTop={true}>
        <MDColumn title="등록 일시">{post.createdAt}</MDColumn>
        <MDColumn title="게시글 ID">{post.postId}</MDColumn>
      </RowFor2Column>

      <RowFor2Column>
        <MDColumn title="채널ID">{post.channelName}</MDColumn>
        <MDColumn title="채널명">{post.channelNickName}</MDColumn>
      </RowFor2Column>

      <RowFor2Column>
        <MDColumn title="작성ID">{post.userName}</MDColumn>
        <MDColumn title="POPSCORE">{post.popScore}</MDColumn>
      </RowFor2Column>

      <RowFor2Column>
        <MDColumn title="댓글 수">{post.replyCount}</MDColumn>
        <MDColumn title="좋아요 수">{post.likeCount}</MDColumn>
      </RowFor2Column>

      <RowFor2Column>
        <MDColumn title={"글 / 채널\n노출 상태"}>
          {post.postStatus} / {post.channelPenaltyStatus}
        </MDColumn>
        <MDColumn title="제재 상태">
          {post.penaltyStatus ? (
            <div className="flex justify-between items-center">
              <span>{post.penaltyStatus}</span>
              <PenaltyUpdateButton
                disabled={updatable}
                onClick={onPenaltyUpdate}
              />
            </div>
          ) : (
            post.penaltyStatus
          )}
        </MDColumn>
      </RowFor2Column>

      <RowFor2Column>
        <FullColumn height="h-25" title="게시글 내용">
          {post.content}
        </FullColumn>
      </RowFor2Column>

      <RowFor2Column>
        <FullColumn height="h-40" title="첨부 파일">
          <div className="flex py-2">
            {post.thumbs
              ? post.thumbs.map((el, index) => (
                  <img
                    key={index}
                    className="w-32 h-32 object-contain mr-4"
                    src={el}
                    alt={`thumb-${index}`}
                  />
                ))
              : null}
          </div>
        </FullColumn>
      </RowFor2Column>
    </section>
  );
}
