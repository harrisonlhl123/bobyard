import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";


function OneComment ({comment}) {
    const currentUser = useSelector(state => state.session.user)
    const dispatch = useDispatch();

    return (
        <>
            {comment.user.username}: {comment.text}
        </>
    );
}

export default OneComment