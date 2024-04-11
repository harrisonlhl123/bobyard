import './EditComment.css'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComment, getComment, patchComment } from '../../store/comments'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const EditComment = ({commentId, setShowModal}) => {

    const dispatch = useDispatch();
    const comment = useSelector(getComment(commentId));
    const [text, setText] = useState(comment.text);
    const history = useHistory();


    function changeBody(e) {
        setText(e.target.value)
    }

    async function handleSubmit(e) {
        e.preventDefault();
        dispatch(patchComment({_id: commentId, text})).then(() => setShowModal(false));
    }
      
    return(
        <>
            <form onSubmit={handleSubmit}>
                <textarea onChange={changeBody} value={text}></textarea>
                <input type="submit" value="Update Comment"></input>
            </form>
        </>
    )
}

export default EditComment;