import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../components/Input/InputText";
import TextAreaInput from "../../components/Input/TextAreaInput";
import SelectBox from "../../components/Input/SelectBox";
import ErrorText from "../../components/Typography/ErrorText";
import { showNotification } from "../common/headerSlice";
import { addNewHostCenter, deleteHostCenter } from "./hostcenterSlice";
import ImageUploader from "../../components/Input/ImageUploader";

const INITIAL_HOSTCENTER_OBJ = {
  name: "",
  image: "",
  description: "",
};

function AddHostCenterModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hostcenterObj, sethostcenterObj] = useState(INITIAL_HOSTCENTER_OBJ);

  const saveNewHostCenter = () => {
    if (hostcenterObj.name.trim() === "")
      return setErrorMessage("Hostcenter name is required!");
    else if (hostcenterObj.description.trim() === "")
      return setErrorMessage("Hostcenter description is required!");
    else {
      let newhostcenterObj = {
        id: 7,
        name: hostcenterObj.name,
        image: hostcenterObj.image,
        description: hostcenterObj.description,
      };
      dispatch(addNewHostCenter({ hostcenterObj }));
      dispatch(
        showNotification({ message: "HostCenter succesfully Added!", status: 1 })
      );
      closeModal();
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    sethostcenterObj({ ...hostcenterObj, [updateType]: value });
  };
  const [selectedOptions, setSelectedOptions] = useState([]);
    const handleImageUpload = (value) => {
      console.log(value);
      // handle the uploaded image here
    };
  return (
    <>
      <InputText
        type="text"
        defaultValue={hostcenterObj.name}
        updateType="name"
        containerStyle="mt-4"
        labelTitle="Name"
        updateFormValue={updateFormValue}
      />
      <ImageUploader
        labelTitle="Upload an image"
        containerStyle="my-4"
        defaultValue={hostcenterObj.image}
        updateFormValue={handleImageUpload}
        updateType="image"
      />
      <TextAreaInput
        labelTitle="Enter host discription"
        labelStyle="text-lg"
        type="text"
        containerStyle="my-4"
        defaultValue={hostcenterObj.description}
        placeholder="Type description here"
        updateFormValue={updateFormValue}
        updateType="message"
      />

      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>
          Cancel
        </button>
        <button className="btn btn-primary px-6" onClick={() => saveNewHostCenter()}>
          Save
        </button>
      </div>
    </>
  );
}

export default AddHostCenterModalBody;
