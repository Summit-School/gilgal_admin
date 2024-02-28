import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import { getProgramsContent, deleteProgram } from "./programSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { showNotification } from "../common/headerSlice";
import SearchBar from "../../components/Input/SearchBar";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewProgramModal = () => {
    dispatch(
      openModal({
        title: "Add New Programs",
        bodyType: MODAL_BODY_TYPES.ADD_NEW_PROGRAMS,
      })
    );
  };

  return (
    <div className="">
      <SearchBar />

      <button
        className="btn mx-3 px-6 btn-sm normal-case btn-primary"
        onClick={() => openAddNewProgramModal()}
      >
        Add New
      </button>
    </div>
  );
};

function Programs() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProgramsContent());
  }, []);

  const dbData = false;

  const deleteCurrentPrograms = (index) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this Programs?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.PROGRAM_DELETE,
          index,
        },
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Current Programs"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* room List in table format loaded from slice after api call */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Programs</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div>
                    <div className="font-bold">HND</div>
                  </div>
                </td>
                <td>lorem we the lorem related to ipson when lorem looks like ipson so see ipson and know lorem</td>
                <td>Computer science, French</td>
                <td>
                  <button
                    className="btn btn-square btn-ghost"
                    onClick={() => deleteCurrentPrograms(1)}
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

export default Programs;
