import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ErrorText from "../../components/Typography/ErrorText";
import { showNotification } from "../common/headerSlice"
import { updateUserEmail } from "../../app/reducers/app";

function UpdateEmailModal({ closeModal, extraObject }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [email, setEmail] = useState("")

    const { item } = extraObject

    const saveNewEvent = async () => {
        if (email) {
            const data = { id: item.id, email }
            await dispatch(updateUserEmail(data)).then((res) => {
                if (res.meta.requestStatus === "rejected") {
                    setErrorMessage(res.payload)
                    setLoading(false)
                    return
                }
                dispatch(showNotification({ message: "Email updated!", status: 1 }));
                localStorage.setItem("gilgal_towers_admin", res.payload.token)
                setLoading(false)
                closeModal();
            }).catch((err) => {
                console.error(err)
                setLoading(false)
            })
        }
        else {
            return setErrorMessage("All fields are required!");
        }
    }


    useEffect(() => {
        setEmail(item.email)
    }, [item])


    return (
        <>
            <p style={{ marginTop: 20 }}>Email</p>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input input-bordered w-full mt-2" />

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

export default UpdateEmailModal;
