import { MODAL_BODY_TYPES } from "../utils/globalConstantUtil";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../features/common/modalSlice";
import ConfirmationModalBody from "../features/common/components/ConfirmationModalBody";
import AddTestimonyModalBody from "../features/Testimony/AddTestimonyModalBody";
import AddGalleryModalBody from "../features/Gallery/AddGalleryModalBody";
import AddRoomModalBody from "../features/rooms/AddRoomModalBody";
import UpdateRoomModalBody from "../features/rooms/UpdateRoomModalBody";

import AddEventModalBody from "../features/Events/AddEventModalBody";
import AddPartnerModalBody from "../features/Partners/AddPartnerModalBody";
import AddNewsModalBody from "../features/News/AddNewsModalBody";
import AddTeamModalBody from "../features/Team/AddTeamModalBody";
import AddProgramModalBody from "../features/Programs/AddProgramModalBody";
import AddHostCenterModalBody from "../features/HostCenters/AddHostCenterModalBody";
import AddCourseModalBody from "../features/Courses/AddCourseModalBody";


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

              [MODAL_BODY_TYPES.ADD_NEW_TESTIMONY]: (
                <AddTestimonyModalBody
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
              [MODAL_BODY_TYPES.ADD_NEW_EVENT]: (
                <AddEventModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.ADD_NEW_PARTNER]: (
                <AddPartnerModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.ADD_NEW_NEWS]: (
                <AddNewsModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.ADD_NEW_HOSTCENTER]: (
                <AddHostCenterModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.ADD_NEW_TEAM]: (
                <AddTeamModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.ADD_NEW_PROGRAMS]: (
                <AddProgramModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.ADD_NEW_COURSE]: (
                <AddCourseModalBody
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
