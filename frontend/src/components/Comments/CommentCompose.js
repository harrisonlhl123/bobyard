import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCommentErrors, composeComment } from '../../store/comments';
import './CommentCompose.css';

function CommentCompose ({setShowModal}) {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const author_id = useSelector(state => state.session.user);
  const author = author_id.username;
  const newComment = useSelector(state => state.comments.new);
  const errors = useSelector(state => state.errors.comments);

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
      <form className="comment-compose" onSubmit={handleSubmit}>
        <textarea 
          className="comment-textarea"
          value={text}
          onChange={update}
          placeholder="Write your comment..."
          required
        />
        <div className="errors">{errors?.text}</div>
        <input type="submit" value="Submit" className="submit-button" />
      </form>
    </>
  )
}

export default CommentCompose;