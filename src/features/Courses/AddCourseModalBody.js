import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../components/Input/InputText";
import ErrorText from "../../components/Typography/ErrorText";
import { showNotification } from "../common/headerSlice";
import { addNewCourse, deleteCourse } from "./courseSlice";

const INITIAL_COURSE_OBJ = {
  name: "",
};

function AddCourseModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [courseObj, setcourseObj] = useState(INITIAL_COURSE_OBJ);

  const saveNewCourse = () => {
    if (courseObj.name.trim() === "")
      return setErrorMessage("Course name is required!");
    else {
      let newcourseObj = {
        id: 7,
        name: courseObj.name,
      };
      dispatch(addNewCourse({ courseObj }));
      dispatch(
        showNotification({
          message: "Course succesfully Added!",
          status: 1,
        })
      );
      closeModal();
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setcourseObj({ ...courseObj, [updateType]: value });
  };
  const [selectedOptions, setSelectedOptions] = useState([]);
  return (
    <>
      <InputText
        type="text"
        defaultValue={courseObj.name}
        updateType="name"
        containerStyle="mt-4"
        labelTitle="Name"
        updateFormValue={updateFormValue}
      />
      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>
          Cancel
        </button>
        <button
          className="btn btn-primary px-6"
          onClick={() => saveNewCourse()}
        >
          Save
        </button>
      </div>
    </>
  );
}

export default AddCourseModalBody;
