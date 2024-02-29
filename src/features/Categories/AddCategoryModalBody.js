import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../components/Input/InputText";
import ErrorText from "../../components/Typography/ErrorText";
import { showNotification } from "../common/headerSlice";
import { addCategory } from "../../app/reducers/app";

const INITIAL_CATEGORY_OBJ = {
  title: ""
};

function AddCategoryModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [CategoryObj, setCategoryObj] = useState(INITIAL_CATEGORY_OBJ);

  const saveNewPartner = async () => {
    if (CategoryObj.title.trim() === "") return setErrorMessage("Title is required!");
    else {
      setLoading(true)
      const data = {
        title: CategoryObj.title
      }
      await dispatch(addCategory(data)).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          setErrorMessage(res.payload)
          setLoading(false)
          return
        }
        dispatch(showNotification({ message: "New Category Added!", status: 1 }));
        setLoading(false)
        closeModal();
      }).catch((err) => {
        console.error(err)
        setLoading(false)
      })
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setCategoryObj({ ...CategoryObj, [updateType]: value });
  };

  return (
    <>
      <InputText
        type="text"
        defaultValue={CategoryObj.title}
        updateType="title"
        containerStyle="mt-4"
        labelTitle="Title"
        updateFormValue={updateFormValue}
      />

      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>
          Cancel
        </button>
        <button
          className="btn btn-primary px-6"
          onClick={() => saveNewPartner()}
        >
          {loading ? "Loading..." : "Save"}
        </button>
      </div>
    </>
  );
}

export default AddCategoryModalBody;
