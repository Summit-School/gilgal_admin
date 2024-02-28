import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../components/Input/InputText";
import TextAreaInput from "../../components/Input/TextAreaInput";
import SelectBox from "../../components/Input/SelectBox";
import ErrorText from "../../components/Typography/ErrorText";
import { showNotification } from "../common/headerSlice";
import { addNews, deleteNews } from "./newsSlice";
import ImageUploader from "../../components/Input/ImageUploader";

const INITIAL_NEWS_OBJ = {
  title: "",
  image: "",
  description: "",
};

function AddNewsModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [newsObj, setnewsObj] = useState(INITIAL_NEWS_OBJ);

  const saveNews = () => {
    if (newsObj.title.trim() === "")
      return setErrorMessage("Title name is required!");
    else if (newsObj.description.trim() === "")
      return setErrorMessage("Event description is required!");
    else {
      let newsObj = {
        id: 7,
        title: newsObj.title,
        image: newsObj.image,
        description: newsObj.description,
      };
      dispatch(addNews({ newsObj }));
      dispatch(
        showNotification({ message: "News succesfully Added!", status: 1 })
      );
      closeModal();
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setnewsObj({ ...newsObj, [updateType]: value });
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
        defaultValue={newsObj.title}
        updateType="name"
        containerStyle="mt-4"
        labelTitle="Name"
        updateFormValue={updateFormValue}
      />
      <ImageUploader
        labelTitle="Upload an image"
        containerStyle="my-4"
        defaultValue={newsObj.image}
        updateFormValue={handleImageUpload}
        updateType="image"
      />
      <TextAreaInput
        labelTitle="Enter your news discription"
        labelStyle="text-lg"
        type="text"
        containerStyle="my-4"
        defaultValue={newsObj.description}
        placeholder="Type your description here"
        updateFormValue={updateFormValue}
        updateType="message"
      />

      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>
          Cancel
        </button>
        <button className="btn btn-primary px-6" onClick={() => saveNews()}>
          Save
        </button>
      </div>
    </>
  );
}

export default AddNewsModalBody;
