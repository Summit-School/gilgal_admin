import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import { getEventContent, deleteEvents } from "./eventSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { showNotification } from "../common/headerSlice";
import SearchBar from "../../components/Input/SearchBar";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewEventModal = () => {
    dispatch(
      openModal({
        title: "Add New Event",
        bodyType: MODAL_BODY_TYPES.ADD_NEW_EVENT,
      })
    );
  };

  return (
    <div className="">
      <SearchBar />

      <button
        className="btn mx-3 px-6 btn-sm normal-case btn-primary"
        onClick={() => openAddNewEventModal()}
      >
        Add New
      </button>
    </div>
  );
};

function Events() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEventContent());
  }, []);

  const dbData = false;

  const deleteCurrentEvent = (index) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this Event?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.EVENT_DELETE,
          index,
        },
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Current Events"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* room List in table format loaded from slice after api call */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category </th>
                <th>Event_Date</th>
                <th>image</th>
                <th>Location</th>
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
                <td>Wedding</td>
                <td>02/04/2024</td>
                <td>img/thre/thid/juyt/ionp.jpeg</td>
                <td>City Hall</td>
                <td>City the the </td>
                <td>
                  <button
                    className="btn btn-square btn-ghost"
                    onClick={() => deleteCurrentEvent(1)}
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

export default Events;
