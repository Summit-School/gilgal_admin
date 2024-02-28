import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../components/Input/InputText";
import SelectBox from "../../components/Input/SelectBox";
import ErrorText from "../../components/Typography/ErrorText";
import { showNotification } from "../common/headerSlice";
import { addNewGallery } from "./gallerySlice";
import ImageUploader from "../../components/Input/ImageUploader";

const INITIAL_GALLERY_OBJ = {
  url: "",
  category: "",
};

function AddGalleryModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [galleryObj, setgalleryObj] = useState(INITIAL_GALLERY_OBJ);

  const saveNewGallery = () => {
    if (galleryObj.url.trim() === "") return setErrorMessage("img is required!");
    else if (galleryObj.category.trim() === "")
      return setErrorMessage("category id is required!");
    else {
      let newgalleryObj = {
        id: 7,
        url: galleryObj.url,
        category: galleryObj.category,
      };
      dispatch(addNewGallery({ newgalleryObj }));
      dispatch(showNotification({ message: "Gallery image Added!", status: 1 }));
      closeModal();
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setgalleryObj({ ...galleryObj, [updateType]: value });
  };

  const options = [
    { value: "ConferenceHall", name: "Conference Hall" },
    { value: "OutDoorDinning", name: "OutDoor Dinning" },
    { value: "GuestApartment", name: "Guest Apartment" },
    { value: "OfficeRental", name: "Office Rental" },
    { value: "BeautySalon", name: "Beauty Salon" },
    { value: "BillBoardAdverting", name: "BillBoard Adverting" },
    { value: "Gym", name: "Gym" },
    { value: "Parking", name: "Parking" },
    { value: "Chapel", name: "Chapel" },
    { value: "Canteen", name: "Canteen" },
    { value: "EricaBallRoom", name: "Erica BallRoom" },
    { value: "FurnishedOffice", name: "Furnished Office" },
    { value: "TwoBedRoom2Bath", name: "TwoBedRoom 2Bath" },
    { value: "PhotoGallery", name: "Photo Gallery" },
    // Add more options as needed
  ];
  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleImageUpload = (value) => {
    console.log(value);
    // handle the uploaded image here
  };

  return (
    <>
      <ImageUploader
        labelTitle="Upload an image"
        containerStyle="my-4"
        defaultValue=""
        updateFormValue={handleImageUpload}
        updateType="image"
      />
      <SelectBox
        labelTitle="Select options"
        defaultValue={selectedOptions}
        options={options}
        containerStyle="my-4 w-full"
        placeholder="Select options"
        labelStyle="text-lg"
        updateType="options"
        updateFormValue={updateFormValue}
      />

      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>
          Cancel
        </button>
        <button
          className="btn btn-primary px-6"
          onClick={() => saveNewGallery()}
        >
          Save
        </button>
      </div>
    </>
  );
}

export default AddGalleryModalBody;
