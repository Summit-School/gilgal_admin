import { useState } from "react";
import { useDispatch } from "react-redux";
import ErrorText from "../../components/Typography/ErrorText";
import { showNotification } from "../common/headerSlice"
import { updateBooking } from "../../app/reducers/app";

function UpdateBookingModalBody({ closeModal, extraObject }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [status, setStatus] = useState("")

  const { item } = extraObject

  const saveNewEvent = async () => {
    if (status) {
      const data = { id: item._id, status }
      await dispatch(updateBooking(data)).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          setErrorMessage(res.payload)
          setLoading(false)
          return
        }
        dispatch(showNotification({ message: "Booking updated!", status: 1 }));
        setLoading(false)
        closeModal();
      }).catch((err) => {
        console.error(err)
        setLoading(false)
      })
    }
    else {
      return setErrorMessage("All field is required!");
    }
  }

  return (
    <>
      <p style={{ marginTop: 20 }}>Select Status</p>
      <select className="input input-bordered w-full mt-2" onChange={(e) => setStatus(e.target.value)}>
        <option>Select Status</option>
        <option value={"active"}>Active</option>
        <option value={"closed"}>Closed</option>
        <option value={"cancelled"}>Cancelled</option>

      </select>

      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>
          Cancel
        </button>
        <button className="btn btn-primary px-6" onClick={() => saveNewEvent()}>
          {loading ? "Loading..." : "Save"}
        </button>
      </div>
    </>
  );
}

export default UpdateBookingModalBody;
