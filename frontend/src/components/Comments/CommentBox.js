import "./CommentBox.css"
import EditCommentModal from "./EditCommentModal";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../store/comments";

function CommentBox ({ comment: { _id, text, author }}) {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user)

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteComment(_id));
  }

  return (
    <div className="tweet">
      <h3>{author}</h3>
      <p>{text}</p>
      {/* {currentUser?._id == author?._id && (
        <> */}
          <EditCommentModal commentId={_id}/>
          <button onClick={handleDelete}>Delete</button>
        {/* </>
      )} */}
    </div>
  );
}

export default CommentBox;

