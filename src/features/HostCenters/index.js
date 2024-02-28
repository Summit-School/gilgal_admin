import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import { getHostCenterContent, deleteHostCenter } from "./hostcenterSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { showNotification } from "../common/headerSlice";
import SearchBar from "../../components/Input/SearchBar";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewHostCenterModal = () => {
    dispatch(
      openModal({
        title: "Add New HostCenter",
        bodyType: MODAL_BODY_TYPES.ADD_NEW_HOSTCENTER,
      })
    );
  };

  return (
    <div className="">
      <SearchBar />

      <button
        className="btn mx-3 px-6 btn-sm normal-case btn-primary"
        onClick={() => openAddNewHostCenterModal()}
      >
        Add New
      </button>
    </div>
  );
};

function HostCenter() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHostCenterContent());
  }, []);

  const dbData = false;

  const deleteCurrentHostCenter = (index) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this HostCenter?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.HOSTCENTER_DELETE,
          index,
        },
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Current HostCenter"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* room List in table format loaded from slice after api call */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>image</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div>
                    <div className="font-bold">John</div>
                  </div>
                </td>
                <td>img/thre/thid/juyt/ionp.jpeg</td>
                <td>City the the </td>
                <td>
                  <button
                    className="btn btn-square btn-ghost"
                    onClick={() => deleteCurrentHostCenter(1)}
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

export default HostCenter;