"use client";

import { MDColumn, FullColumn } from "@/app/(portal)/component/Column";
import { RowFor2Column } from "@/app/(portal)/component/Row";
import { PenaltyUpdateButton } from "@/app/(portal)/component/Buttons";

export default function PostDetailGrid({
  detailData,
  updatable,
  onPenaltyUpdate,
}) {
  return (
    <section className="p-1 flex-grow w-full my-1 text-black">
      <RowFor2Column borderTop={true}>
        <MDColumn title="등록 일시">{detailData.createdAt}</MDColumn>
        <MDColumn title="게시글 ID">{detailData.postId}</MDColumn>
      </RowFor2Column>

      <RowFor2Column>
        <MDColumn title="채널ID">{detailData.channelName}</MDColumn>
        <MDColumn title="채널명">{detailData.channelNickName}</MDColumn>
      </RowFor2Column>

      <RowFor2Column>
        <MDColumn title="작성ID">
          <button
            onClick={() => window.open(`/users/${detailData.userId}`, "_blank")}
          >
            <span className="underline">{detailData.userName}</span>
          </button>
        </MDColumn>
        <MDColumn title="POPSCORE">{detailData.popScore}</MDColumn>
      </RowFor2Column>

      <RowFor2Column>
        <MDColumn title="댓글 수">{detailData.replyCount}</MDColumn>
        <MDColumn title="좋아요 수">{detailData.likeCount}</MDColumn>
      </RowFor2Column>

      <RowFor2Column>
        <MDColumn title={"글 / 채널\n노출 상태"}>
          {detailData.postStatus} / {detailData.channelPenaltyStatus}
        </MDColumn>
        <MDColumn title="제재 상태">
          {detailData.penaltyStatus ? (
            <div className="flex justify-between items-center">
              <span>{detailData.penaltyStatus}</span>
              <PenaltyUpdateButton
                disabled={updatable}
                onClick={onPenaltyUpdate}
              />
            </div>
          ) : (
            detailData.penaltyStatus
          )}
        </MDColumn>
      </RowFor2Column>

      <RowFor2Column>
        <FullColumn height="h-25" title="게시글 내용">
          {detailData.content}
        </FullColumn>
      </RowFor2Column>

      <RowFor2Column>
        <FullColumn height="h-40" title="첨부 파일">
          <div className="flex py-2">
            {detailData.thumbs
              ? detailData.thumbs.map((el, index) => (
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
