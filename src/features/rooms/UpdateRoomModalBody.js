import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ErrorText from "../../components/Typography/ErrorText";
import { showNotification } from "../common/headerSlice"
import { updateRoom } from "../../app/reducers/app";

function UpdateRoomModalBody({ closeModal, extraObject }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [capacity, setCapacity] = useState("")
  const [size, setSize] = useState("")
  const [bed, setBed] = useState("")
  const [desc, setDesc] = useState("")
  const [service, setService] = useState("")
  const [services, setServices] = useState([])
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [images, setImages] = useState([])
  const [previews, setPreviews] = useState([])

  const { item } = extraObject

  const saveNewRoom = async () => {
    if (title && price && capacity && size && bed && desc && services.length > 0) {
      const formData = new FormData();
      formData.append('image1', selectedFiles[0]);
      formData.append('image2', selectedFiles[1]);
      formData.append('image3', selectedFiles[2]);
      formData.append('image4', selectedFiles[3]);
      formData.append('image5', selectedFiles[4]);
      formData.append('title', title);
      formData.append('price', price);
      formData.append('size', size);
      formData.append('capacity', capacity);
      formData.append('bed', bed);
      formData.append('desc', desc);
      formData.append('services', services);
      const data = { id: item._id, formData }
      await dispatch(updateRoom(data)).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          setErrorMessage(res.payload)
          setLoading(false)
          return
        }
        dispatch(showNotification({ message: "Room Updated!", status: 1 }));
        setLoading(false)
        closeModal();
      }).catch((err) => {
        console.error(err)
        setLoading(false)
      })
    }
    else {
      return setErrorMessage("All field is required!");
    }
  }

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

  const renderServices = (value) => {
    const updatedServices = value[0]?.split(",")?.map((item) => {
      return item.trim();
    }) || [];
    setServices(updatedServices);
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

  useEffect(() => {
    setTitle(item.title)
    setPrice(item.price)
    setCapacity(item.capacity)
    setBed(item.bed)
    setSize(item.size)
    renderServices(item.services)
    setDesc(item.desc)
    setImages(item.images)
  }, [item])


  return (
    <>
      <p style={{ marginTop: 20 }}>Title</p>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input input-bordered w-full mt-2" />

      <p style={{ marginTop: 20 }}>Price per night</p>
      <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="input input-bordered w-full mt-2" />

      <p style={{ marginTop: 20 }}>Room Size</p>
      <input type="text" value={size} onChange={(e) => setSize(e.target.value)} className="input input-bordered w-full mt-2" />

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

      <p style={{ marginTop: 20 }}>Room Capacity</p>
      <input type="text" value={capacity} onChange={(e) => setCapacity(e.target.value)} className="input input-bordered w-full mt-2" />

      <p style={{ marginTop: 20 }}>Number of Beds</p>
      <input type="text" value={bed} onChange={(e) => setBed(e.target.value)} className="input input-bordered w-full mt-2" />

      <p style={{ marginTop: 20 }}>Description</p>
      <textarea className="textarea textarea-bordered w-full" value={desc}
        onChange={(e) => setDesc(e.target.value)}>

      </textarea>

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

      <ul style={{ display: 'flex', flexWrap: 'wrap', marginTop: 40 }}>
        {images && Array.from(images).map((file, index) => (
          <div style={{ width: "32%", margin: 2, }}>
            <img
              style={{ width: "100%", height: "100%", border: '1px solid #ccc', cursor: 'pointer' }}
              src={`${process.env.REACT_APP_BASE_URL}/uploads/gallery/${file}`}
              alt="Image"
            />
            {/* <p style={{ textAlign: 'right', cursor: 'pointer', color: 'red' }}>delete</p> */}
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

export default UpdateRoomModalBody;
