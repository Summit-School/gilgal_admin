import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import { deletePartner, getPartnerContent } from "./partnerSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { showNotification } from "../common/headerSlice";
import SearchBar from "../../components/Input/SearchBar";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewPartnerModal = () => {
    dispatch(
      openModal({
        title: "Add New Partner",
        bodyType: MODAL_BODY_TYPES.ADD_NEW_PARTNER,
      })
    );
  };

  return (
    <div className="">
      <SearchBar />

      <button
        className="btn mx-3 px-6 btn-sm normal-case btn-primary"
        onClick={() => openAddNewPartnerModal()}
      >
        Add New
      </button>
    </div>
  );
};

function Partner() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPartnerContent());
  }, []);

  const dbData = false;

  const deleteCurrentPartner = (index) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this image from Gallery?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.PARTNER_DELETE,
          index,
        },
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Current Partner images"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* room List in table format loaded from slice after api call */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Logo</th>
                <th>image</th>
                <th>Description</th>
                <th>Websitelink</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  Name
                </td>
                <td><img src="" alt="logo"></img></td>
                <td><img src="" alt="image"></img></td>
                <td>lorem is the way its the key domy text lorem look liks ipson if lorem is lorem then ipson is ipson</td>
                <td>WWW.Backside.com</td>
                <td>
                  <button
                    className="btn btn-square btn-ghost"
                    onClick={() => deleteCurrentPartner(1)}
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

export default Partner;
