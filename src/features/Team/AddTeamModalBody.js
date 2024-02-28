import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../components/Input/InputText";
import TextAreaInput from "../../components/Input/TextAreaInput";
import SelectBox from "../../components/Input/SelectBox";
import ErrorText from "../../components/Typography/ErrorText";
import { showNotification } from "../common/headerSlice";
import { addNewTeam, deleteTeam } from "./teamSlice";
import ImageUploader from "../../components/Input/ImageUploader";

const INITIAL_TEAM_OBJ = {
  name: "",
  image: "",
  position: "",
};

function AddTeamModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [teamObj, setteamObj] = useState(INITIAL_TEAM_OBJ);

  const saveNewTeam = () => {
    if (teamObj.name.trim() === "")
      return setErrorMessage("name is required!");
    else if (teamObj.position.trim() === "")
      return setErrorMessage("position is required!");
    else {
      let newteamObj = {
        id: 7,
        name: teamObj.name,
        image: teamObj.image,
        position: teamObj.position,
      };
      dispatch(addNewTeam({ teamObj }));
      dispatch(
        showNotification({
          message: "Team succesfully Added!",
          status: 1,
        })
      );
      closeModal();
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setteamObj({ ...teamObj, [updateType]: value });
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
        defaultValue={teamObj.name}
        updateType="name"
        containerStyle="mt-4"
        labelTitle="Name"
        updateFormValue={updateFormValue}
      />
      <InputText
        type="text"
        defaultValue={teamObj.position}
        updateType="position"
        containerStyle="mt-4"
        labelTitle="Position"
        updateFormValue={updateFormValue}
      />
      <ImageUploader
        labelTitle="Upload an image"
        containerStyle="my-4"
        defaultValue={teamObj.image}
        updateFormValue={handleImageUpload}
        updateType="image"
      />
      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>
          Cancel
        </button>
        <button
          className="btn btn-primary px-6"
          onClick={() => saveNewTeam()}
        >
          Save
        </button>
      </div>
    </>
  );
}

export default AddTeamModalBody;
