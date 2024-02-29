import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../components/Input/InputText";
import TextAreaInput from "../../components/Input/TextAreaInput";
import ErrorText from "../../components/Typography/ErrorText";
import { showNotification } from "../common/headerSlice";
import { addEvent } from "../../app/reducers/app";

const INITIAL_EVENT_OBJ = {
  name: "",
  category: "",
  image: "",
  description: "",
};

function AddEventModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [eventObj, seteventObj] = useState(INITIAL_EVENT_OBJ);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([])

  const saveNewEvent = async () => {
    if (eventObj.name.trim() === "")
      return setErrorMessage("Event name is required!");
    else if (eventObj.category.trim() === "")
      return setErrorMessage("Event category is required!")
    else if (eventObj.description.trim() === "")
      return setErrorMessage("Event description is required!");
    else {
      setLoading(true)
      const formData = new FormData();
      formData.append('image', selectedFiles[0]);
      formData.append('title', eventObj.name);
      formData.append('category', eventObj.category);
      formData.append('details', eventObj.description);
      await dispatch(addEvent(formData)).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          setErrorMessage(res.payload)
          setLoading(false)
          return
        }
        dispatch(showNotification({ message: "New event Added!", status: 1 }));
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
    seteventObj({ ...eventObj, [updateType]: value });
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newSelectedFiles = [...selectedFiles, ...files];
      setSelectedFiles(newSelectedFiles);
      displayImagePreviews(newSelectedFiles);
    }
  };

  const displayImagePreviews = (files) => {
    const urls = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = () => {
        urls.push(reader.result);
        if (urls.length === files.length) {
          setPreviews(urls);
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };

  const removeImage = (index) => {
    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles.splice(index, 1);
    setSelectedFiles(newSelectedFiles);

    const newImagePreviewUrls = [...previews];
    newImagePreviewUrls.splice(index, 1);
    setPreviews(newImagePreviewUrls);
  };

  return (
    <>
      <InputText
        type="text"
        defaultValue={eventObj.name}
        updateType="name"
        containerStyle="mt-4"
        labelTitle="Title"
        updateFormValue={updateFormValue}
      />
      <InputText
        type="text"
        defaultValue={eventObj.category}
        updateType="category"
        containerStyle="mt-4"
        labelTitle="Category"
        updateFormValue={updateFormValue}
      />
      <TextAreaInput
        labelTitle="Enter your event discription"
        labelStyle="text-lg"
        type="text"
        containerStyle="my-4"
        defaultValue={eventObj.description}
        updateFormValue={updateFormValue}
        updateType="description"
      />

      <p style={{ marginTop: 20 }}>Image</p>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange} className="input  input-bordered w-full mt-2" />

      <ul style={{ display: 'flex', flexWrap: 'wrap', marginTop: 20 }}>
        {previews?.map((url, index) => (
          <div style={{ width: "32%", margin: 2 }}>
            <img key={index} src={url} alt={`Image Preview ${index + 1}`}
              style={{ width: "100%", height: '80%', display: 'flex', border: '1px solid #ccc', cursor: 'pointer' }} />
            <p style={{ textAlign: 'right', cursor: 'pointer', color: 'red' }}
              onClick={() => removeImage(index)}
            >remove</p>
          </div>
        ))}
      </ul>

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

export default AddEventModalBody;
