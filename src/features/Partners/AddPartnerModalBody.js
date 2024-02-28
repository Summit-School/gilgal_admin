import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../components/Input/InputText";
import TextAreaInput from "../../components/Input/TextAreaInput";
import ErrorText from "../../components/Typography/ErrorText";
import { showNotification } from "../common/headerSlice";
import { addNewPartner } from "./partnerSlice";
import ImageUploader from "../../components/Input/ImageUploader";

const INITIAL_PARTNER_OBJ = {
  name: "",
  logo: "",
  image: "",
  decription: "",
  websitelink: "",
};

function AddPartnerModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [PartnerObj, setPartnerObj] = useState(INITIAL_PARTNER_OBJ);

  const saveNewPartner = () => {
    if (PartnerObj.name.trim() === "") return setErrorMessage("name is required!");
    else if (PartnerObj.logo.trim() === "")
      return setErrorMessage("logo is required!");
    else if (PartnerObj.image.trim() === "")
      return setErrorMessage("image is required!");
    else if (PartnerObj.decription.trim() === "")
      return setErrorMessage("description is required!");
    else if (PartnerObj.websitelink.trim() === "")
      return setErrorMessage("websitelink is required!");
    else {
      let newPartnerObj = {
        id: 7,
        name: PartnerObj.name,
        logo: PartnerObj.logo,
        image: PartnerObj.image,
        decription: PartnerObj.decription,
        websitelink: PartnerObj.websitelink,
      };
      dispatch(addNewPartner({ newPartnerObj }));
      dispatch(showNotification({ message: "Partner succesfully Added!", status: 1 }));
      closeModal();
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setPartnerObj({ ...PartnerObj, [updateType]: value });
  };

  const handleImageUpload = (value) => {
    console.log(value);
    // handle the uploaded image here
  };

  return (
    <>
      <InputText
        type="text"
        defaultValue={PartnerObj.name}
        updateType="name"
        containerStyle="mt-4"
        labelTitle="Name"
        updateFormValue={updateFormValue}
      />
      <InputText
        type="url"
        defaultValue={PartnerObj.websitelink}
        updateType="websitelink"
        containerStyle="mt-4"
        labelTitle="Websitelink"
        updateFormValue={updateFormValue}
      />
      <ImageUploader
        labelTitle="Upload logo"
        containerStyle="my-4"
        defaultValue=""
        updateFormValue={handleImageUpload}
        updateType="image"
      />
      <ImageUploader
        labelTitle="Upload an image"
        containerStyle="my-4"
        defaultValue=""
        updateFormValue={handleImageUpload}
        updateType="image"
      />
      <TextAreaInput
        labelTitle="Enter Description"
        labelStyle="text-lg"
        type="text"
        containerStyle="my-4"
        defaultValue={PartnerObj.message}
        placeholder="Type your description here"
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
          onClick={() => saveNewPartner()}
        >
          Save
        </button>
      </div>
    </>
  );
}

export default AddPartnerModalBody;
