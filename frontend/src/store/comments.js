import jwtFetch from './jwt';
import { RECEIVE_USER_LOGOUT } from './session';

const RECEIVE_COMMENTS = "comments/RECEIVE_COMMENTS";
const RECEIVE_COMMENT = "comments/RECEIVE_COMMENT"
const RECEIVE_COMMENT_ERRORS = "comments/RECEIVE_COMMENT_ERRORS";
const CLEAR_COMMENT_ERRORS = "comments/CLEAR_COMMENT_ERRORS";
const UPDATE_COMMENT = "comments/UPDATE_COMMENT";
const REMOVE_COMMENT = "comments/REMOVE_COMMENT";

const receiveComments = comments => ({
  type: RECEIVE_COMMENTS,
  comments
});

const receiveComment = comment => ({
  type: RECEIVE_COMMENT,
  comment
})

const receiveErrors = errors => ({
  type: RECEIVE_COMMENT_ERRORS,
  errors
});

const updateComment = comment => ({
  type: UPDATE_COMMENT,
  comment
})

const removeComment = commentId => ({
  type: REMOVE_COMMENT,
  commentId
})

export const clearCommentErrors = errors => ({
    type: CLEAR_COMMENT_ERRORS,
    errors
});

export const getComment = commentId => state => {
  const commentArray = Object.values(state.comments) || [];
  const comment = commentArray.find(c => c._id === commentId);
  return comment || null;
};

export const getComments = state => state.comments ? state.comments : [];

export const fetchComments = () => async dispatch => {
    try {
      const res = await jwtFetch ('/api/comments');
      const comments = await res.json();
      dispatch(receiveComments(comments));
    } catch (err) {
      const resBody = await err.json();
      if (resBody.statusCode === 400) {
        dispatch(receiveErrors(resBody.errors));
      }
    }
  };

  export const fetchComment = commentId => async dispatch => {
    const res = await jwtFetch(`api/comments/${commentId}`);

    if (res.ok) {
      const comment = await res.json();
      dispatch(receiveComment(comment));
    }
  }
  
  export const composeComment = data => async dispatch => {
    try {
      const res = await jwtFetch('/api/comments/', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      const comment = await res.json();
      dispatch(receiveComment(comment));
    } catch(err) {
      const resBody = await err.json();
      if (resBody.statusCode === 400) {
        return dispatch(receiveErrors(resBody.errors));
      }
    }
  };

  export const patchComment = (comment) => async dispatch => {
    const res = await jwtFetch((`/api/comments/${comment._id}`), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comment)
    })

    if (res.ok) {
      const comment = await res.json()
      dispatch(updateComment(comment))
    }
  }

export const deleteComment = (commentId) => async dispatch => {
  const res = await jwtFetch((`/api/comments/${commentId}`), {
    method: "DELETE"
  })

  if (res.ok) {
    dispatch(removeComment(commentId))
  }
}


const nullErrors = null;

export const commentErrorsReducer = (state = nullErrors, action) => {
  switch(action.type) {
    case RECEIVE_COMMENT_ERRORS:
      return action.errors;
    case CLEAR_COMMENT_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};

const commentsReducer = (state = {}, action) => {
  const newState = {...state};

  switch(action.type){
      case RECEIVE_COMMENTS:
          return {...newState, ...action.comments};
      case RECEIVE_COMMENT:
          return {[action.comment._id]: action.comment, ...newState};      
      case UPDATE_COMMENT:
          return    {...newState, [action.comment._id]: action.comment};
      case REMOVE_COMMENT:
        delete newState[action.commentId]
        return newState
      default:
          return state;
  }
}

  
  export default commentsReducer;
