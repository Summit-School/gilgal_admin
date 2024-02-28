import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../components/Input/InputText";
import ErrorText from "../../components/Typography/ErrorText";
import { showNotification } from "../common/headerSlice";
import { addNewTestimony } from "./testimonySlice";
import TextAreaInput from "../../components/Input/TextAreaInput";
import ImageUploader from "../../components/Input/ImageUploader";

const INITIAL_TESTIMONY_OBJ = {
  name: "",
  // company: "",
  message: "",
};

function AddTestimonyModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [TestimonyObj, setTestimonyObj] = useState(INITIAL_TESTIMONY_OBJ);

  const saveNewTestimony = () => {
    if (TestimonyObj.name.trim() === "")
      return setErrorMessage("Name is required!");
    else if (TestimonyObj.message.trim() === "")
      return setErrorMessage("A testimony is required!");
    else {
      let newTestimonyObj = {
        id: 1,
        name: TestimonyObj.name,
        message: TestimonyObj.message,
        // company: TestimonyObj.company,
      };
      dispatch(addNewTestimony({ newTestimonyObj }));
      dispatch(
        showNotification({ message: "New Testimony added!", status: 1 })
      );
      closeModal();
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setTestimonyObj({ ...TestimonyObj, [updateType]: value });
  };

  const handleImageUpload = (value) => {
    console.log(value);
    // handle the uploaded image here
  };
  return (
    <>
      <InputText
        type="text"
        defaultValue={TestimonyObj.name}
        updateType="name"
        containerStyle="mt-4"
        labelTitle="Name"
        updateFormValue={updateFormValue}
      />
      {/* <InputText
        type="text"
        defaultValue={TestimonyObj.company}
        updateType="company"
        containerStyle="mt-4"
        labelTitle="Company"
        updateFormValue={updateFormValue}
      /> */}
      <ImageUploader
        labelTitle="Upload an image"
        containerStyle="my-4"
        defaultValue=""
        updateFormValue={handleImageUpload}
        updateType="image"
      />
      <TextAreaInput
        labelTitle="Enter your message"
        labelStyle="text-lg"
        type="text"
        containerStyle="my-4"
        defaultValue={TestimonyObj.message}
        placeholder="Type your testimony here"
        updateFormValue={updateFormValue}
        updateType="message"
      />
      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>
          Cancel
        </button>
        <button
          className="btn btn-primary px-6"
          onClick={() => saveNewTestimony()}
        >
          Save
        </button>
      </div>
    </>
  );
}

export default AddTestimonyModalBody;
