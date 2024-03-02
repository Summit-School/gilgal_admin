import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { showNotification } from "../common/headerSlice";
import SearchBar from "../../components/Input/SearchBar";
import { getGalleryImages } from "../../app/reducers/app";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewGalleryModal = () => {
    dispatch(
      openModal({
        title: "Add New Gallery",
        bodyType: MODAL_BODY_TYPES.ADD_NEW_GALLERY,
      })
    );
  };

  return (
    <div className="">
      {/* <SearchBar /> */}

      <button
        className="btn mx-3 px-6 btn-sm normal-case btn-primary"
        onClick={() => openAddNewGalleryModal()}
      >
        Add New
      </button>
    </div>
  );
};

function Gallery() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [urls, setUrls] = useState([])

  const handlerGetImages = async () => {
    try {
      setLoading(true)
      await dispatch(getGalleryImages()).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          showNotification({ message: res.payload, status: 0 })
          setLoading(false)
          return
        }
        setData(res.payload)
        setLoading(false)
      }).catch((err) => {
        console.error(err)
        setLoading(false)
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    handlerGetImages()
  }, [])

  const getUrlsAndCategory = () => {
    const imageData = data.reduce((accumulator, item) => {
      const { category, images } = item;

      // Map over the images array and create objects with imageURL and category
      const categoryImages = images.map(image => ({
        category,
        imageURL: image
      }));

      // Concatenate the new array of objects with the accumulator
      return accumulator.concat(categoryImages);
    }, []);
    setUrls(imageData)
  }

  useEffect(() => {
    getUrlsAndCategory()
  }, [data])

  const deleteCurrentGallery = (item) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this image from Gallery?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.GALLERY_DELETE,
          item,
        },
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Gallery"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* room List in table format loaded from slice after api call */}
        <div className="overflow-x-auto w-full">
          <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: 20 }}>
            {urls?.map((item, index) => {
              return (
                <div key={index} style={{ width: "32%", margin: 2 }}>
                  <img src={`${process.env.REACT_APP_BASE_URL}/uploads/gallery/${item.imageURL}`} alt={`Image Preview ${index + 1}`}
                    style={{ width: "100%", height: '80%', display: 'flex', border: '1px solid #ccc', }} />
                  <p style={{ textAlign: 'right', cursor: 'pointer', color: 'red' }}
                    onClick={() => deleteCurrentGallery(item)}
                  >delete</p>
                </div>
              )
            })}
          </div>
        </div>
      </TitleCard>
    </>
  );
}

export default Gallery;
