import "./CommentBox.css"
import EditCommentModal from "./EditCommentModal";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../store/comments";
import Replies from "./Replies";

function CommentBox ({ comment: { _id, text, author, date, image, likes, id }}) {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user)

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteComment(_id));
  }

  return (
    <div className="comment-box">
      <div className="comment">
        <div className="comment-header">
          <h3 className="author">{author}</h3>
          <p className="date">{date}</p>
        </div>
        <p className="comment-text">{text}</p>
        <p className="likes">Likes: {likes}</p>
        {image && <img className="comment-image" src={image}></img>}
        <br></br>
        {currentUser?._id == '66182fc8f225c9be4094ee26' && (
          <>
            <EditCommentModal commentId={_id}/>
            <button className="delete-button" onClick={handleDelete}>Delete</button>
          </>
        )}
        
        <Replies parentId={id}/>
      </div>
    </div>
  );
}

export default CommentBox;

