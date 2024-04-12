import React, { useState } from 'react';
// import EditComment from './EditComment';
import { Modal } from '../Modal/Modal';
import CommentCompose from './CommentCompose';

function CommentComposeModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => {setShowModal(true)}}>Make comment</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CommentCompose setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )
}

export default CommentComposeModal