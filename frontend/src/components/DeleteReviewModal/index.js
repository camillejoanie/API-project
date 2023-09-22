import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteReview } from "../../store/reviews";
import './DeleteReviewModal.css'


function DeleteReviewModal(props) {
    const { id, spotId } = props.props
    const { closeModal } = useModal();
    const dispatch = useDispatch()

    const handleDelete = async (e) => {
        dispatch(deleteReview(id, spotId));
        closeModal()
    }

    return (
        <div className="confirm-delete-modal">
            <h1 className="confirm-delete-modal-heading">Confirm Delete</h1>
            <h2 className="confirm-delete-modal-text">Are you sure you want to delete this Review?</h2>
            <button className='delete-modal-delete-Review' onClick={handleDelete}>Yes (Delete Review)</button>
            <button className='delete-modal-keep-Review' onClick={closeModal}>No (Keep Review)</button>


        </div>
    )
}

export default DeleteReviewModal
