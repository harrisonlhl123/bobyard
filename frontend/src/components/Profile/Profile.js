import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserComments, clearCommentErrors, getUserComments } from '../../store/comments';
import CommentBox from '../Comments/CommentBox';

function Profile () {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const userComments = useSelector(getUserComments(currentUser._id))
  
  useEffect(() => {
    dispatch(fetchUserComments(currentUser._id));
    return () => dispatch(clearCommentErrors());
  }, [currentUser, dispatch]);

  if (userComments.length === 0) {
    return <div>{currentUser.username} has no Comments</div>;
  } else {
    return (
      <>
        <h2>All of {currentUser.username}'s Comments</h2>
        {userComments.map(comment => (
          <CommentBox
            key={comment._id}
            comment={comment}
          />
        ))}
      </>
    );
  }
}

export default Profile;