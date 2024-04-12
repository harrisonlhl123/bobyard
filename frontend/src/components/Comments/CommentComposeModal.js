import React, { useState } from 'react';
import { Modal } from '../Modal/Modal';
import CommentCompose from './CommentCompose';
import './CommentComposeModal.css';

function CommentComposeModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="comment-button" onClick={() => {setShowModal(true)}}>Make comment</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CommentCompose setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )
}

export default CommentComposeModal