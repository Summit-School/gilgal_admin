import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../components/Input/InputText";
import TextAreaInput from "../../components/Input/TextAreaInput";
import SelectBox from "../../components/Input/SelectBox";
import ErrorText from "../../components/Typography/ErrorText";
import { showNotification } from "../common/headerSlice";
import { addNewProgram, deleteProgram } from "./programSlice";
import MultiSelect from "../../components/Input/MultiSelect";


const INITIAL_PROGRAM_OBJ = {
  name: "",
  description: "",
};

function AddProgramModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [programObj, setprogramObj] = useState(INITIAL_PROGRAM_OBJ);

  const saveNewProgram = () => {
    if (programObj.name.trim() === "")
      return setErrorMessage("Program name is required!");
    else if (programObj.description.trim() === "")
      return setErrorMessage("description is required!");
    else {
      let newprogramObj = {
        id: 7,
        name: programObj.name,
        description: programObj.description,
      };
      dispatch(addNewProgram({ programObj }));
      dispatch(
        showNotification({
          message: "Program succesfully Added!",
          status: 1,
        })
      );
      closeModal();
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setprogramObj({ ...programObj, [updateType]: value });
  };
  const [selectedOptions, setSelectedOptions] = useState([]);
  return (
    <>
      <InputText
        type="text"
        defaultValue={programObj.name}
        updateType="name"
        containerStyle="mt-4"
        labelTitle="Name"
        updateFormValue={updateFormValue}
      />
      <TextAreaInput
        labelTitle="Enter host discription"
        labelStyle="text-lg"
        type="text"
        containerStyle="my-4"
        defaultValue={programObj.description}
        placeholder="Type description here"
        updateFormValue={updateFormValue}
        updateType="message"
      />
      <MultiSelect
        labelTitle="Select Options"
        options={[
          { label: "Computer Science", value: "csc" },
          { label: "Networking", value: "networking" },
          { label: "Database", value: "db" },
          { label: "French", value: "french" },
          { label: "English", value: "english" },
        ]}
        selectedOptions={["csc", "networking"]}
        updateFormValue={updateFormValue}
      />

      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>
          Cancel
        </button>
        <button
          className="btn btn-primary px-6"
          onClick={() => saveNewProgram()}
        >
          Save
        </button>
      </div>
    </>
  );
}

export default AddProgramModalBody;
