import React from "react";
import Comment from "./Comment";

const comments = [
    {
        name: "한지수",
        comment: "안녕하세요. 한지수입니다.",
    },
    {
        name: "두지수",
        comment: "안녕하세요. 두지수입니다.",
    },
    {
        name: "세지수",
        comment: "안녕하세요. 세지수입니다.",
    },
];

function CommentList(props) {
    return (
        <div>
            {comments.map((c) => {
                return (
                    <Comment name={c.name} comment={c.comment} />
                );
            })}
        </div>
    );
}

export default CommentList;