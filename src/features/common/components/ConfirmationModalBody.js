import { useDispatch } from "react-redux";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_CLOSE_TYPES,
} from "../../../utils/globalConstantUtil";
import { showNotification } from "../headerSlice";

import { deleteRoom, deleteEvent, deleteCategory, updateGallery } from "../../../app/reducers/app";
import { useState } from "react";

function ConfirmationModalBody({ extraObject, closeModal }) {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();

  const { message, type, item, index } = extraObject;

  const proceedWithYes = async () => {
    if (type === CONFIRMATION_MODAL_CLOSE_TYPES.ROOM_DELETE) {
      setLoading(true)
      dispatch(deleteRoom(item._id)).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          dispatch(showNotification({ message: res.payload, status: 0 }));
          setLoading(false)
          return
        }
        dispatch(showNotification({ message: `${item.title} Deleted!`, status: 1 }));
        setLoading(false)
        return
      }).catch((err) => {
        console.error(err)
        setLoading(false)
      })
    }
    else if (type === CONFIRMATION_MODAL_CLOSE_TYPES.EVENT_DELETE) {
      setLoading(true)
      dispatch(deleteEvent(item._id)).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          dispatch(showNotification({ message: res.payload, status: 0 }));
          setLoading(false)
          return
        }
        dispatch(showNotification({ message: `${item.title} Deleted!`, status: 1 }));
        setLoading(false)
        return
      }).catch((err) => {
        console.error(err)
        setLoading(false)
      })
    } else if (type === CONFIRMATION_MODAL_CLOSE_TYPES.CATEGORY_DELETE) {
      setLoading(true)
      dispatch(deleteCategory(item._id)).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          dispatch(showNotification({ message: res.payload, status: 0 }));
          setLoading(false)
          return
        }
        dispatch(showNotification({ message: `${item.title} Deleted!`, status: 1 }));
        setLoading(false)
        return
      }).catch((err) => {
        console.error(err)
        setLoading(false)
      })
    }
    else if (type === CONFIRMATION_MODAL_CLOSE_TYPES.GALLERY_DELETE) {
      setLoading(true)
      dispatch(updateGallery(item)).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          dispatch(showNotification({ message: res.payload, status: 0 }));
          setLoading(false)
          return
        }
        dispatch(showNotification({ message: `${item.category} Deleted!`, status: 1 }));
        setLoading(false)
        return
      }).catch((err) => {
        console.error(err)
        setLoading(false)
      })
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
          {loading ? "Loading..." : "Yes"}
        </button>
      </div>
    </>
  );
}

export default ConfirmationModalBody;
