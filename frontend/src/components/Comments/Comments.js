import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCommentErrors, fetchComments } from '../../store/comments';
import CommentBox from './CommentBox';

function Comments () {
  const dispatch = useDispatch();
  const comments = useSelector(state => Object.values(state.comments));
  
  useEffect(() => {
    dispatch(fetchComments());
    return () => dispatch(clearCommentErrors());
  }, [dispatch])

  if (comments.length === 0) return <div>There are no Comments</div>;

  return (
    <>
      <h2>All Comments</h2>
      {comments.map(comment => (
        <CommentBox key={comment._id} comment={comment} />
      ))}
    </>
  );
}

export default Comments;