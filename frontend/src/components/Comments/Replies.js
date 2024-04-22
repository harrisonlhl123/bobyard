import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCommentErrors, fetchComments } from '../../store/comments';
import CommentBox from './CommentBox';

function Replies ({parentId}) {
  const dispatch = useDispatch();
  const comments = useSelector(state => Object.values(state.comments));
  const replyComments = comments.filter((comment) => comment.parent == parentId);
  
  useEffect(() => {
    dispatch(fetchComments());
    return () => dispatch(clearCommentErrors());
  }, [dispatch])

  if (comments.length === 0) return <div>There are no Comments</div>;

  return (
    <>
      {replyComments.map(replyComment => (
        <CommentBox key={replyComment._id} comment={replyComment} />
      ))}
    </>
  );
}

export default Replies;