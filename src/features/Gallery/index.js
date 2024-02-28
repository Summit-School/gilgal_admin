import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import { deleteGallery, getGalleryContent } from "./gallerySlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { showNotification } from "../common/headerSlice";
import SearchBar from "../../components/Input/SearchBar";

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
      <SearchBar />

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

  useEffect(() => {
    dispatch(getGalleryContent());
  }, []);

  const dbData = false;

  const deleteCurrentGallery = (index) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this image from Gallery?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.GALLERY_DELETE,
          index,
        },
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Current Gallery images"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* room List in table format loaded from slice after api call */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Image Url</th>
                <th>Category </th>
                <th>Date_of_upload</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div>
                    <div className="font-bold">
                      img/thre/thid/juyt/ionp.jpeg
                    </div>
                  </div>
                </td>
                <td>Canten</td>
                <td>02/04/2024</td>
                <td>
                  <button
                    className="btn btn-square btn-ghost"
                    onClick={() => deleteCurrentGallery(1)}
                  >
                    <TrashIcon className="w-5" />
                  </button>
                </td>
              </tr>
              {dbData === false && (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default Gallery;
