import React, { useState } from 'react';
import EditComment from './EditComment';
import { Modal } from '../Modal/Modal';

function EditCommentModal({commentId}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => {setShowModal(true)}}>Edit</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditComment commentId={commentId} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )
}

export default EditCommentModal