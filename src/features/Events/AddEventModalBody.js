import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../components/Input/InputText";
import TextAreaInput from "../../components/Input/TextAreaInput";
import SelectBox from "../../components/Input/SelectBox";
import ErrorText from "../../components/Typography/ErrorText";
import { showNotification } from "../common/headerSlice";
import { addNewEvents, deleteEvents } from "./eventSlice";
import ImageUploader from "../../components/Input/ImageUploader";

const INITIAL_EVENT_OBJ = {
  name: "",
  category: "",
  date: "",
  image: "",
  description: "",
  location: "",
};

function AddEventModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [eventObj, seteventObj] = useState(INITIAL_EVENT_OBJ);

  const saveNewEvent = () => {
    if (eventObj.name.trim() === "")
      return setErrorMessage("Event name is required!");
    else if (eventObj.category.trim() === "")
      return setErrorMessage("Event category is required!");
    else if (eventObj.date.trim() === "")
      return setErrorMessage("Event date is required!");
    else if (eventObj.description.trim() === "")
      return setErrorMessage("Event description is required!");
    else if (eventObj.location.trim() === "")
      return setErrorMessage("Event location is required!");
    else {
      let neweventObj = {
        id: 7,
        name: eventObj.name,
        category: eventObj.category,
        date: eventObj.date,
        image: eventObj.image,
        description: eventObj.description,
        location: eventObj.location,
      };
      dispatch(addNewEvents({ neweventObj }));
      dispatch(
        showNotification({ message: "Event succesfully Added!", status: 1 })
      );
      closeModal();
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    seteventObj({ ...eventObj, [updateType]: value });
  };

  const options = [
    { value: "ConferenceHall", name: "Conference Hall" },
    { value: "OutDoorDinning", name: "OutDoor Dinning" },
    { value: "GuestApartment", name: "Guest Apartment" },
    { value: "OfficeRental", name: "Office Rental" },
    { value: "BeautySalon", name: "Beauty Salon" },
    { value: "BillBoardAdverting", name: "BillBoard Adverting" },
    // Add more options as needed
  ];
  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleImageUpload = (value) => {
    console.log(value);
    // handle the uploaded image here
  };

  return (
    <>
      <InputText
        type="text"
        defaultValue={eventObj.name}
        updateType="name"
        containerStyle="mt-4"
        labelTitle="Name"
        updateFormValue={updateFormValue}
      />
      <InputText
        type="text"
        defaultValue={eventObj.location}
        updateType="location"
        containerStyle="mt-4"
        labelTitle="Location"
        updateFormValue={updateFormValue}
      />
      <SelectBox
        labelTitle="Select Event Category"
        defaultValue={selectedOptions}
        options={options}
        containerStyle="my-4 w-full"
        placeholder="Select Category"
        labelStyle="text-lg"
        updateType="options"
        updateFormValue={updateFormValue}
      />
      <InputText
        type="date"
        defaultValue={eventObj.date}
        updateType="name"
        containerStyle="mt-4"
        labelTitle="Name"
        updateFormValue={updateFormValue}
      />
      <ImageUploader
        labelTitle="Upload an image"
        containerStyle="my-4"
        defaultValue={eventObj.image}
        updateFormValue={handleImageUpload}
        updateType="image"
      />
      <TextAreaInput
        labelTitle="Enter your event discription"
        labelStyle="text-lg"
        type="text"
        containerStyle="my-4"
        defaultValue={eventObj.description}
        placeholder="Type your description here"
        updateFormValue={updateFormValue}
        updateType="message"
      />

      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>
          Cancel
        </button>
        <button className="btn btn-primary px-6" onClick={() => saveNewEvent()}>
          Save
        </button>
      </div>
    </>
  );
}

export default AddEventModalBody;
