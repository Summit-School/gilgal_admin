import { useState } from "react";
import { useDispatch } from "react-redux";
import ErrorText from "../../components/Typography/ErrorText";
import { showNotification } from "../common/headerSlice"
import { updateUserPassword } from "../../app/reducers/app";

function UpdatePasswordModal({ closeModal, extraObject }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

    const { item } = extraObject

    const updatePsswordHandler = async () => {
        if (currentPassword && newPassword) {
            const data = { id: item.id, currentPassword, newPassword }
            await dispatch(updateUserPassword(data)).then((res) => {
                if (res.meta.requestStatus === "rejected") {
                    setErrorMessage(res.payload)
                    setLoading(false)
                    return
                }
                dispatch(showNotification({ message: "Password updated!", status: 1 }));
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


    return (
        <>
            <p style={{ marginTop: 20 }}>Current Password</p>
            <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="input input-bordered w-full mt-2" />

            <p style={{ marginTop: 20 }}>New Password</p>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="input input-bordered w-full mt-2" />

            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button className="btn btn-ghost" onClick={() => closeModal()}>
                    Cancel
                </button>
                <button className="btn btn-primary px-6" onClick={() => updatePsswordHandler()}>
                    {loading ? "Loading..." : "Save"}
                </button>
            </div>
        </>
    );
}

export default UpdatePasswordModal;
