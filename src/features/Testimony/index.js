import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import { getTestimonyContent } from "./testimonySlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import SearchBar from "../../components/Input/SearchBar";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const AddTestimonyModalBody = () => {
    dispatch(
      openModal({
        title: "Add New Testimony",
        bodyType: MODAL_BODY_TYPES.ADD_NEW_TESTIMONY,
        size: "sm",
      })
    );
  };

  return (
    <div className="">
      <SearchBar />
      <button
        className="btn mx-3 px-6 btn-sm normal-case btn-primary"
        onClick={() => AddTestimonyModalBody()}
      >
        Add New
      </button>
    </div>
  );
};

function Testimony() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTestimonyContent());
  }, []);

  const dbData = false;

  const deleteCurrentTestimony = (index) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this testimony?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.TESTIMONY_DELETE,
          index,
        },
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Current Testimony"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* Leads List in table format loaded from slice after api call */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Message</th>
                {/* <th>Company</th> */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-circle w-12 h-12">
                        <img
                          src="https://reqres.in/img/faces/1-image.jpg"
                          alt="Avatar"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">Randy</div>
                    </div>
                  </div>
                </td>
                <td>
                  <p>
                    In the example above, the handleTextAreaChange function logs
                    the updated value to the console. You can replace this with
                    your own logic to handle the updated value as needed. Ensure
                    that the TextAreaInput component and the
                    handleTextAreaChange function are within a parent component
                    or a functional component to render them correctly.
                  </p>
                </td>
                {/* <td>
                  <div>
                    <div className="font-bold">Quatana Experimental 1 & 2</div>
                  </div>
                </td> */}
                <td>
                  <button
                    className="btn btn-square btn-ghost"
                    onClick={() => deleteCurrentTestimony(1)}
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

export default Testimony;
