import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCommentErrors, composeComment } from '../../store/comments';
import CommentBox from './CommentBox';
import './CommentCompose.css';

function CommentCompose ({setShowModal}) {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const author_id = useSelector(state => state.session.user);
  const author = author_id.username;
  const newComment = useSelector(state => state.comments.new);
  const errors = useSelector(state => state.errors.comments);
  // debugger

  useEffect(() => {
    return () => dispatch(clearCommentErrors());
  }, [dispatch]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(composeComment({ text, author })).then(() => setShowModal(false)); 
    setText('');
  };

  const update = e => setText(e.currentTarget.value);

  return (
    <>
      <form className="compose-tweet" onSubmit={handleSubmit}>
        <input 
          type="textarea"
          value={text}
          onChange={update}
          placeholder="Write your comment..."
          required
        />
        <div className="errors">{errors?.text}</div>
        <input type="submit" value="Submit" />
      </form>
      {/* <div className="tweet-preview">
        <h3>Comment Preview</h3>
        {text ? <CommentBox comment={{text, author}} /> : undefined}
      </div>
      <div className="previous-tweet">
        <h3>Previous Comment</h3>
        {newComment ? <CommentBox comment={newComment} /> : undefined}
      </div> */}
    </>
  )
}

export default CommentCompose;