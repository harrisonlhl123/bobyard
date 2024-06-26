import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCommentErrors, fetchComments } from '../../store/comments';
import CommentBox from './CommentBox';
import CommentComposeModal from './CommentComposeModal';

function Comments () {
  const dispatch = useDispatch();
  const comments = useSelector(state => Object.values(state.comments));
  const parentComments = comments.filter((comment) => comment.parent == '');
  
  useEffect(() => {
    dispatch(fetchComments());
    return () => dispatch(clearCommentErrors());
  }, [dispatch])

  if (comments.length === 0) return <div>There are no Comments</div>;

  return (
    <>
      <h2>Which technologies do you prefer to use?</h2>
      <CommentComposeModal />
      {parentComments.map(parentComment => (
        <CommentBox key={parentComment._id} comment={parentComment} />
      ))}
    </>
  );
}

export default Comments;