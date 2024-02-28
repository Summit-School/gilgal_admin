import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_CLOSE_TYPES,
} from "../../../utils/globalConstantUtil";
import { showNotification } from "../headerSlice";
import { deleteTestimony } from "../../Testimony/testimonySlice";
import { deleteGallery } from "../../Gallery/gallerySlice";
import { deleteEvents } from "../../Events/eventSlice";

function ConfirmationModalBody({ extraObject, closeModal }) {
  const dispatch = useDispatch();

  const { message, type, _id, index } = extraObject;

  const proceedWithYes = async () => {
    if (type === CONFIRMATION_MODAL_CLOSE_TYPES.ROOM_DELETE) {
      // positive response, call api or dispatch redux function
      // dispatch(deleteRoom({ index }));
      dispatch(showNotification({ message: "Room Deleted!", status: 1 }));
    }
    else if (type === CONFIRMATION_MODAL_CLOSE_TYPES.TESTIMONY_DELETE) {
      // positive response, call api or dispatch redux function
      dispatch(deleteTestimony({ index }));
      dispatch(showNotification({ message: "Testimony Deleted!", status: 1 }));
    }
    else if (type === CONFIRMATION_MODAL_CLOSE_TYPES.GALLERY_DELETE) {
      // positive response, call api or dispatch redux function
      dispatch(deleteGallery({ index }));
      dispatch(showNotification({ message: "Gallery Deleted!", status: 1 }));
    }
    else if (type === CONFIRMATION_MODAL_CLOSE_TYPES.EVENT_DELETE) {
      // positive response, call api or dispatch redux function
      dispatch(deleteEvents({ index }));
      dispatch(showNotification({ message: "Event Deleted!", status: 1 }));
    }
    else if (type === CONFIRMATION_MODAL_CLOSE_TYPES.PARTNER_DELETE) {
      // positive response, call api or dispatch redux function
      dispatch(deleteEvents({ index }));
      dispatch(showNotification({ message: "Partner Deleted!", status: 1 }));
    }
    else if (type === CONFIRMATION_MODAL_CLOSE_TYPES.NEWS_DELETE) {
      // positive response, call api or dispatch redux function
      dispatch(deleteEvents({ index }));
      dispatch(showNotification({ message: "News Deleted!", status: 1 }));
    }
    else if (type === CONFIRMATION_MODAL_CLOSE_TYPES.COURSE_DELETE) {
      // positive response, call api or dispatch redux function
      dispatch(deleteEvents({ index }));
      dispatch(showNotification({ message: "Course Deleted!", status: 1 }));
    }
    closeModal();
  };

  return (
    <>
      <p className=" text-xl mt-8 text-center">{message}</p>

      <div className="modal-action mt-12">
        <button className="btn btn-outline   " onClick={() => closeModal()}>
          Cancel
        </button>

        <button
          className="btn btn-primary w-36"
          onClick={() => proceedWithYes()}
        >
          Yes
        </button>
      </div>
    </>
  );
}

export default ConfirmationModalBody;
