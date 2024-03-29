import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../components/Input/InputText";
import TextAreaInput from "../../components/Input/TextAreaInput";
import ErrorText from "../../components/Typography/ErrorText";
import { showNotification } from "../common/headerSlice"
import { addRoom } from "../../app/reducers/app";

const INITIAL_ROOM_OBJ = {
  name: "",
  amount: "",
  size: "",
  capacity: "",
  bed: "",
  service: [],
  desc: "",
};

function AddRoomModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [service, setService] = useState("")
  const [services, setServices] = useState([])
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([])
  const [roomObj, setroomObj] = useState(INITIAL_ROOM_OBJ);

  const saveNewRoom = async () => {
    if (roomObj.name.trim() === "") return setErrorMessage("Title is required!");
    else if (roomObj.amount.trim() === "")
      return setErrorMessage("Price id is required!");
    else if (roomObj.size.trim() === "")
      return setErrorMessage("Size id is required!");
    else if (roomObj.capacity.trim() === "")
      return setErrorMessage("Capacity id is required!");
    else if (roomObj.bed.trim() === "")
      return setErrorMessage("Number of bed is required!");
    else if (roomObj.desc.trim() === "")
      return setErrorMessage("Description is required!");
    else {
      setLoading(true)
      const formData = new FormData();
      formData.append('image1', selectedFiles[0]);
      formData.append('image2', selectedFiles[1]);
      formData.append('image3', selectedFiles[2]);
      formData.append('image4', selectedFiles[3]);
      formData.append('image5', selectedFiles[4]);
      formData.append('title', roomObj.name);
      formData.append('price', roomObj.amount);
      formData.append('size', roomObj.size);
      formData.append('capacity', roomObj.capacity);
      formData.append('bed', roomObj.bed);
      formData.append('desc', roomObj.desc);
      formData.append('services', services);
      await dispatch(addRoom(formData)).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          setErrorMessage(res.payload)
          setLoading(false)
          return
        }
        dispatch(showNotification({ message: "New room Added!", status: 1 }));
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
    setroomObj({ ...roomObj, [updateType]: value });
  };

  const handleAddService = () => {
    if (service) {
      const updatedServices = [...services, service];
      setServices(updatedServices);
      setService("")
    } else {
      dispatch(showNotification({ message: "No Service Found", status: 0 }));
    }
  }

  const removeServiceHandler = item => {
    const newArray = services.filter(service => service !== item)
    setServices(newArray)
  }

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
        defaultValue={roomObj.name}
        updateType="name"
        containerStyle="mt-4"
        labelTitle="Title"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={roomObj.amount}
        updateType="amount"
        containerStyle="mt-4"
        labelTitle="Price per night"
        updateFormValue={updateFormValue}
      />
      <InputText
        type="text"
        defaultValue={roomObj.size}
        updateType="size"
        containerStyle="mt-4"
        labelTitle="Room Size"
        updateFormValue={updateFormValue}
      />

      <p style={{ marginTop: 20 }}>Anemities</p>
      <p style={{ marginTop: 10 }}>{
        services?.map((item) => (
          <div style={{ marginRight: 5 }}>{item}<span style={{ color: 'red', marginLeft: 10, cursor: 'pointer' }}
            onClick={() => removeServiceHandler(item)}>X</span></div>
        ))
      }</p>
      <input type={"text"} value={service} onChange={(e) => setService(e.target.value)} className="input  input-bordered w-80 mt-2" />
      <button className="btn btn-primary px-6 mx-4" onClick={() => handleAddService()}>
        Add
      </button>

      <InputText
        type="number"
        defaultValue={roomObj.capacity}
        updateType="capacity"
        containerStyle="mt-4 w-25"
        labelTitle="Maximum Capacity"
        updateFormValue={updateFormValue}
      />
      <InputText
        type="number"
        defaultValue={roomObj.bed}
        updateType="bed"
        containerStyle="mt-4 w-25"
        labelTitle="Number Of Beds"
        updateFormValue={updateFormValue}
      />

      <TextAreaInput
        defaultValue={roomObj.desc}
        updateType="desc"
        containerStyle="mt-4 w-25"
        labelTitle="Description"
        updateFormValue={updateFormValue}
      />

      <p style={{ marginTop: 20 }}>Images</p>
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
        <button className="btn btn-primary px-6" onClick={() => saveNewRoom()}>
          {loading ? "Loading..." : "Save"}
        </button>
      </div>
    </>
  );
}

export default AddRoomModalBody;
