import { MODAL_BODY_TYPES } from "../utils/globalConstantUtil";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../features/common/modalSlice";
import ConfirmationModalBody from "../features/common/components/ConfirmationModalBody";
import AddTestimonyModalBody from "../features/Testimony/AddTestimonyModalBody";
import AddGalleryModalBody from "../features/Gallery/AddGalleryModalBody";
import AddRoomModalBody from "../features/rooms/AddRoomModalBody";
import UpdateRoomModalBody from "../features/rooms/UpdateRoomModalBody";

import AddEventModalBody from "../features/Events/AddEventModalBody";
import UpdateEventModalBody from "../features/Events/UpdateEventModalBody";

import AddCategoryModalBody from "../features/Categories/AddCategoryModalBody";
import UpdateCategoryModalBody from "../features/Categories/UpdateCategoryModalBody";


function ModalLayout() {
  const { isOpen, bodyType, size, extraObject, title } = useSelector(
    (state) => state.modal
  );
  const dispatch = useDispatch();

  const close = (e) => {
    dispatch(closeModal(e));
  };

  return (
    <>
      {/* The button to open modal */}

      {/* Put this part before </body> tag */}
      <div className={`modal ${isOpen ? "modal-open" : ""}`}>
        <div className={`modal-box  ${size === "lg" ? "max-w-5xl" : ""}`}>
          <button
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => close()}
          >
            ✕
          </button>
          <h3 className="font-semibold text-2xl pb-6 text-center">{title}</h3>

          {/* Loading modal body according to different modal type */}
          {
            {
              [MODAL_BODY_TYPES.ADD_NEW_ROOM]: (
                <AddRoomModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.UPDATE_ROOM]: (
                <UpdateRoomModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),

              [MODAL_BODY_TYPES.ADD_NEW_EVENT]: (
                <AddEventModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.UPDATE_EVENT]: (
                <UpdateEventModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),

              [MODAL_BODY_TYPES.ADD_NEW_CATEGORY]: (
                <AddCategoryModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.UPDATE_CATEGORY]: (
                <UpdateCategoryModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),

              [MODAL_BODY_TYPES.ADD_NEW_GALLERY]: (
                <AddGalleryModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),


              [MODAL_BODY_TYPES.CONFIRMATION]: (
                <ConfirmationModalBody
                  extraObject={extraObject}
                  closeModal={close}
                />
              ),
              [MODAL_BODY_TYPES.DEFAULT]: <div></div>,
            }[bodyType]
          }
        </div>
      </div>
    </>
  );
}

export default ModalLayout;
