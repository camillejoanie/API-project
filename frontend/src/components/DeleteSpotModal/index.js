import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSpot } from "../../store/spots";
import './DeleteSpotModal.css'


function DeleteSpotModal(props) {
    const id = props.props
    const { closeModal } = useModal();
    const dispatch = useDispatch()

    const handleDelete = async (e) => {
        dispatch(deleteSpot(id));
        closeModal()
    }

    return (
        <div className="confirm-delete-modal">
            <h1 className="confirm-delete-modal-heading">Confirm Delete</h1>
            <p className="confirm-delete-modal-text">Are you sure you want to remove this spot from the listings?</p>
            <button className='delete-modal-delete-spot' onClick={handleDelete}>Yes (Delete Spot)</button>
            <button className='delete-modal-keep-spot' onClick={closeModal}>No (Keep Spot)</button>


        </div>
    )
}

export default DeleteSpotModal
